import { observable, computed, autorun, IReactionDisposer } from 'mobx';
import _ from 'lodash';
import { CUsq, Action, Query, TuidMain, TuidDiv, BoxId } from 'tonva-react-usql';

export class CartItem {
    pack: BoxId;
    product: BoxId;
    price: number;
    currency: BoxId;
    quantity: number;
    checked: boolean;
    isDeleted: boolean;
    createdate: number;
}

export abstract class Cart {

    protected productTuid: TuidMain;
    protected packTuid: TuidDiv;
    private disposer: IReactionDisposer;
    constructor(cUsqProduct: CUsq) {

        this.productTuid = cUsqProduct.tuid('productx');
        this.packTuid = cUsqProduct.tuidDiv('productx', 'packx');
        this.disposer = autorun(this.calcSum);
    }

    dispose() {
        this.disposer();
    }

    protected calcSum = () => {
        let ret = this.items.reduce((accumulator: any, currentValue: any) => {
            let { isDeleted, quantity, price, checked } = currentValue;
            let { count, amount } = accumulator;
            if (isDeleted === true) return accumulator;
            if (price === Number.NaN || quantity === Number.NaN) return accumulator;
            return {
                count: count + quantity,
                amount: amount + (!(checked === true) ? 0 : quantity * price)
            };
        }, { count: 0, amount: 0 });
        let { count, amount } = ret;
        this.count.set(count);
        this.amount.set(amount);
    }
    @observable items: CartItem[] = [];
    count = observable.box<number>(0);
    amount = observable.box<number>(0);

    abstract async load(): Promise<void>;

    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    async AddToCart(product: any, pack: any, quantity: number, price: number, currency: any) {
        let cartItem = this.items.find((element) => element.pack.id === pack.id);
        if (!cartItem) {
            cartItem = this.createCartItem(product, pack, quantity, price, currency);
            this.items.push(cartItem);
        } else {
            cartItem.quantity = quantity;
            cartItem.price = price;
        }
        await this.storeCart(cartItem);
    }

    createCartItem(product: any, pack: any, quantity: number, price: number, currency: any): any {

        let cartItem: CartItem = {
            checked: true,
            pack: pack,
            product: product, // pack.obj.$owner,
            price: price,
            currency: currency,
            quantity: quantity,
            isDeleted: false,
            createdate: Date.now()
        };
        return cartItem;
    }

    abstract async storeCart(cartItem: CartItem): Promise<void>;

    async updateChecked(cartItem: CartItem, checked: boolean) {

        let existItem = this.items.find((element) => element.pack.id === cartItem.pack.id);
        if (existItem)
            existItem.checked = checked;
    }

    /**
     *
     * @param cartItem
     * @param quantity
     */
    async updateQuantity(cartItem: CartItem, quantity: number) {

        let existItem = this.items.find((element) => element.pack.id === cartItem.pack.id);
        if (existItem) {
            if (quantity <= 0) {
                this.removeFromCart([existItem]);
            } else {
                existItem.quantity = quantity;
                await this.storeCart(existItem);
            }
        }
    }

    /**
     *
     * @param item
     */
    async removeDeletedItem() {

        let rows: CartItem[] = this.items.filter((e) => e.isDeleted === true);
        if (rows && rows.length > 0) {
            await this.removeFromCart(rows);
        }
    }

    abstract async removeFromCart(rows: any[]): Promise<void>;

    getSelectItem(): CartItem[] {
        let selectCartItem: CartItem[] = this.items.filter((element) => element.checked && !(element.isDeleted === true));
        if (!selectCartItem || selectCartItem.length === 0) return;
        return selectCartItem;
    }

    getItem(packId: number): CartItem {
        return this.items.find(x => x.pack.id === packId);
    }
}

export class RemoteCart extends Cart {

    private addToCartAction: Action;
    private getCartQuery: Query;
    private setCartAction: Action;
    private removeFromCartAction: Action;

    constructor(cUsqProduct: CUsq, cUsqOrder: CUsq) {
        super(cUsqProduct);
        this.addToCartAction = cUsqOrder.action('addtocart');
        this.getCartQuery = cUsqOrder.query('getcart')
        this.setCartAction = cUsqOrder.action('setcart');
        this.removeFromCartAction = cUsqOrder.action('removefromcart');
    }

    /*
    @computed get sum(): any {
        return this.items.reduce((accumulator: any, currentValue: any) => {
            let { isDeleted, quantity, price, checked } = currentValue;
            let { count, amount } = accumulator;
            if (isDeleted === true) return accumulator;
            if (price === Number.NaN || quantity === Number.NaN) return accumulator;
            return {
                count: count + quantity,
                amount: amount + (!(checked === true) ? 0 : quantity * price)
            };
        }, { count: 0, amount: 0 });
    }
    */
    async load() {
        let cartData = await this.getCartQuery.page(undefined, 0, 100);
        this.items.push(...cartData);
    }

    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    async storeCart(cartItem: CartItem) {
        await this.setCartAction.submit({
            product: cartItem.product.id,
            pack: cartItem.pack.id,
            price: cartItem.price,
            currency: cartItem.currency && cartItem.currency.id,
            quantity: cartItem.quantity
        });
    }

    async removeFromCart(rows: any[]) {

        await this.removeFromCartAction.submit({ rows: rows });
        _.pullAllBy(this.items, rows, 'pack.id');
    }
}

const LOCALCARTNAME: string = "cart";
export class LocalCart extends Cart {

    constructor(cUsqProduct: CUsq) {
        super(cUsqProduct);
    }

    async load() {
        let cartstring = window.localStorage.getItem(LOCALCARTNAME);
        let cartData = JSON.parse(cartstring);
        if (cartData && cartData.length > 0) {
            cartData.forEach(element => {
                element.product = this.productTuid.boxId(element.product);
                element.pack = this.packTuid.boxId(element.pack);
            });
            this.items.push(...cartData);
        }
    }

    async storeCart(cartItem: CartItem) {
        window.localStorage.setItem(LOCALCARTNAME, JSON.stringify(this.items.map(e=>{
            product: e.product.id;
            pack: e.pack.id;
            price: e.price;
            currency: e.currency && e.currency.id;
            quantity: e.quantity
        })));
    }

    async removeFromCart(rows: any[]) {

        _.remove(this.items, (e) => e.isDeleted === true);
        await this.storeCart(undefined);
    }
}