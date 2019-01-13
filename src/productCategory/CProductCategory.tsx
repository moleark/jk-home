import * as React from 'react';
import { ControllerUsq, Tuid, Map, CUsq } from 'tonva-react-usql';
import { observable } from 'mobx';
import { VRootCategory } from './VRootCategory';
import { VCategory } from './VCategory';
import { CCartApp } from 'CCartApp';
import { Controller } from 'tonva-tools';

export class CProductCategory extends Controller {

    cApp: CCartApp;
    categories: any[];
    @observable rootCategories: any[] = [];
    categoryTuid: Tuid;
    categoryTreeMap: Map;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
        let { cUsqProduct } = this.cApp;
        this.categoryTuid = cUsqProduct.tuid("productCategory");
        this.categoryTreeMap = cUsqProduct.map("productCategoryTree");
    }

    async internalStart(param: any) {
        this.rootCategories = await this.categoryTreeMap.table({ parent: 0 });
        this.rootCategories.forEach(async element => {
            if (!element.isleaf) {
                element.children = await this.getCategoryChildren(element.category.id);
            }
        });
    }

    renderRootList = () => {
        return this.renderView(VRootCategory);
    };

    async getCategoryChildren(categoryId: number) {

        return await this.categoryTreeMap.table({ parent: categoryId });
    }

    async openMainPage(categoryWaper: any) {

        if (categoryWaper.isleaf) {

        } else {
            categoryWaper.children = await this.getCategoryChildren(categoryWaper.category.id);
            this.showVPage(VCategory, categoryWaper);
        }
    }
}