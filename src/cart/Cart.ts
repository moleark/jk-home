import { observable, computed, autorun, IReactionDisposer } from 'mobx';
import _ from 'lodash';
import { CUsq, Action, Query } from 'tonva-react-usql';

export class Cart {
    //private cUsqOrder: CUsq;
    private addToCartAction: Action;
    private getCartQuery: Query;
    private setCartAction: Action;
    private removeFromCartAction: Action;
    private disposer: IReactionDisposer;

    constructor(cUsqOrder: CUsq) {
        //this.cUsqOrder = cUsqOrder;
        this.addToCartAction = cUsqOrder.action('addtocart');
        this.getCartQuery = cUsqOrder.query('getcart')
        this.setCartAction = cUsqOrder.action('setcart');
        this.removeFromCartAction = cUsqOrder.action('removefromcart');
        this.disposer = autorun(this.calcSum);
    }
    dispose() {
        this.dispose();
    }
    private calcSum = () => {
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
        let {count, amount} = ret;
        this.count.set(count);
        this.amount.set(amount);
    }
    @observable items: any[] = [];
    count = observable.box<number>(0);
    amount = observable.box<number>(0);

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
    async AddToCart(pack: any, quantity: number, price: number, currency: any) {
        let cartItem = this.items.find((element) => element.pack.id === pack.id);
        if (!cartItem) {
            cartItem = this.createCartItem(pack, quantity, price, currency);
            this.items.push(cartItem);
        } else {
            cartItem.quantity += quantity;
            cartItem.price = price;
        }
        await this.addToCartAction.submit({
            product: cartItem.product.id, 
            pack: cartItem.pack.id,
            price: cartItem.price, 
            currency: currency && currency.id, 
            quantity: quantity
        });
    }

    createCartItem(pack: any, quantity: number, price: number, currency: any): any {

        let cartItem: any = {
            checked: true,
            pack: pack,
            product: pack.obj.$owner,
            price: price,
            currency: currency,
            quantity: quantity,
            isDeleted: false,
            createdate: Date.now()
        };
        return cartItem;
    }

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

        await this.setCartAction.submit({ product: item.product.id, pack: item.pack.id, price: item.price, quantity: quantity });
        let existItem = this.items.find((element) => element.pack.id === item.pack.id);
        if (existItem)
            existItem.quantity = quantity;
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

    async removeFromCart(rows: any[]) {

        await this.removeFromCartAction.submit({ rows: rows });
        _.pullAllBy(this.items, rows, 'pack.id');
    }

    getSelectItem() {
        let selectCartItem = this.items.filter((element) => element.checked && !(element.isDeleted === true));
        if (!selectCartItem || selectCartItem.length === 0) return;
        return selectCartItem;
    }
}
