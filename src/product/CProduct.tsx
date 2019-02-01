import * as React from 'react';
import * as _ from 'lodash';
import { Map, TuidDiv, TuidMain, Query, tv, BoxId } from 'tonva-react-usql';
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
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchProductQuery.page(param, pageStart, pageSize);
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
    product: Product;

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
    }

    protected async internalStart(param: any) {
        this.searchByKey(param);
    }

    searchByKey(key: string) {
        let { cUsqProduct } = this.cApp;
        let searchProductQuery = cUsqProduct.query("searchProduct");
        this.pageProducts = new PageProducts(searchProductQuery);
        this.pageProducts.first({ key: key });
        this.showVPage(VProductList);
    }

    searchByCategory(category: any) {
        let { cUsqProduct } = this.cApp;
        let searchProductQuery = cUsqProduct.query("searchProductByCategory");
        this.pageProducts = new PageProducts(searchProductQuery);
        this.pageProducts.first({ productCategory: category.id, salesRegion: this.cApp.currentSalesRegion.id });
        this.showVPage(VProductList);
    }

    showProductDetail = async (id: number) => {
        let product = new Product(this.cApp);
        await product.load(id);
        this.showVPage(VProduct, product);
    }
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