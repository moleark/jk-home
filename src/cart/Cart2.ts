import { observable, autorun, IReactionDisposer } from 'mobx';
import _ from 'lodash';
import { Action, Query, TuidDiv } from 'tonva-react-uq';
import { CCartApp } from '../CCartApp';
import { LoaderProductChemical } from 'product/itemLoader';
import { CartItem, CartPackRow } from './Cart';

export class CartViewModel {

    constructor() {
        this.cartItems = this.data.list;
        this.disposer = autorun(this.calcSum);
    }

    private disposer: IReactionDisposer;

    cartItems: CartItem[];
    @observable data = {
        list: observable<CartItem>([]),
    };
    count = observable.box<number>(0);
    amount = observable.box<number>(0);

    dispose() {
        this.disposer();
    }

    protected calcSum = () => {
        let count = 0, amount = 0;
        for (let cp of this.cartItems) {
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

    getQuantity(productId: number, packId: number): number {
        let cp = this.cartItems.find(v => v.$isDeleted !== true && v.product.id === productId);
        if (cp === undefined) return 0;
        let packItem = cp.packs.find(v => v.pack.id === packId);
        if (packItem === undefined) return 0;
        return packItem.quantity;
    }

    getSelectedItem(): CartItem[] {
        return this.cartItems.filter(v => {
            let { $isSelected, $isDeleted } = v;
            return $isSelected === true && $isDeleted !== true;
        });
    }

    add(cartItem: CartItem) {
        let { product, packs } = cartItem;
        let { id: productId } = product;
        let cartItemExists: CartItem = this.cartItems.find((element) => element.product.id === productId);
        if (!cartItemExists) {
            cartItem.$isSelected = true;
            cartItem.$isDeleted = false;
            this.cartItems.push(cartItem);
            return;
        }

        let { $isDeleted, packs: packsExists } = cartItemExists;
        if ($isDeleted === true) {
            packs.splice(0);
        }
        cartItemExists.$isDeleted = false;
        cartItemExists.$isSelected = true;

        let { pack, price, currency, quantity, inventoryAllocation, futureDeliveryTimeDescription } = packs[0];
        let piPack: CartPackRow = packsExists.find(v => v.pack.id === pack.id);
        if (piPack === undefined) {
            cartItemExists.packs.push(packs[0]);
        }
        else {
            piPack.price = price;
            piPack.quantity = quantity;
            piPack.currency = currency;
            piPack.futureDeliveryTimeDescription = futureDeliveryTimeDescription;
            piPack.inventoryAllocation = inventoryAllocation;
        }
    }

    removeFromCart(rows: [{ productId: number, packId: number }]) {
        if (rows && rows.length > 0) {
            rows.forEach(pe => {
                let cartItemIndex = this.cartItems.findIndex(e => e.product.id === pe.productId);
                if (cartItemIndex >= 0) {
                    let cartItem = this.cartItems[cartItemIndex];
                    let i = cartItem.packs.findIndex(e => e.pack.id === pe.packId)
                    if (i >= 0) {
                        cartItem.packs.splice(i, 1);
                        if (cartItem.packs.length === 0) {
                            this.cartItems.splice(cartItemIndex, 1);
                        }
                    }
                }
            })
        }
    }
}

export class CartServiceFactory {

    static getCartService(cApp: CCartApp) {
        if (cApp.isLogined)
            return new CartRemoteService(cApp);
        return new CartLocalService(cApp);
    }
}

export abstract class CartService {

    protected cApp: CCartApp;
    private getInventoryAllocationQuery: Query;
    private packTuid: TuidDiv;

    constructor(cApp: CCartApp) {
        this.cApp = cApp;
        let { cUqWarehouse, cUqProduct } = this.cApp;
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
        this.packTuid = cUqProduct.tuidDiv('productx', 'packx');
    }

    abstract get isLocal(): boolean;
    abstract async load(): Promise<CartViewModel>;

    protected async generateCartItems(cartData: any): Promise<CartViewModel> {

        let result = new CartViewModel();
        if (cartData) {
            for (let cd of cartData) {
                let { product: productId, createdate, packs } = cd;
                result.cartItems.push(await this.generateCartItem(productId, packs))
            }
        }
        return result;
    }

    protected async generateCartItem(productId: number, packs: any[]): Promise<CartItem> {

        let cartItem: CartItem = {} as any;
        let productService = new LoaderProductChemical(this.cApp);
        cartItem.product = await productService.load(productId);
        cartItem.createdate = Date.now();
        cartItem.$isSelected = true;
        cartItem.$isDeleted = false;

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
        return cartItem;
    }

    abstract async addToCart(cartViewModel: CartViewModel, productId: number, packId: number, quantity: number, price: number, currency: any);

    abstract async removeFromCart(cartViewModel: CartViewModel, rows: [{ productId: number, packId: number }]);

    abstract async clear(cartViewModel: CartViewModel);

    abstract async merge(source: CartViewModel);
}

export class CartRemoteService extends CartService {
    private getCartQuery: Query;
    private setCartAction: Action;
    private removeFromCartAction: Action;
    private mergeCartAction: Action;

    get isLocal(): boolean { return false }

    constructor(cApp: CCartApp) {
        super(cApp);

        let { cUqOrder } = this.cApp;
        this.getCartQuery = cUqOrder.query('getcart')
        this.setCartAction = cUqOrder.action('setcart');
        this.removeFromCartAction = cUqOrder.action('removefromcart');
        this.mergeCartAction = cUqOrder.action('mergeCartAction');
    }

    async load(): Promise<CartViewModel> {
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
        return await this.generateCartItems(cartData2);
    }

    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    async addToCart(cartViewModel: CartViewModel, productId: number, packId: number, quantity: number, price: number, currency: any) {
        let param = {
            product: productId,
            pack: packId,
            price: price,
            currency: currency,
            quantity: quantity
        }

        try {
            await this.setCartAction.submit(param);
            let cartItem: CartItem = await this.generateCartItem(productId
                , [{ pack: packId, price: price, quantity: quantity, currency: currency && currency.id }]);
            cartViewModel.add(cartItem);
        } catch (error) {

        }
    }

    async removeFromCart(cartViewModel: CartViewModel, rows: [{ productId: number, packId: number }]) {
        if (rows && rows.length > 0) {
            cartViewModel.removeFromCart(rows);
            let param = rows.map(e => { return { product: e.productId, pack: e.packId } });
            await this.removeFromCartAction.submit({ rows: param })
        }
    }

    async clear(cartViewModel: CartViewModel) {
        let param = cartViewModel.cartItems.map(v => {
            let { product, packs } = v;
            return {
                product: product,
                ...packs
            }
        })
        await this.removeFromCartAction.submit({ rows: param });
    }

    async merge(source: CartViewModel) {
        let param = source.cartItems.map(v => {
            let { product, packs } = v;
            return {
                product: product,
                ...packs
            }
        })
        await this.mergeCartAction.submit({ rows: param });
        return await this.load();
    }
}

const LOCALCARTNAME: string = "cart";
export class CartLocalService extends CartService {

    constructor(cApp: CCartApp) {
        super(cApp);
    }

    get isLocal(): boolean { return true }

    async load(): Promise<CartViewModel> {
        try {
            let cartstring = localStorage.getItem(LOCALCARTNAME);
            let cartData = JSON.parse(cartstring);
            return await this.generateCartItems(cartData);
        }
        catch {
            localStorage.removeItem(LOCALCARTNAME);
        }
    }

    async addToCart(cartViewModel: CartViewModel, productId: number, packId: number, quantity: number, price: number, currency: any) {

        let cartItem: CartItem = await this.generateCartItem(productId
            , [{ pack: packId, price: price, quantity: quantity, currency: currency && currency.id }]);
        cartViewModel.add(cartItem);

        this.save(cartViewModel);
    }

    async removeFromCart(cartViewModel: CartViewModel, rows: [{ productId: number, packId: number }]) {
        cartViewModel.removeFromCart(rows);
        this.save(cartViewModel);
    }

    private save(cartViewModel: CartViewModel) {
        let items = cartViewModel.cartItems.map(e => {
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

    clear(cartViewModel: CartViewModel) {
        localStorage.removeItem(LOCALCARTNAME);
    }

    async merge(source: CartViewModel) {
    }

}