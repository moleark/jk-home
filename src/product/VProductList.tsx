import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CProduct, renderProduct } from './CProduct';
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
        let none = <div className="my-3 mx-2 text-warning">抱歉，未找到相关产品，请重新搜索！</div>
        return <Page header={header} right={cart} onScrollBottom={this.onScrollBottom}>
            <List before={''} none={none} items={pageProducts} item={{ render: renderProduct, onClick: this.onProductClick }} />
        </Page>
    });
}