import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, BoxId } from 'tonva';
import { PageItems, Controller, nav, Page, Image } from 'tonva';
import classNames from 'classnames';
import { CCartApp } from '../CCartApp';
import { VProduct } from './VProduct';
import { VProductList } from './VProductList';
import { LoaderProductChemicalWithPrices } from './itemLoader';
import { ProductImage } from 'tools/productImage';

class PageProducts extends PageItems<any> {

    private searchProductQuery: Query;

    constructor(searchProductQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchProductQuery = searchProductQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchProductQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.seq;
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
        let { cUqProduct, currentSalesRegion } = this.cApp;
        let searchProductQuery = cUqProduct.query("searchProduct");
        this.pageProducts = new PageProducts(searchProductQuery);
        this.pageProducts.first({ key: key, salesRegion: currentSalesRegion.id });
        this.openVPage(VProductList, key);
    }

    async searchByCategory(category: any) {
        let { cUqProduct, currentSalesRegion } = this.cApp;
        let searchProductQuery = cUqProduct.query("searchProductByCategory");
        this.pageProducts = new PageProducts(searchProductQuery);
        let { productCategoryId, name } = category;
        this.pageProducts.first({ productCategory: productCategoryId, salesRegion: currentSalesRegion.id });
        this.openVPage(VProductList, name);
    }

    showProductDetail = async (id: number) => {

        let loader = new LoaderProductChemicalWithPrices(this.cApp);
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

export function productPropItem(caption: string, value: any, captionClass?: string) {
    if (value === null || value === undefined || value === '0') return null;
    let capClass = captionClass ? classNames(captionClass) : classNames("text-muted");
    let valClass = captionClass ? classNames(captionClass) : "";
    return <>
        <div className={classNames("col-6 col-sm-2 pr-0 small", capClass)}> {caption}</div>
        <div className={classNames("col-6 col-sm-4", valClass)}>{value}</div>
    </>;
}

export function renderProduct(product: any, index: number) {
    let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
    return <div className="d-block mb-4 px-3">
        <div className="py-2">
            <div><strong>{description}</strong></div>
            <div>{descriptionC}</div>
        </div>
        <div className="row">
            <div className="col-3">
                <ProductImage chemicalId={imageUrl} className="w-100" />
            </div>
            <div className="col-9">
                <div className="row">
                    {productPropItem('CAS', CAS)}
                    {productPropItem('产品编号', origin)}
                    {productPropItem('纯度', purity)}
                    {productPropItem('分子式', molecularFomula)}
                    {productPropItem('分子量', molecularWeight)}
                    {tv(brand, renderBrand)}
                </div>
            </div>
        </div>
    </div>
}