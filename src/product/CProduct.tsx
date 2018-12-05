import * as React from 'react';
import { CUsq, ControllerUsq, Map, TuidDiv, TuidMain, Query } from 'tonva-react-usql';
import { VProduct } from './VProduct';
import * as _ from 'lodash';
import { CCartApp } from 'home/CCartApp';
import { PageItems, Controller } from 'tonva-tools';
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
export class CProduct extends Controller {

    cApp: CCartApp;
    pageProducts: PageProducts;
    private productTuid: TuidMain;
    packTuid: TuidDiv;
    private productChemicalMap: Map;
    private priceMap: Map;
    private getCustomerDiscount: Query;
    private getInventoryAllocationQuery: Query;
    private getFutureDeliveryTime: Query;

    private product: any;
    private productChemical: any;
    private prices: any[];

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUsqProduct, cUsqCustomerDiscount, cUsqWarehouse } = this.cApp;
        let searchProductQuery = cUsqProduct.query("searchProduct");
        this.pageProducts = new PageProducts(searchProductQuery);

        this.productTuid = cUsqProduct.tuid('product');
        this.packTuid = this.productTuid.divs['pack'];
        this.productChemicalMap = cUsqProduct.map('productChemical');
        this.priceMap = cUsqProduct.map('price');
        this.getCustomerDiscount = cUsqCustomerDiscount.query("getdiscount");
        this.getInventoryAllocationQuery = cUsqWarehouse.query("getInventoryAllocation");
        this.getFutureDeliveryTime = cUsqProduct.query("getFutureDeliveryTime");
    }

    protected async internalStart(param: any) {

        this.showVPage(VProductList, param);
    }

    showProductDetail = async (productId: number) => {

        this.product = await this.productTuid.load(productId);
        this.productChemical = await this.productChemicalMap.obj({ product: productId });
        if (this.productChemical) {
            this.product.chemical = this.productChemical.chemical;
        }
        /*
        let priceQueryCritiria: any = { product: productId, salesRegion: 1 }
        if (this.isLogined) {
            priceQueryCritiria.person = this.user.id;
        }
        this.prices = await this.getPriceQuery.table(priceQueryCritiria);
        */
        this.prices = await this.priceMap.table({ product: productId, salesRegion: 1 })
        let discount = 0;
        if (this.isLogined) {
            let discountSetting = await this.getCustomerDiscount.table({ brand: this.product.brand.id, person: this.user.id });
            discount = discountSetting && discountSetting[0] && discountSetting[0].discount;
        }
        this.prices.forEach(element => element.vipprice = element.price * (1 - discount));
        this.product.prices = this.prices;
        this.showVPage(VProduct, this.product);
    }

    getDeliveryTimeDescription = async (product: any, pack: any, salesRegion: any) => {

        let allocation = await this.getInventoryAllocationQuery.table({ product: product, pack: pack, salesRegion: salesRegion });
        if (allocation.length > 0) {
            return allocation[0].deliveryTimeDescription;
        } else {
            let futureDeliveryTime = await this.getFutureDeliveryTime.table({ product: product, salesRegion: salesRegion });
            if (futureDeliveryTime.length > 0) {
                return futureDeliveryTime[0].deliveyTimeDescription;
            }
        }
    }

}