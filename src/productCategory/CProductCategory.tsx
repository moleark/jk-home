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
    private categoryTuid: Tuid;
    private categoryTreeMap: Map;
    private getRootCategoryQuery: Query;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
        let { cUsqProduct } = this.cApp;
        this.categoryTuid = cUsqProduct.tuid("productCategory");
        this.categoryTreeMap = cUsqProduct.map("productCategoryTree");
        this.getRootCategoryQuery = cUsqProduct.query('getRootCategory');
    }

    async internalStart(param: any) {
        // this.rootCategories = await this.categoryTreeMap.table({ parent: 0 });
        let { currentSalesRegion, currentLanguage } = this.cApp;
        this.rootCategories = await this.getRootCategoryQuery.table({ salesRegion: currentSalesRegion.id, language: currentLanguage.id });
        this.rootCategories.forEach(async element => {
            if (!element.isleaf) {
                element.children = await this.getCategoryChildren(element.id);
            }
        });
    }

    renderRootList = () => {
        return this.renderView(VRootCategory);
    };

    async getCategoryChildren(parentCategoryId: number) {

        return await this.categoryTreeMap.table({ parent: parentCategoryId });
    }

    async openMainPage(categoryWaper: any) {

        if (categoryWaper.isleaf) {

        } else {
            categoryWaper.children = await this.getCategoryChildren(categoryWaper.category.id);
            this.showVPage(VCategory, categoryWaper);
        }
    }
}