import * as React from 'react';
import { CUsq, ControllerUsq, Map, TuidDiv, TuidMain } from 'tonva-react-usql';
import { VProduct } from './VProduct';
import * as _ from 'lodash';
import { CCartApp } from 'home/CCartApp';

/**
 *
 */
export class CProduct extends ControllerUsq {

    cApp: CCartApp;
    productTuid: TuidMain;
    packTuid: TuidDiv;
    private priceMap: Map;
    product: any;
    prices: any[];

    constructor(cApp: CCartApp, cUsq: CUsq, res: any) {
        super(cUsq, res);
        this.cApp = cApp;
    }

    protected async internalStart(param: any) {
        this.productTuid = this.cUsq.tuid('product');
        this.packTuid = this.productTuid.divs['pack'];
        this.priceMap = this.cUsq.map('price');
        let id = param;
        this.product = await this.productTuid.load(id);
        this.prices = await this.priceMap.table({ _product: id, _salesregion: 1 });

        this.showVPage(VProduct); //, product);
    }

}