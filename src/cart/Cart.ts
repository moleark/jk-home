import { observable, computed, autorun, IReactionDisposer } from 'mobx';
import _ from 'lodash';
import { CUsq, Action, Query, TuidMain, TuidDiv } from 'tonva-react-usql';

export abstract class Cart {

    private disposer: IReactionDisposer;
    constructor() {

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
    @observable items: any[] = [];
    count = observable.box<number>(0);
    amount = observable.box<number>(0);

    abstract async load(): Promise<void>;

    async AddToCart(pack: any, quantity: number, price: number, currency: any) {
        let cartItem = this.items.find((element) => element.pack.id === pack.id);
        if (!cartItem) {
            cartItem = this.createCartItem(pack, quantity, price, currency);
            this.items.push(cartItem);
        } else {
            cartItem.quantity = quantity;
            cartItem.price = price;
        }
        await this.storeCart(cartItem);
    }

    createCartItem(pack: any, quantity: number, price: number, currency: any): any {

        let cartItem: any = {
            checked: true,
            pack: pack,
            product: pack.$owner,
            price: price,
            currency: currency,
            quantity: quantity,
            isDeleted: false,
            createdate: Date.now()
        };
        return cartItem;
    }

    abstract async storeCart(cartItem: any): Promise<void>;

    async updateChecked(item: any, checked: boolean) {

        let existItem = this.items.find((element) => element.pack.id === item.pack.id);
        if (existItem)
            existItem.checked = checked;
    }

    /**
     *
     * @param item
     * @param quantity
     */
    async updateQuantity(item: any, quantity: number) {

        let existItem = this.items.find((element) => element.pack.id === item.pack.id);
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

        let rows = this.items.filter((e) => e.isDeleted === true);
        if (rows) {
            await this.removeFromCart(rows);
        }
    }

    abstract async removeFromCart(rows: any[]): Promise<void>;

    getSelectItem() {
        let selectCartItem = this.items.filter((element) => element.checked && !(element.isDeleted === true));
        if (!selectCartItem || selectCartItem.length === 0) return;
        return selectCartItem;
    }

    getItem(pack: number) {
        return this.items.find(x => x.pack.id === pack);
    }
}

export class RemoteCart extends Cart {

    private addToCartAction: Action;
    private getCartQuery: Query;
    private setCartAction: Action;
    private removeFromCartAction: Action;

    constructor(cUsqOrder: CUsq) {
        super();
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
    async storeCart(cartItem: any) {
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

    private productTuid: TuidMain;
    private packTuid: TuidDiv;

    constructor(cUsqProduct: CUsq) {
        super();

        this.productTuid = cUsqProduct.tuid('productx');
        this.packTuid = cUsqProduct.tuidDiv('productx', 'packx');
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

    async storeCart(cartItem: any) {
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