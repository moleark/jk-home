import * as React from 'react';
import { Controller } from 'tonva-tools';
import { CUsq, ControllerUsq, Action, Map } from 'tonva-react-usql';
import { VProduct } from './VProduct';
import * as _ from 'lodash';

export class CProduct extends ControllerUsq {


    protected async internalStart(param: any) {

        let productEntity = this.cUsq.getTuid('product');
        let productData = await productEntity.load(param);

        let priceMap = this.cUsq.getMap('price');
        let prices = (await priceMap.query({ _product: param })).ret;
        productData.pack.forEach((x: any) => {
            _.assign(x, _.filter(prices, (y) => y.pack.id === x.id && y.salesregion.id === 1)[0]);
            _.assign(x, {quantity: 1});
        });
        this.showVPage(VProduct, productData);
    }

    async AddToCart(pack: any, quantity: number) {

        console.log(pack);
        console.log(quantity);
        let cSetCartAction = this.cUsq.cFromName('action', 'setCart');

        await (cSetCartAction.entity as Action).submit({ date: Date.now(), product: pack.owner, pack: pack.id, price: 10, quantity: quantity });
    }
}