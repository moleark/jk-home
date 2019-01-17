import * as React from 'react';
import { Map, TuidDiv, TuidMain, Query, tv, BoxId } from 'tonva-react-usql';
import { VProduct } from './VProduct';
import * as _ from 'lodash';
import { CCartApp } from 'CCartApp';
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

export interface PackRow {
    pack: any;
    input: HTMLInputElement;
    quantity: number;
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

    product: any;
    private productChemical: any;

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUsqProduct, cUsqCustomerDiscount, cUsqWarehouse } = cApp;
        let searchProductQuery = cUsqProduct.query("searchProduct");
        this.pageProducts = new PageProducts(searchProductQuery);

        this.productTuid = cUsqProduct.tuid('productx');
        this.packTuid = this.productTuid.divs['packx'];
        this.productChemicalMap = cUsqProduct.map('productChemical');
        this.priceMap = cUsqProduct.map('price2');
        this.getCustomerDiscount = cUsqCustomerDiscount.query("getdiscount");
        this.getInventoryAllocationQuery = cUsqWarehouse.query("getInventoryAllocation");
        this.getFutureDeliveryTime = cUsqProduct.query("getFutureDeliveryTime");
    }

    protected async internalStart(param: any) {

        this.showVPage(VProductList, param);
    }

    buildPackRows() {

        let packRows = [];
        for (let pk of this.product.packx) {
            let packRow: PackRow = {
                pack: pk,
            } as any;
            // 如果当前产品在购物车中，设置其初始的数量
            let pr2: any = this.cApp.cCart.cart.getItem(pk.id);
            if (pr2)
                packRow.quantity = pr2.quantity;
            packRows.push(packRow);
        }
        return packRows;
    }

    showProductDetail = async (productId: number) => {

        let { currentSalesRegion, currentUser } = this.cApp;
        let promises: PromiseLike<any>[] = [];
        promises.push(this.productTuid.load(productId));
        promises.push(this.productChemicalMap.obj({ product: productId }));
        promises.push(this.priceMap.table({ product: productId, salesRegion: currentSalesRegion.id }));
        promises.push(this.getFutureDeliveryTimeDescription(productId, currentSalesRegion.id));
        let results = await Promise.all(promises);

        this.product = results[0];
        this.productChemical = results[1];
        if (this.productChemical) {
            this.product.chemical = this.productChemical.chemical;
            this.product.purity = this.productChemical.purity;
        }

        let prices: any[] = results[2];
        let discount = 0;
        if (currentUser.hasCustomer) {
            let discountSetting = await this.getCustomerDiscount.table({ brand: this.product.brand.id, customer: currentUser.currentCustomer.id });
            discount = discountSetting && discountSetting[0] && discountSetting[0].discount;
        }
        prices.forEach(element => { element.vipprice = element.price * (1 - discount); element.currency = currentSalesRegion.currency.obj; });

        for (let index = 0; index < this.product.packx.length; index++) {
            const element = this.product.packx[index];
            element.futureDeliveryTimeDescription = results[3];
            element.inventoryAllocation = await this.getInventoryAllocations(this.product.id, element.id, currentSalesRegion.id);
        }
        this.product.packx.forEach(v => {
            let price = prices.find(x => x.pack.id === v.id);
            v.retail = price && price.retail;
            v.vipPrice = price && price.vipPrice;
            v.currency = currentSalesRegion.currency;
        })
        this.showVPage(VProduct, this.product);
    }

    getInventoryAllocations = async (productId: number, packId: number, salesRegionId: number) => {

        let allocation = await this.getInventoryAllocationQuery.table({ product: productId, pack: packId, salesRegion: salesRegionId });
        return allocation;
    }

    getFutureDeliveryTimeDescription = async (productId: number, salesRegionId: number) => {
        let futureDeliveryTime = await this.getFutureDeliveryTime.table({ product: productId, salesRegion: salesRegionId });
        if (futureDeliveryTime.length > 0) {
            return futureDeliveryTime[0].deliveryTimeDescription;
        }
    }

}

export function renderBrand(brand: any) {
    return <>
        <div className="col-4 col-md-2 text-muted">品牌:</div>
        <div className="col-8 col-md-4">{brand.name}</div>
    </>
}

export function productRow(product: any, index: number) {

    return <div className="row d-flex">
        <div className="col-12">
            <div className="row py-2">
                <div className="col-12"><strong>{product.description}</strong></div>
            </div>
            <div className="row">
                <div className="col-3">
                    <img src="favicon.ico" alt="structure" />
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="col-4 col-md-2 text-muted">CAS:</div>
                        <div className="col-8 col-md-4">{product.CAS}</div>
                        <div className="col-4 col-md-2 text-muted">纯度:</div>
                        <div className="col-8 col-md-4">{product.purity}</div>
                        <div className="col-4 col-md-2 text-muted">分子式:</div>
                        <div className="col-8 col-md-4">{product.molecularFomula}</div>
                        <div className="col-4 col-md-2 text-muted">分子量:</div>
                        <div className="col-8 col-md-4">{product.molecularWeight}</div>
                        <div className="col-4 col-md-2 text-muted">产品编号:</div>
                        <div className="col-8 col-md-4">{product.origin}</div>
                        {tv(product.brand, renderBrand)}
                    </div>
                </div>
            </div>
        </div>
    </div>
}