import * as React from 'react';
import { CProductCategory } from './CProductCategory';
import { VPage, Page } from 'tonva-tools';
import { List, FA } from 'tonva-react-form';

export class VCategory extends VPage<CProductCategory> {

    async showEntry(categoryWaper: any) {

        this.openPage(this.page, categoryWaper);
    }

    private renderChild = (childWapper: any) => {

        return <div className="py-2"><FA name="hand-o-right mr-2"></FA>{childWapper.name}</div>
    }

    private catClick = async (childWapper: any) => {

        await this.controller.openMainPage(childWapper);
    }

    private page = (categoryWaper: any) => {

        let { cHome } = this.controller.cApp;
        let header = cHome.renderSearchHeader();
        let cartLabel = this.controller.cApp.cCart.renderCartLabel();

        let { name, children } = categoryWaper;
        return <Page header={header} right={cartLabel}>
            <h3>{name}</h3>
            <hr />
            <List items={children} item={{ render: this.renderChild, onClick: this.catClick }} className="bg-white px-2" />
        </Page>
    }
}