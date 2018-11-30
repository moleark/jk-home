import * as React from 'react';
import { ControllerUsq, CUsq, Query, Action } from 'tonva-react-usql';
import { VCartLabel } from './VCartLabel';
import { CCartApp } from 'home/CCartApp';
import { observable, computed } from 'mobx';
import { VCart } from './VCart';
import * as _ from 'lodash';

export class CCart extends ControllerUsq {

    cApp: CCartApp;

    private addToCartAction: Action;
    private getCartQuery: Query;
    private setCartAction: Action;
    private removeFromCartAction: Action;
    @observable cartData: any[] = [];
    @computed get sum(): any {
        return this.cartData.reduce((accumulator: any, currentValue: any) => {
            let { isDeleted, quantity, price, checked } = currentValue;
            let { count, amount } = accumulator;
            if (isDeleted === true) return accumulator;
            return {
                count: count + quantity,
                amount: amount + (!(checked === true) ? 0 : quantity * price)
            };
        }, { count: 0, amount: 0 });
    }

    constructor(cApp: CCartApp, cUsq: CUsq, res: any) {
        super(cUsq, res);

        this.cApp = cApp;
        this.addToCartAction = this.cUsq.action('addtocart');
        this.getCartQuery = this.cApp.cUsq.query('getcart')
        this.setCartAction = this.cUsq.action('setcart');
        this.removeFromCartAction = this.cUsq.action('removefromcart');
    }

    async load() {
        let cartData = await this.getCartQuery.page(undefined, 0, 100);
        this.cartData.push(...cartData);
    }

    protected async internalStart(param: any) {
        this.showVPage(VCart);
    }

    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    async AddToCart(pack: any, quantity: number, price: number) {

        let cartItem = this.cartData.find((element) => element.pack.id === pack.id);
        if (!cartItem) {
            cartItem = this.createCartItem(pack, quantity, price);
            this.cartData.push(cartItem);
        } else {
            cartItem.quantity += quantity;
            cartItem.price = price;
        }
        await this.addToCartAction.submit({ product: cartItem.product.id, pack: cartItem.pack.id, price: cartItem.price, quantity: quantity });
    }

    createCartItem(pack: any, quantity: number, price: number): any {

        let cartItem: any = {
            checked: true,
            pack: pack,
            product: pack.obj.$owner,
            price: price,
            quantity: quantity,
            isDeleted: false,
            createdate: Date.now()
        };
        return cartItem;
    }

    async updateChecked(item: any, checked: boolean) {

        let existItem = this.cartData.find((element) => element.pack.id === item.pack.id);
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
        let existItem = this.cartData.find((element) => element.pack.id === item.pack.id);
        if (existItem)
            existItem.quantity = quantity;
    }

    /**
     *
     * @param item
     */
    private async removeFromCart() {

        let rows = this.cartData.filter((e) => e.isDeleted === true);
        if (rows) {
            await this.removeFromCartAction.submit({ rows: rows });
            _.remove(this.cartData, v => v.isDeleted === true);
        }
    }

    protected onDispose() {
        this.removeFromCart();
    }

    /**
     *
     * 显示购物车图标
     */
    renderCartLabel() {
        return this.renderView(VCartLabel);
    }

    /**
     * 导航到购物车界面
     */
    navigateToCart = () => {

        this.showVPage(VCart);
    }

    /**
     * 导航到CheckOut界面
     */
    checkOut = async () => {

        let { cOrder } = this.cApp;
        let selectCartItem = this.cartData.filter((element) => element.checked);
        if (!selectCartItem || selectCartItem.length === 0) {
            return;
        }
        await cOrder.start(selectCartItem);
    }
}