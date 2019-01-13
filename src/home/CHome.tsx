import * as React from 'react';
import { ControllerUsq, CApp, CUsq, TuidMain } from 'tonva-react-usql';
import { VSiteHeader } from './VSiteHeader';
import { CCartApp } from '../CCartApp';
import { PageItems, Controller } from 'tonva-tools';
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
        // this.sectionTuid = this.cUsq.tuid("section");
        // this.homeSections = new HomeSections(this.sectionTuid);
    }

    async internalStart(param: any) {

        let { cProductCategory } = this.cApp;
        await cProductCategory.start();
        this.showVPage(VHome);
    }

    renderSiteHeader = () => {
        return this.renderView(VSiteHeader);
    }

    renderSearchHeader = () => {
        return this.renderView(VSearchHeader);
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