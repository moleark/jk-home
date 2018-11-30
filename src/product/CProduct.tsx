import * as React from 'react';
import { CUsq, ControllerUsq, Map, TuidDiv, TuidMain, Query } from 'tonva-react-usql';
import { VProduct } from './VProduct';
import * as _ from 'lodash';
import { CCartApp } from 'home/CCartApp';
import { PageItems } from 'tonva-tools';
import { VProductList } from './VProductList';

class PageProducts extends PageItems<any> {

    private searchProductQuery: Query;

    constructor(searchProductQuery: Query) {
        super();
        this.firstSize = this.pageSize = 3;
        this.searchProductQuery = searchProductQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        let { key } = param;
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchProductQuery.page({ key: key }, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        if (item === undefined) return 0;
        return item.id;
    }
}

/**
 *
 */
export class CProduct extends ControllerUsq {

    cApp: CCartApp;
    pageProducts: PageProducts;
    private productTuid: TuidMain;
    packTuid: TuidDiv;
    private productChemicalMap: Map;
    private getPriceQuery: Query;

    product: any;
    productChemical: any;
    prices: any[];

    constructor(cApp: CCartApp, cUsq: CUsq, res: any) {
        super(cUsq, res);
        this.cApp = cApp;

        let searchProductQuery = this.cUsq.query("searchProduct");
        this.pageProducts = new PageProducts(searchProductQuery);

        this.productTuid = this.cUsq.tuid('product');
        this.packTuid = this.productTuid.divs['pack'];
        this.productChemicalMap = this.cUsq.map('productChemical');
        this.getPriceQuery = this.cUsq.query('getprice');
    }

    protected async internalStart(param: any) {

        this.showVPage(VProductList, param);
    }

    showProductDetail = async (productId: number) => {

        this.product = await this.productTuid.load(productId);
        this.productChemical = await this.productChemicalMap.obj({ _product: productId });
        let priceQueryCritiria: any = { product: productId, salesRegion: 1 }
        if (this.isLogined) {
            priceQueryCritiria.person = this.user.id;
        }
        this.prices = await this.getPriceQuery.table(priceQueryCritiria);
        this.showVPage(VProduct);
    }

}