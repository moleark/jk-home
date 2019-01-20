import * as React from 'react';
import { ControllerUsq, Tuid, Map, CUsq, Query } from 'tonva-react-usql';
import { observable } from 'mobx';
import { VRootCategory } from './VRootCategory';
import { VCategory } from './VCategory';
import { CCartApp } from 'CCartApp';
import { Controller } from 'tonva-tools';

export class CProductCategory extends Controller {

    cApp: CCartApp;
    categories: any[];
    @observable rootCategories: any[] = [];
    private getRootCategoryQuery: Query;
    private getChildrenCategoryQuery: Query;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
        let { cUsqProduct } = this.cApp;
        this.getRootCategoryQuery = cUsqProduct.query('getRootCategory');
        this.getChildrenCategoryQuery = cUsqProduct.query('getChildrenCategory');
    }

    async internalStart(param: any) {
        let { currentSalesRegion, currentLanguage } = this.cApp;
        let results = await this.getRootCategoryQuery.query({ salesRegion: currentSalesRegion.id, language: currentLanguage.id });
        this.rootCategories = results.ret;
        let subCategory = results.sub;
        this.rootCategories.forEach(async element => {
            element.children = subCategory.filter(v => v.parent === element.productCategory.id);
        });
    }

    renderRootList = () => {
        return this.renderView(VRootCategory);
    };

    async getCategoryChildren(parentCategoryId: number) {

        return await this.getChildrenCategoryQuery.table({ parent: parentCategoryId });
    }

    async openMainPage(categoryWaper: any) {

        let { productCategory, children } = categoryWaper;
        if (productCategory.obj.isleaf) {
            // 导航到产品列表界面
        } else {
            if (!children)
                categoryWaper.children = await this.getCategoryChildren(categoryWaper.id);
            this.showVPage(VCategory, categoryWaper);
        }
    }
}