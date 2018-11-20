import * as React from 'react';
import { CUsq, ControllerUsq, Action, Map } from 'tonva-react-usql';
import { VProduct } from './VProduct';
import * as _ from 'lodash';
import { CCartApp } from 'home/CCartApp';

/**
 *
 */
export class CProduct extends ControllerUsq {

    cApp: CCartApp;

    constructor(cApp: CCartApp, cUsq: CUsq, res: any) {
        super(cUsq, res);
        this.cApp = cApp;
    }


    protected async internalStart(param: any) {

        let productEntity = this.cApp.cUsq.tuid('product');
        let productData = await productEntity.load(param);

        let priceMap = this.cApp.cUsq.map('price');
        let prices = (await priceMap.query({ _product: param })).ret;
        productData.pack.forEach((pack: any) => {
            _.assign(pack, _.filter(prices, (y) => y.pack.id === pack.id && y.salesregion.id === 1)[0]);
        });
        this.showVPage(VProduct, productData);
    }
}