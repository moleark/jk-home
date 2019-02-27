import { observable, computed, autorun, IReactionDisposer, IObservableArray } from 'mobx';
import _ from 'lodash';
import { Action, Query, TuidDiv } from 'tonva-react-uq';
import { CCartApp } from '../CCartApp';
import { LoaderProduct } from 'product/itemLoader';
import { MainProductChemical } from 'mainSubs';
import { PackRow } from 'product/Product';

export interface CartItem {
    product: MainProductChemical;
    packs: CartPackRow[];
    $isSelected?: boolean;
    $isDeleted?: boolean;
    createdate: number;
}

export interface CartPackRow extends PackRow {
    price: number;
    currency: any;
}

export class Cart {
    cApp: CCartApp;
    private getInventoryAllocationQuery: Query;
    private packTuid: TuidDiv;

    private cartStore: CartStore;
    private disposer: IReactionDisposer;

    @observable data: any = {
        list: observable<CartItem>([]),
    };
    items: CartItem[];
    count = observable.box<number>(0);
    amount = observable.box<number>(0);

    constructor(cApp: CCartApp) {
        this.cApp = cApp;
        this.items = this.data.list;
        this.disposer = autorun(this.calcSum);
        let { cUqProduct, cUqWarehouse } = cApp;
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
        this.packTuid = cUqProduct.tuidDiv('productx', 'packx');
    }

    dispose() {
        this.disposer();
        this.removeDeletedItem();
    }

    protected calcSum = () => {
        let count = 0, amount = 0;
        for (let cp of this.items) {
            let { $isSelected, $isDeleted, packs } = cp;
            if ($isDeleted === true) continue;
            for (let pi of packs) {
                let { price, quantity } = pi;
                count += quantity;
                if (price === Number.NaN || quantity === Number.NaN) continue;
                if ($isSelected === true) {
                    amount += quantity * price;
                }
            }
        }
        this.count.set(count);
        this.amount.set(amount);
    }

    async load(): Promise<void> {
        if (this.cApp.isLogined === false) {
            this.cartStore = new CartLocal(this, this.cApp);
            let items = await this.cartStore.load();
            this.items.push(...items);
            return;
        }
        if (this.cartStore === undefined) {
            this.cartStore = new CartRemote(this, this.cApp);
            let items = await this.cartStore.load();
            this.items.push(...items);
            return;
        }
        // 已登录但是cartStore !== undefined时继续执行，这是合并购物车？
        let cartLocal = this.cartStore as CartLocal;
        let items = this.items.splice(0, this.items.length);
        this.items.splice(0, this.items.length);
        this.cartStore = new CartRemote(this, this.cApp);
        (this.items as IObservableArray).replace(await this.cartStore.load());

        for (let item of items) {
            let { product, packs } = item;
            for (let packItem of packs) {
                let { pack, quantity, price, currency } = packItem;
                await this.AddToCart(product.id, pack.id, quantity, price, currency);
            }
        }
        cartLocal.clear();
    }

    getQuantity(productId: number, packId: number): number {
        let cp = this.items.find(v => v.$isDeleted !== true && v.product.id === productId);
        if (cp === undefined) return 0;
        let packItem = cp.packs.find(v => v.pack.id === packId);
        if (packItem === undefined) return 0;
        return packItem.quantity;
    }

    /**
     * 添加购物车
     * @param packId 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    AddToCart = async (productId: number, packId: number, quantity: number, price: number, currency: any) => {

        let cartItem: CartItem = this.items.find((element) => element.product.id === productId);
        if (!cartItem) {
            let productLoader = new LoaderProduct(this.cApp);
            cartItem.product = await productLoader.load(productId);
            cartItem.packs = [];
            this.items.push(cartItem);
        }
        let { $isDeleted, packs } = cartItem;
        if ($isDeleted === true) {
            packs.splice(0);
        }
        cartItem.$isSelected = true;
        cartItem.$isDeleted = false;
        cartItem.createdate = Date.now();

        let piPack: CartPackRow = packs.find(v => v.pack.id === packId);
        if (piPack === undefined) {
            piPack = {
                pack: this.packTuid.boxId(packId),
                price: price,
                quantity: quantity,
                currency: currency,
            };
            piPack.inventoryAllocation =
                await this.getInventoryAllocationQuery.table({ product: productId, pack: packId, salesRegion: this.cApp.currentSalesRegion })
            packs.push(piPack);
        }
        else {
            piPack.price = price;
            piPack.quantity = quantity;
        }

        await this.storeCart(productId, piPack);
    }

    async storeCart(product: number, packItem: CartPackRow): Promise<void> {
        await this.cartStore.storeCart(product, packItem);
    }

    /**
     *
     * @param item
     */
    async removeDeletedItem() {
        let rows: { product: number, packItem: CartPackRow }[] = [];
        for (let cp of this.items) {
            let { product, packs, $isDeleted } = cp;
            for (let pi of packs) {
                if ($isDeleted === true || pi.quantity === 0) {
                    rows.push({
                        product: product.id,
                        packItem: pi
                    });
                }
            }
        }
        if (rows.length === 0) return;
        await this.removeFromCart(rows);

        // 下面是从本地数据结构中删除
        for (let cp of this.items) {
            let { packs } = cp;
            let packIndexes: number[] = [];
            let len = packs.length;
            for (let i = 0; i < len; i++) {
                if (packs[i].quantity === 0) packIndexes.push(i);
            }
            for (let i = packIndexes.length - 1; i >= 0; i--) packs.splice(packIndexes[i], 1);
        }

        let itemIndexes: number[] = [];
        let len = this.items.length;
        for (let i = 0; i < len; i++) {
            let { $isDeleted, packs } = this.items[i];
            if ($isDeleted === true || packs.length === 0) itemIndexes.push(i);
        }
        for (let i = itemIndexes.length - 1; i >= 0; i--) this.items.splice(itemIndexes[i], 1);
    }

    private async removeFromCart(rows: { product: number, packItem: CartPackRow }[]): Promise<void> {
        await this.cartStore.removeFromCart(rows);
    }

    async clear() {
        this.items.forEach(v => v.$isDeleted = true);
        await this.removeDeletedItem();
    }

    getSelectItem(): CartItem[] {
        return this.items.filter(v => {
            let { $isSelected, $isDeleted } = v;
            return $isSelected === true && $isDeleted !== true;
        });
    }
}

abstract class CartStore {
    protected cApp: CCartApp;
    private getInventoryAllocationQuery: Query;
    private packTuid: TuidDiv;
    protected cart: Cart;
    constructor(cart: Cart, cApp: CCartApp) {
        this.cart = cart;
        this.cApp = cApp;

        let { cUqWarehouse, cUqProduct } = this.cApp;
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
        this.packTuid = cUqProduct.tuidDiv('productx', 'packx');
    }
    abstract get isLocal(): boolean;
    abstract async load(): Promise<CartItem[]>;
    abstract async storeCart(product: number, packItem: CartPackRow): Promise<void>;
    abstract async removeFromCart(rows: { product: number, packItem: CartPackRow }[]): Promise<void>;

    protected async generateItems(cartData: any): Promise<CartItem[]> {
        let results: CartItem[] = [];

        let productService = new LoaderProduct(this.cApp);
        for (let cd of cartData) {
            let { product: productId, createdate, packs } = cd;
            let cartItem: CartItem = {} as any;
            cartItem.product = await productService.load(productId);
            cartItem.createdate = createdate || Date.now();
            cartItem.$isSelected = false;
            cartItem.$isDeleted = false;
            results.push(cartItem);

            cartItem.packs = [];
            if (packs !== undefined) {
                for (let p of packs) {
                    let { pack: packId, price, quantity, currency } = p;
                    let packItem: CartPackRow = {
                        pack: this.packTuid.boxId(packId),
                        price: price,
                        quantity: quantity,
                        currency: currency,
                    };
                    packItem.inventoryAllocation =
                        await this.getInventoryAllocationQuery.table({ product: productId, pack: packId, salesRegion: this.cApp.currentSalesRegion })
                    cartItem.packs.push(packItem);
                }
            }
        }
        return results;
    }
}

class CartRemote extends CartStore {
    private getCartQuery: Query;
    private setCartAction: Action;
    private removeFromCartAction: Action;

    get isLocal(): boolean { return false }

    constructor(cart: Cart, cApp: CCartApp) {
        super(cart, cApp);

        let { cUqOrder } = this.cApp;
        this.getCartQuery = cUqOrder.query('getcart')
        this.setCartAction = cUqOrder.action('setcart');
        this.removeFromCartAction = cUqOrder.action('removefromcart');
    }

    async load(): Promise<CartItem[]> {

        let cartData = await this.getCartQuery.page(undefined, 0, 100);
        let cartData2: any[] = [];
        for (let cd of cartData) {
            let { product, pack, quantity, price, currency } = cd;
            let packRow: any = {
                pack: pack.id,
                price: price,
                quantity: quantity,
                currency: currency && currency.id
            }
            let cpi = cartData2.find(e => e.product === product.id);
            if (cpi === undefined) {
                cpi = { product: product.id, packs: [] };
                cartData2.push(cpi);
            }
            cpi.packs.push(packRow);
        }
        return await this.generateItems(cartData2);
        /*
        let cartDict: { [product: number]: CartItem } = {};
        let cartProducts: CartItem[] = [];
        for (let cd of cartData) {
            let { product, createdate, pack, price, quantity, currency } = cd;
            let packItem: PackItem = {
                pack: pack,
                price: price,
                quantity: quantity,
                currency: currency
            };
            let cpi = cartDict[product.id];
            if (cpi === undefined) {
                cpi = {} as any; //new CartProduct;
                cpi.product = product;
                // cpi.product.load(product.id);
                cpi.packs = [];
                cpi.packs.push(packItem);
                cpi.createdate = createdate;
                cpi.$isSelected = false;
                cpi.$isDeleted = false;
                cartProducts.push(cpi);
                cartDict[product.id] = cpi;
                continue;
            }
            cpi.packs.push(packItem);
        }
        return cartProducts;
        */
    }

    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    async storeCart(product: number, packItem: CartPackRow) {
        let param = {
            product: product,
            ...packItem
        }
        await this.setCartAction.submit(param);
    }

    async removeFromCart(rows: { product: number, packItem: CartPackRow }[]) {
        let params = rows.map(v => {
            let { product, packItem } = v;
            return {
                product: product,
                ...packItem
            }
        })
        await this.removeFromCartAction.submit({ rows: params });
    }
}

const LOCALCARTNAME: string = "cart";
class CartLocal extends CartStore {

    constructor(cart: Cart, cApp: CCartApp) {
        super(cart, cApp);
    }

    get isLocal(): boolean { return true }

    async load(): Promise<CartItem[]> {
        try {
            let cartstring = localStorage.getItem(LOCALCARTNAME);
            if (cartstring === null) return [];
            let cartData = JSON.parse(cartstring);
            return await this.generateItems(cartData);
            /*
            let items: CartItem[] = [];
            for (let i=0; i<cartData.length; i++){
                let cartProduct: CartItem = {} as any;
                let { product, packs, createdate } = cartData[i];
                if (packs !== undefined) {
                    for (let p of packs) {
                        p.pack = this.packTuid.boxId(p.pack);
                    }
                }
                cartProduct.product = this.productTuid.boxId(product);
                // cartProduct.product = new Product(this.cart.cCartApp);
                // await cartProduct.product.load(product);
                cartProduct.packs = [];
                cartProduct.packs.push(...packs);
                cartProduct.$isSelected = false;
                cartProduct.$isDeleted = false;
                cartProduct.createdate = createdate;
                items.push(cartProduct);
            };
            return items;
            */
        }
        catch {
            localStorage.removeItem(LOCALCARTNAME);
            return [];
        }
    }

    async storeCart(product: number, packItem: CartPackRow) {
        let items = this.cart.items.map(e => {
            let { product, packs } = e;
            return {
                product: product.id,
                packs: packs && packs.map(v => {
                    let { pack, price, currency, quantity } = v;
                    return {
                        pack: pack.id,
                        price: price,
                        currency: currency && currency.id,
                        quantity: quantity,
                    }
                }),
            }
        });

        let text = JSON.stringify(items);
        localStorage.setItem(LOCALCARTNAME, text);
    }

    async removeFromCart(rows: { product: number, packItem: CartPackRow }[]) {
        await this.storeCart(undefined, undefined);
    }

    clear() {
        localStorage.removeItem(LOCALCARTNAME);
    }
}
