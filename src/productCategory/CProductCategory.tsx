import * as React from 'react';
import { Query } from 'tonva';
import { observable } from 'mobx';
import { VRootCategory } from './VRootCategory';
import { VCategory } from './VCategory';
import { CCartApp } from 'CCartApp';
import { Controller } from 'tonva';

export class CProductCategory extends Controller {

    cApp: CCartApp;
    // categories: any[];
    @observable categories: any[] = [];
    private getRootCategoryQuery: Query;
    private getChildrenCategoryQuery: Query;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
        let { cUqProduct } = this.cApp;
        this.getRootCategoryQuery = cUqProduct.query('getRootCategory');
        this.getChildrenCategoryQuery = cUqProduct.query('getChildrenCategory');
    }

    async internalStart(param: any) {
        let { currentSalesRegion, currentLanguage } = this.cApp;
        let results = await this.getRootCategoryQuery.query({ salesRegion: currentSalesRegion.id, language: currentLanguage.id });
        this.categories = results.first;
        this.categories.forEach(element => {
            this.buildCategories(element, results.secend, results.third);
        })
    }

    renderRootList = () => {
        return this.renderView(VRootCategory);
    };

    async getCategoryChildren(parentCategoryId: number) {
        let { currentSalesRegion, currentLanguage } = this.cApp;
        return await this.getChildrenCategoryQuery.query({ parent: parentCategoryId, salesRegion: currentSalesRegion.id, language: currentLanguage.id });
    }

    async buildCategories(categoryWapper: any, firstCategory: any, secendCategory: any) {
        firstCategory.forEach(async element => {
            element.children = secendCategory.filter(v => v.parent === element.productCategory.id);
        });
        categoryWapper.children = firstCategory.filter(v => v.parent === categoryWapper.productCategory.id);
    }

    async openMainPage(categoryWaper: any, parent: any) {

        let { productCategory, name } = categoryWaper;
        let { id: productCategoryId } = productCategory;
        let results = await this.getCategoryChildren(productCategoryId);
        if (results.first.length !== 0) {
            this.buildCategories(categoryWaper, results.first, results.secend);
            this.openVPage(VCategory, { categoryWaper, parent });
        } else {
            let { cProduct } = this.cApp;
            await cProduct.searchByCategory({ productCategoryId, name });
        }
    }
}