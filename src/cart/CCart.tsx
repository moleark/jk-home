import * as React from 'react';
import { VCartLabel } from './VCartLabel';
import { CCartApp } from 'CCartApp';
import { VCart } from './VCart';
import { Controller } from 'tonva-tools';
import { Cart } from './Cart';

export class CCart extends Controller {

    cApp: CCartApp;
    cart: Cart;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
        let { cUsqOrder } = this.cApp;
        this.cart = new Cart(cUsqOrder);
    }

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
