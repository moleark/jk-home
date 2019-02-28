import * as React from 'react';
import { VCartLabel } from './VCartLabel';
import { CCartApp } from 'CCartApp';
import { VCart } from './VCart';
import { Controller, RowContext, nav, User } from 'tonva-tools';
import { CartPackRow } from './Cart';

export class CCart extends Controller {

    cApp: CCartApp;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
    }

    protected async internalStart(param: any) {
        this.openVPage(VCart);
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

    onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data, parentData } = context;
        let { product } = parentData;
        let { pack, price, currency } = data as CartPackRow;
        // await this.cart.AddToCart(product.id, pack.id, value, price, currency);
        let { cartViewModel, cartService } = this.cApp;
        if (value > 0) {
            await cartService.AddToCart(cartViewModel, product.id, pack.id, value, price, currency);
        } else {
            await cartService.removeFromCart(cartViewModel, product.id, pack.id);
        }
    }

    onRowStateChanged = async (context: RowContext, selected: boolean, deleted: boolean) => {
        alert('onRowStateChanged')
    }

    private loginCallback = async (user: User): Promise<void> => {
        await this.cApp.currentUser.setUser(user);
        this.closePage(1);
        await this.checkOut();
    };

    onProductClick(productId: number) {
        let { cProduct } = this.cApp;
        cProduct.showProductDetail(productId);
    }

    /**
     * 导航到CheckOut界面
     */
    checkOut = async () => {

        if (!this.isLogined) {
            nav.showLogin(this.loginCallback, true);
        } else {
            let { cartViewModel, cOrder } = this.cApp;
            let selectCartItem = cartViewModel.getSelectItem();
            if (selectCartItem === undefined) return;
            await cOrder.start(selectCartItem);
        }
    }

    tab = () => <this.renderCart />
}
