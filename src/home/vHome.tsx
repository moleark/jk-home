import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CCartApp } from './CCartApp';
import { List, SearchBox } from 'tonva-react-form';

const LIGUOSHENG = 5;

export class VHome extends VPage<CCartApp> {

    async showEntry(param?: any) {

        let { cHome } = this.controller;
        // let { homeSections } = cHome;
        // await homeSections.first({ key: "" });

        this.openPage(this.page);
    }

    private renderSection = (item: any, index: number) => {

        return <section>
            <h4>{item.title}<small className="text-muted">{item.subtitle}</small></h4>
            <p>{item.content}</p>
        </section>
    }

    private page = observer(() => {

        let { cHome, cProductCategory } = this.controller;
        let siteHeader = cHome.renderSiteHeader();
        let rootCategoryList = cProductCategory.renderRootList();

        let { openMetaView } = this.controller;
        let viewMetaButton = <></>;
        if (this.controller.isLogined && this.controller.user.id === LIGUOSHENG) {
            viewMetaButton = <button type="button" className="btn w-100" onClick={openMetaView}>view</button>
        }

        // let { homeSections } = cHome;
        return <Page header={false} footer={viewMetaButton}>
            {siteHeader}
            {cHome.renderSearchHeader()}
            {rootCategoryList}
        </Page>;
    })
}