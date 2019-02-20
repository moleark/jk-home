import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CProduct, productRow } from './CProduct';
import { List } from 'tonva-react-form';
import { observer } from 'mobx-react';
//import { cCartApp } from 'ui/CCartApp';

export class VProductList extends VPage<CProduct> {

    async open(param: any) {

        this.openPage(this.page);
    }

    private onProductClick = async (product: any) => {
        this.controller.showProductDetail(product.id);
    }

    private onScrollBottom = async () => {

        await this.controller.pageProducts.more();
    }

    private page = observer(() => {

        let { pageProducts, cApp } = this.controller;
        let header = cApp.cHome.renderSearchHeader();
        let cart = cApp.cCart.renderCartLabel();
        return <Page header={header} right={cart} onScrollBottom={this.onScrollBottom}>
            <List before={''} items={pageProducts} item={{ render: productRow, onClick: this.onProductClick }} />
        </Page>
    });
}