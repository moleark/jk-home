import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CCartApp } from './CCartApp';
import { List, SearchBox } from 'tonva-react-form';

export class VHome extends VPage<CCartApp> {

    async showEntry(param?: any) {

        let { cHome } = this.controller;
        let { homeSections } = cHome;
        await homeSections.first({ key: "" });

        this.openPage(this.page);
    }

    private renderSection = (item: any, index: number) => {

        return <section>
            <h4>{item.title}<small className="text-muted">{item.subtitle}</small></h4>
            <p>{item.content}</p>
        </section>
    }

    private onSearch = async (key: string) => {

        let { cProduct } = this.controller;
        cProduct.start(key);
    }

    private page = observer(() => {

        let { cHome, cProductCategory} = this.controller;
        let siteHeader = cHome.renderSiteHeader();
        let rootCategoryList = cProductCategory.renderRootList();
        let { homeSections } = cHome;
        return <Page header={false}>
            {siteHeader}
            <SearchBox className="mx-1 my-1" onSearch={this.onSearch} placeholder="搜索商品" />
            {rootCategoryList}
        </Page>;
    })
}