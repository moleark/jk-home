import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CProduct, productRow } from './CProduct';
import { List } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { cCartApp } from 'home/CCartApp';

export class VProductList extends VPage<CProduct> {

    async showEntry(param: any) {

        let key = param;
        this.controller.pageProducts.first({ key: key });
        this.openPage(this.page);
    }

    private onProductClick = async (product: any) => {
        this.controller.showProductDetail(product.id);
    }

    private onScrollBottom = async () => {

        await this.controller.pageProducts.more();
    }

    private page = observer(() => {

        let { pageProducts } = this.controller;
        let header = cCartApp.cHome.renderSearchHeader();
        let cart = cCartApp.cCart.renderCartLabel();
        return <Page header={header} right={cart} onScrollBottom={this.onScrollBottom}>
            <List before={''} items={pageProducts} item={{ render: productRow, onClick: this.onProductClick }} className="bg-white px-2" />
        </Page>
    });
}