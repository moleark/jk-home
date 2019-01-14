import * as React from 'react';
//import { ControllerUsq, CUsq, Query, Action } from 'tonva-react-usql';
import { VCartLabel } from './VCartLabel';
import { CCartApp } from 'CCartApp';
//import { observable, computed } from 'mobx';
import { VCart } from './VCart';
import _ from 'lodash';
import { Controller } from 'tonva-tools';
import { Cart } from './Cart';

const CARTNAMEINLOCAl: string = "cart";

export class CCart extends Controller {

    cApp: CCartApp;
/*
    private addToCartAction: Action;
    private getCartQuery: Query;
    private setCartAction: Action;
    private removeFromCartAction: Action;
*/
    cart: Cart;
    /*
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
    */

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
        let { cUsqOrder } = this.cApp;
        /*
        this.addToCartAction = cUsqOrder.action('addtocart');
        this.getCartQuery = cUsqOrder.query('getcart')
        this.setCartAction = cUsqOrder.action('setcart');
        this.removeFromCartAction = cUsqOrder.action('removefromcart');
        */
        this.cart = new Cart(cUsqOrder);
    }

    //async load() {
    //    await this.cart.load();
        //let cartData = await this.getCartQuery.page(undefined, 0, 100);
        //this.cartData.push(...cartData);
    //}

    protected async internalStart(param: any) {
        this.showVPage(VCart);
    }


    protected onDispose() {
        this.cart.removeDeletedItem();
    }

    /**
     *
     * 显示购物车图标
     */
    renderCartLabel() {
        return this.renderView(VCartLabel);
    }

    renderCart = () => {
        return this.renderView(VCart);
    }

    /**
     * 导航到CheckOut界面
     */
    checkOut = async () => {

        if (!this.isLogined) {
            // 导航到登录界面
        } else {
            let selectCartItem = this.cart.getSelectItem();
            if (selectCartItem === undefined) return;
            let { cOrder } = this.cApp;
            await cOrder.start(selectCartItem);
        }
    }

    tab = () => <this.renderCart />
}
