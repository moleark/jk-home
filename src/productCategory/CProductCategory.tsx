import * as React from 'react';
import { ControllerUsq, Tuid, Map, CUsq } from 'tonva-react-usql';
import { observable } from 'mobx';
import { VRootCategory } from './VRootCategory';
import { VCategory } from './VCategory';
import { CCartApp } from 'home/CCartApp';

export class CProductCategory extends ControllerUsq {

    cApp: CCartApp;
    categories: any[];
    @observable rootCategories: any[] = [];
    categoryTuid: Tuid;
    categoryTreeMap: Map;

    constructor(cApp: CCartApp, cUsq: CUsq, res: any) {
        super(cUsq, res);

        this.cApp = cApp;
        this.categoryTuid = this.cUsq.tuid("productCategory");
        this.categoryTreeMap = this.cUsq.map("productCategoryTree");
    }

    async internalStart(param: any) {
        this.rootCategories = await this.categoryTreeMap.table({ _parent: 0 });
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

        return await this.categoryTreeMap.table({ _parent: categoryId });
    }

    async openMainPage(categoryWaper: any) {

        if (categoryWaper.isleaf) {

        } else {
            categoryWaper.children = await this.getCategoryChildren(categoryWaper.category.id);
            this.showVPage(VCategory, categoryWaper);
        }
    }
}