import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv } from 'tonva-react-uq';
import { PageItems, Controller, nav, Page } from 'tonva-tools';
import { CCartApp } from '../CCartApp';
import { VProduct } from './VProduct';
import { VProductList } from './VProductList';
import { LoaderProductChemical } from './itemLoader';

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

        let loader = new LoaderProductChemical(this.cApp);
        let product = await loader.load(id);
        /*
        let product = new Product(this.cApp);
        await product.load(id);
        */
        this.openVPage(VProduct, product);
    }
}

export function renderBrand(brand: any) {
    return productPropItem('品牌', brand.name);
}

export function productPropItem(caption: string, value: any) {
    if (value === null || value === undefined) return null;
    return <>
        <div className="col-4 col-sm-2 text-muted pr-0 small">{caption}</div>
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
                        {productPropItem('CAS', CAS)}
                        {productPropItem('纯度', purity)}
                        {productPropItem('分子式', molecularFomula)}
                        {productPropItem('分子量', molecularWeight)}
                        {productPropItem('产品编号', origin)}
                        {tv(brand, renderBrand)}
                    </div>
                </div>
            </div>
        </div>
    </div>
}