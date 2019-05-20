import * as React from 'react';
import { TuidMain } from 'tonva';
import { VSiteHeader } from './VSiteHeader';
import { CCartApp } from '../CCartApp';
import { PageItems, Controller } from 'tonva';
import { VSearchHeader } from './VSearchHeader';
import { VHome } from './VHome';

class HomeSections extends PageItems<any> {

    private sectionTuid: TuidMain;

    constructor(sectionTuid: TuidMain) {
        super();
        this.firstSize = this.pageSize = 13;
        this.sectionTuid = sectionTuid;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.sectionTuid.search("", pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        if (item === undefined) return 0;
        return item.id;
    }
}

export class CHome extends Controller {

    cApp: CCartApp;
    homeSections: HomeSections;
    sectionTuid: TuidMain;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
    }

    async internalStart(param: any) {

        let { cProductCategory } = this.cApp;
        await cProductCategory.start();
        this.openVPage(VHome);
    }

    renderSiteHeader = () => {
        return this.renderView(VSiteHeader);
    }

    renderSearchHeader = (size?:string) => {
        return this.renderView(VSearchHeader, size);
    }

    renderCategoryRootList = () => {
        let { cProductCategory } = this.cApp;
        return cProductCategory.renderRootList();
    }

    renderHome = () => {
        return this.renderView(VHome);
    }

    openMetaView = () => {
        this.cApp.startDebug();
    }

    tab = () => <this.renderHome />;
}