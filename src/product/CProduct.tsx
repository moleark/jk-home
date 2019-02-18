import * as React from 'react';
import * as _ from 'lodash';
import { Map, TuidDiv, TuidMain, Query, tv, BoxId } from 'tonva-react-uq';
import { PageItems, Controller } from 'tonva-tools';
import { CCartApp } from '../CCartApp';
import { PackItem } from '../tools';
import { VProduct } from './VProduct';
import { VProductList } from './VProductList';
import { Product } from './Product';

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
/*
export interface PackRow {
    pack: any;
    input: HTMLInputElement;
    quantity: number;
}
*/
/**
 *
 */
export class CProduct extends Controller {
    cApp: CCartApp;

    pageProducts: PageProducts;
    /*
    private productTuid: TuidMain;
    private packTuid: TuidDiv;
    private productChemicalMap: Map;
    private priceMap: Map;
    private getCustomerDiscount: Query;
    private getInventoryAllocationQuery: Query;
    private getFutureDeliveryTime: Query;
    */

    product: Product;
    //productBox: BoxId;
    //productChemical: any;

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUqProduct, cUqCustomerDiscount, cUqWarehouse } = cApp;
        let searchProductQuery = cUqProduct.query("searchProduct");
        this.pageProducts = new PageProducts(searchProductQuery);

        /*
        this.productTuid = cUqProduct.tuid('productx');
        this.packTuid = this.productTuid.divs['packx'];
        this.productChemicalMap = cUqProduct.map('productChemical');
        this.priceMap = cUqProduct.map('pricex');
        this.getCustomerDiscount = cUqCustomerDiscount.query("getdiscount");
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
        this.getFutureDeliveryTime = cUqProduct.query("getFutureDeliveryTime");
        */
    }

    protected async internalStart(param: any) {

        this.openVPage(VProductList, param);
    }

    buildPackRows():PackItem[] {
        return;
        /*
        let cardProduct = this.cApp.cCart.cart.items.find(v => v.product.id === this.product.id);
        if (cardProduct === undefined) return [];
        return _.cloneDeep(cardProduct.packs);
        */
        /*
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
        */
    }

    showProductDetail = async (id: number) => {
        /*
        // id: productId
        this.productBox = this.productTuid.boxId(id);
        let { currentSalesRegion, currentUser } = this.cApp;
        let promises: PromiseLike<any>[] = [];
        promises.push(this.productTuid.load(id));
        promises.push(this.productChemicalMap.obj({ product: id }));
        promises.push(this.priceMap.table({ product: id, salesRegion: currentSalesRegion.id }));
        promises.push(this.getFutureDeliveryTimeDescription(id, currentSalesRegion.id));
        let results = await Promise.all(promises);

        let p = 0;
        this.product = results[p++];
        let {packx} = this.product;

        this.productChemical = results[p++];
        if (this.productChemical) {
            this.product.chemical = this.productChemical.chemical;
            this.product.purity = this.productChemical.purity;
        }

        let prices: any[] = results[p++];
        let discount = 0;
        if (currentUser.hasCustomer) {
            let discountSetting = await this.getCustomerDiscount.table({ brand: this.product.brand.id, customer: currentUser.currentCustomer.id });
            discount = discountSetting && discountSetting[0] && discountSetting[0].discount;
        }
        prices.forEach(element => { element.vipprice = element.price * (1 - discount); element.currency = currentSalesRegion.currency.obj; });

        let fd = results[p++];
        for (let index = 0; index < packx.length; index++) {
            const element = this.product.packx[index];
            element.futureDeliveryTimeDescription = fd;
            element.inventoryAllocation = await this.getInventoryAllocations(this.product.id, element, currentSalesRegion);
        };
        packx.forEach(v => {
            let price = prices.find(x => x.pack.id === v.id);
            if (price) {
                let {retail, vipPrice} = price;
                v.retail = retail;
                v.vipPrice = vipPrice;
            }
            v.currency = currentSalesRegion.currency;
        })
        */
        let product = new Product(this.cApp);
        await product.load(id);
        this.openVPage(VProduct, product);
    }
    /*
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
    */
}

export function renderBrand(brand: any) {
    return <>
        <div className="col-4 col-sm-2 text-muted">品牌:</div>
        <div className="col-8 col-sm-4">{brand.name}</div>
    </>
}

export function productRow(product: any, index: number) {

    return <div className="row d-flex mb-1 px-2">
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
                        <div className="col-4 col-sm-2 text-muted pr-0">CAS:</div>
                        <div className="col-8 col-sm-4">{product.CAS}</div>
                        <div className="col-4 col-sm-2 text-muted pr-0">纯度:</div>
                        <div className="col-8 col-sm-4">{product.purity}</div>
                        <div className="col-4 col-sm-2 text-muted pr-0">分子式:</div>
                        <div className="col-8 col-sm-4">{product.molecularFomula}</div>
                        <div className="col-4 col-sm-2 text-muted pr-0">分子量:</div>
                        <div className="col-8 col-sm-4">{product.molecularWeight}</div>
                        <div className="col-4 col-sm-2 text-muted pr-0">产品编号:</div>
                        <div className="col-8 col-sm-4">{product.origin}</div>
                        {tv(product.brand, renderBrand)}
                    </div>
                </div>
            </div>
        </div>
    </div>
}