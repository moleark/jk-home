import * as React from 'react';
import * as _ from 'lodash';
import { Map, TuidDiv, TuidMain, Query, tv, BoxId } from 'tonva-react-uq';
import { PageItems, Controller, nav, Page } from 'tonva-tools';
import { CCartApp } from '../CCartApp';
import { PackItem } from '../tools';
import { VProduct } from './VProduct';
import { VProductList } from './VProductList';
import { Product } from './Product';
import { loaderProductChemical, LoaderCartRow } from './itemLoader';
import { ViewProductChemical, ViewCartRow } from './itemView';

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
        let { cUqProduct } = this.cApp;
        let searchProductQuery = cUqProduct.query("searchProduct");
        this.pageProducts = new PageProducts(searchProductQuery);
        this.pageProducts.first({ key: key });
        this.openVPage(VProductList);
    }

    searchByCategory(category: any) {
        let { cUqProduct } = this.cApp;
        let searchProductQuery = cUqProduct.query("searchProductByCategory");
        this.pageProducts = new PageProducts(searchProductQuery);
        this.pageProducts.first({ productCategory: category.id, salesRegion: this.cApp.currentSalesRegion.id });
        this.openVPage(VProductList);
    }

    showProductDetail = async (id: number) => {
        let loader = new loaderProductChemical(this.cApp);
        let product = await loader.load(id);
        /*
        let product = new Product(this.cApp);
        await product.load(id);
        */
        this.openVPage(VProduct, product);
    }
}

export function renderBrand(brand: any) {
    return item('品牌', brand.name);
}

function item(caption: string, value: any) {
    if (value === null || value === undefined) return null;
    return <>
        <div className="col-4 col-sm-2 text-muted pr-0">{caption}:</div>
        <div className="col-8 col-sm-4">{value}</div>
    </>;
}

export function renderProduct(product: any, index: number) {
    let { brand, description, CAS, purity, molecularFomula, molecularWeight, origin } = product;
    return <div className="row d-flex mb-3 px-2">
        <div className="col-12">
            <div className="row py-2">
                <div className="col-12"><strong>{description}</strong></div>
            </div>
            <div className="row">
                <div className="col-3">
                    <img src="favicon.ico" alt="structure" />
                </div>
                <div className="col-9">
                    <div className="row">
                        {item('CAS', CAS)}
                        {item('纯度', purity)}
                        {item('分子式', molecularFomula)}
                        {item('分子量', molecularWeight)}
                        {item('产品编号', origin)}
                        {tv(brand, renderBrand)}
                    </div>
                </div>
            </div>
        </div>
    </div>
}