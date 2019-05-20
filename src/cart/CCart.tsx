import * as React from 'react';
import { VCartLabel } from './VCartLabel';
import { CCartApp } from 'CCartApp';
import { VCart } from './VCart';
import { Controller, RowContext, nav, User } from 'tonva';
import { CartPackRow, CartItem } from './Cart';

export class CCart extends Controller {

    cApp: CCartApp;
    private selectedCartItems: CartItem[];

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
            await cartService.addToCart(cartViewModel, product.id, pack.id, value, price, currency);
        } else {
            await cartService.removeFromCart(cartViewModel, [{ productId: product.id, packId: pack.id }]);
        }
    }

    onRowStateChanged = async (context: RowContext, selected: boolean, deleted: boolean) => {
        alert('onRowStateChanged')
    }

    private loginCallback = async (user: User): Promise<void> => {
        let { cApp } = this;
        await cApp.currentUser.setUser(user);
        await cApp.loginCallBack(user);
        this.closePage(1);
        await this.doCheckOut();
    };

    onProductClick(productId: number) {
        let { cartViewModel, cProduct } = this.cApp;
        if (!cartViewModel.isDeleted(productId)) {
            cProduct.showProductDetail(productId);
        }
    }

    checkOut = async () => {
        let { cartViewModel } = this.cApp;
        this.selectedCartItems = cartViewModel.getSelectedItem();
        if (this.selectedCartItems === undefined) return;
        if (!this.isLogined) {
            nav.showLogin(this.loginCallback, true);
        } else {
            this.doCheckOut();
        }
    }

    /**
     * 导航到CheckOut界面
     */
    private doCheckOut = async () => {

        let { cOrder } = this.cApp;
        if (this.selectedCartItems === undefined) return;
        await cOrder.start(this.selectedCartItems);
    }

    tab = () => <this.renderCart />
}
