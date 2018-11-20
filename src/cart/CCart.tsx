import * as React from 'react';
import { ControllerUsq, CUsq, Query, VActionMain } from 'tonva-react-usql';
import { VCartLabel } from './VCartLabel';
import { CCartApp } from 'home/CCartApp';
import { observable, computed } from 'mobx';
import { VCart } from './VCart';
import * as _ from 'lodash';

export class CCart extends ControllerUsq {

    cApp: CCartApp;

    private getCartEntity: Query;
    @observable cartData: any[] = [];
    @computed get count() {
        return this.cartData.reduce((accumulator: number, currentValue: any) => {
            return accumulator + currentValue.quantity;
        }, 0);
    }

    constructor(cApp: CCartApp, cUsq: CUsq, res: any) {
        super(cUsq, res);
        this.cApp = cApp;
    }

    protected async internalStart(param: any) {

        this.getCartEntity = this.cApp.cUsq.query('getcart')
        let cartData = await this.getCartEntity.page(undefined, 0, 100);
        this.cartData.push(...cartData);
    }

    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    async AddToCart(pack: any, quantity: number) {

        let cSetCartAction = this.cUsq.action('addtocart');

        await cSetCartAction.submit({ product: pack.owner, pack: pack.id, price: 10, quantity: quantity });
        this.cartData.push({ quantity: quantity });
    }

    /**
     *
     * @param item
     * @param quantity
     */
    async updateQuantity(item: any, quantity: number) {

        let cSetCartAction = this.cUsq.action('setCart');

        await cSetCartAction.submit({ product: item.product.id, pack: item.pack.id, price: 10, quantity: quantity });
        this.cartData.push({ quantity: quantity });
    }

    /**
     *
     * @param item
     */
    async removeFromCart(item: any) {

        let cSetCartAction = this.cUsq.action('removeFromCart');

        await cSetCartAction.submit({ product: item.product.id, pack: item.pack.id });
        _.remove(this.cartData, (citem) => { return citem.pack.id === item.pack.id });
    }

    /**
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
}