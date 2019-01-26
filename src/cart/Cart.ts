import { observable, computed, autorun, IReactionDisposer, IObservableArray } from 'mobx';
import _ from 'lodash';
import { CUsq, Action, Query, TuidMain, TuidDiv, BoxId } from 'tonva-react-usql';
import { PackItem } from '../tools';
import { CCartApp } from '../CCartApp';

export interface CartProduct {
    product: BoxId;
    packs: PackItem[];
    $isSelected?: boolean;
    $isDeleted?: boolean;
    createdate: number;
}

abstract class CartStore {
    protected cart: Cart;
    constructor(cart: Cart) {
        this.cart = cart;
    }
    abstract get isLocal(): boolean;
    abstract async load(): Promise<CartProduct[]>;
    abstract async storeCart(product: BoxId, packItem: PackItem): Promise<void>;
    abstract async removeFromCart(rows: { product: BoxId, packItem: PackItem }[]): Promise<void>;
}

export class Cart {
    private cCartApp: CCartApp;
    private cUsqProduct: CUsq;
    private cUsqOrder: CUsq;
    private cartStore: CartStore;
    private disposer: IReactionDisposer;

    @observable data: any = {
        list: observable<CartProduct>([]),
    };
    items: CartProduct[];
    count = observable.box<number>(0);
    amount = observable.box<number>(0);

    constructor(cCartApp: CCartApp) {
        this.cCartApp = cCartApp;
        let { cUsqProduct, cUsqOrder } = cCartApp;
        this.cUsqProduct = cUsqProduct;
        this.cUsqOrder = cUsqOrder;
        this.items = this.data.list;
        this.disposer = autorun(this.calcSum);
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
        if (this.cCartApp.isLogined === false) {
            this.cartStore = new CartLocal(this, this.cUsqProduct);
            let items = await this.cartStore.load();
            this.items.push(...items);
            return;
        }
        if (this.cartStore === undefined) {
            this.cartStore = new CartRemote(this, this.cUsqOrder);
            let items = await this.cartStore.load();
            this.items.push(...items);
            return;
        }
        let cartLocal = this.cartStore as CartLocal;
        let items = this.items.splice(0, this.items.length);
        this.items.splice(0, this.items.length);
        this.cartStore = new CartRemote(this, this.cUsqOrder);
        (this.items as IObservableArray).replace(await this.cartStore.load());

        for (let item of items) {
            let { product, packs } = item;
            for (let packItem of packs) {
                let { pack, quantity, price, currency } = packItem;
                await this.AddToCart(product, pack, quantity, price, currency);
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
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    async AddToCart(product: any, pack: any, quantity: number, price: number, currency: any) {
        _.remove(this.items, v => v.$isDeleted === true);
        let packItem: PackItem = {
            pack: pack,
            price: price,
            quantity: quantity,
            currency: currency,
        };
        let cartItem = this.items.find((element) => element.product.id === product.id);
        if (!cartItem) {
            //cartItem = this.createCartItem(product, pack, quantity, price, currency);
            //this.items.push(cartItem);
            let row: CartProduct = {} as any;
            row.product = product;
            row.packs = [];
            row.packs.push(packItem),
                row.$isSelected = true;
            row.$isDeleted = false;
            row.createdate = Date.now();
            this.items.push(row);
        } else {
            let { $isDeleted, packs } = cartItem;
            if ($isDeleted === true) {
                cartItem.$isDeleted = false;
                packs.splice(0);
            }
            cartItem.$isSelected = true;
            cartItem.$isDeleted = false;
            let piPack = packs.find(v => v.pack.id === pack.id);
            if (piPack === undefined) {
                packs.push(packItem);
            }
            else {
                piPack.price = price;
                piPack.quantity = quantity;
            }
        }
        await this.storeCart(product, packItem);
    }

    async storeCart(product: BoxId, packItem: PackItem): Promise<void> {
        await this.cartStore.storeCart(product, packItem);
    }

    /**
     *
     * @param item
     */
    async removeDeletedItem() {
        let rows: { product: BoxId, packItem: PackItem }[] = [];
        for (let cp of this.items) {
            let { product, packs, $isDeleted } = cp;
            for (let pi of packs) {
                if ($isDeleted === true || pi.quantity === 0) {
                    rows.push({
                        product: product,
                        packItem: pi
                    });
                }
            }
        }
        if (rows.length === 0) return;
        await this.removeFromCart(rows);

        for (let cp of this.items) {
            let { packs } = cp;
            let packIndexes: number[] = [];
            let len = packs.length;
            for (let i = 0; i < len; i++) {
                if (packs[i].quantity === 0) packIndexes.push(i);
            }
            for (let i = packIndexes.length - 1; i >= 0; i--) packs.splice(packIndexes[i], 1);
            //_.remove(packs, v => v.quantity === 0);
        }
        let itemIndexes: number[] = [];
        let len = this.items.length;
        for (let i = 0; i < len; i++) {
            let { $isDeleted, packs } = this.items[i];
            if ($isDeleted === true || packs.length === 0) itemIndexes.push(i);
        }
        for (let i = itemIndexes.length - 1; i >= 0; i--) this.items.splice(itemIndexes[i], 1);
        //_.remove(this.items, v => v.$isDeleted === true || v.packs.length === 0);
    }

    private async removeFromCart(rows: { product: BoxId, packItem: PackItem }[]): Promise<void> {
        await this.cartStore.removeFromCart(rows);
    }

    async clear() {
        this.items.forEach(v => v.$isDeleted = true);
        await this.removeDeletedItem();
    }

    getSelectItem(): CartProduct[] {
        return this.items.filter(v => {
            let { $isSelected, $isDeleted } = v;
            return $isSelected === true && v.$isDeleted !== true;
        });
    }
}

class CartRemote extends CartStore {
    private getCartQuery: Query;
    private setCartAction: Action;
    private removeFromCartAction: Action;

    get isLocal(): boolean { return false }

    constructor(cart: Cart, cUsqOrder: CUsq) {
        super(cart);
        this.getCartQuery = cUsqOrder.query('getcart')
        this.setCartAction = cUsqOrder.action('setcart');
        this.removeFromCartAction = cUsqOrder.action('removefromcart');
    }

    async load(): Promise<CartProduct[]> {
        let cartData = await this.getCartQuery.page(undefined, 0, 100);
        let cartDict: { [product: number]: CartProduct } = {};
        let cartProducts: CartProduct[] = [];
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
        //this.items.push(...cartProducts);
    }

    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    async storeCart(product: BoxId, packItem: PackItem) {
        let param = {
            product: product,
            ...packItem
        }
        await this.setCartAction.submit(param);
    }

    async removeFromCart(rows: { product: BoxId, packItem: PackItem }[]) {
        let params = rows.map(v => {
            let { product, packItem } = v;
            return {
                product: product,
                ...packItem
            }
        })
        await this.removeFromCartAction.submit({ rows: params });
        //_.pullAllBy(this.items, rows, 'pack.id');
    }
}

const LOCALCARTNAME: string = "cart";
class CartLocal extends CartStore {
    private productTuid: TuidMain;
    private packTuid: TuidDiv;

    constructor(cart: Cart, cUsqProduct: CUsq) {
        super(cart);
        this.productTuid = cUsqProduct.tuid('productx');
        this.packTuid = cUsqProduct.tuidDiv('productx', 'packx');
    }

    get isLocal(): boolean { return true }

    async load(): Promise<CartProduct[]> {
        try {
            let cartstring = localStorage.getItem(LOCALCARTNAME);
            if (cartstring === null) return [];
            let cartData = JSON.parse(cartstring);
            let items = cartData.map(element => {
                let cartProduct: CartProduct = {} as any;
                let { product, packs, createdate } = element;
                if (packs !== undefined) {
                    for (let p of packs) {
                        p.pack = this.packTuid.boxId(p.pack);
                    }
                }
                cartProduct.product = this.productTuid.boxId(product);
                cartProduct.packs = [];
                cartProduct.packs.push(...packs);
                cartProduct.$isSelected = false;
                cartProduct.$isDeleted = false;
                cartProduct.createdate = createdate;
                return cartProduct;
            });
            return items;
        }
        catch {
            localStorage.removeItem(LOCALCARTNAME);
            return [];
        }
    }

    async storeCart(product: BoxId, packItem: PackItem) {
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

    async removeFromCart(rows: { product: BoxId, packItem: PackItem }[]) {
        await this.storeCart(undefined, undefined);
    }

    clear() {
        localStorage.removeItem(LOCALCARTNAME);
    }
}
