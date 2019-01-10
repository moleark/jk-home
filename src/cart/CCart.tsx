import * as React from 'react';
import { ControllerUsq, CUsq, Query, Action } from 'tonva-react-usql';
import { VCartLabel } from './VCartLabel';
import { CCartApp } from 'home/CCartApp';
import { observable, computed } from 'mobx';
import { VCart } from './VCart';
import * as _ from 'lodash';
import { Controller } from 'tonva-tools';

export class CCart extends Controller {

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

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
        let { cUsqOrder } = this.cApp;
        this.addToCartAction = cUsqOrder.action('addtocart');
        this.getCartQuery = cUsqOrder.query('getcart')
        this.setCartAction = cUsqOrder.action('setcart');
        this.removeFromCartAction = cUsqOrder.action('removefromcart');
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
    async AddToCart(pack: any, quantity: number, price: number, currency: any) {

        let cartItem = this.cartData.find((element) => element.pack.id === pack.id);
        if (!cartItem) {
            cartItem = this.createCartItem(pack, quantity, price, currency);
            this.cartData.push(cartItem);
        } else {
            cartItem.quantity += quantity;
            cartItem.price = price;
        }
        await this.addToCartAction.submit({
            product: cartItem.product.id, pack: cartItem.pack.id,
            price: cartItem.price, currency: currency.id, quantity: quantity
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
    private async removeDeletedItem() {

        let rows = this.cartData.filter((e) => e.isDeleted === true);
        if (rows) {
            await this.removeFromCart(rows);
        }
    }

    async removeFromCart(rows: any[]) {

        await this.removeFromCartAction.submit({ rows: rows });
        _.pullAllBy(this.cartData, rows, 'pack.id');
    }

    protected onDispose() {
        this.removeDeletedItem();
    }

    /**
     *
     * 显示购物车图标
     */
    renderCartLabel() {
        return this.renderView(VCartLabel);
    }

    renderCart() {
        return this.renderView(VCart);
    }

    /**
     * 导航到CheckOut界面
     */
    checkOut = async () => {

        if (!this.isLogined) {
            // 导航到登录界面
        } else {
            let selectCartItem = this.cartData.filter((element) => element.checked && !(element.isDeleted === true));
            if (!selectCartItem || selectCartItem.length === 0) {
                return;
            }
            let { cOrder } = this.cApp;
            await cOrder.start(selectCartItem);
        }
    }
}