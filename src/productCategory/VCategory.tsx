import * as React from 'react';
import { CProductCategory } from './CProductCategory';
import { VPage, Page } from 'tonva-tools';
import { tv } from 'tonva-react-usql';
import { List, FA } from 'tonva-react-form';

export class VCategory extends VPage<CProductCategory> {

    async showEntry(categoryWaper: any) {

        this.openPage(this.page, categoryWaper);
    }

    private childUI = (child: any) => {
        return <div className="py-2"><FA name="hand-o-right mr-2"></FA>{child.name}</div>
    }

    private renderChild = (childWapper: any) => {

        return tv(childWapper.category, this.childUI);
    }

    private catClick = async (childWapper: any) => {

        await this.controller.openMainPage(childWapper);
    }

    private page = (categoryWaper: any) => {

        let { cHome } = this.controller.cApp;
        let header = cHome.renderSearchHeader();
        let cartLabel = this.controller.cApp.cCart.renderCartLabel();
        return <Page header={header} right={cartLabel}>
            <h3>{tv(categoryWaper.category, (category) => category.name)}</h3>
            <hr />
            <List items={categoryWaper.children} item={{ render: this.renderChild, onClick: this.catClick }} className="bg-white px-2" />
        </Page>
    }
}