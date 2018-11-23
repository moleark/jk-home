import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva-tools';
import { List, SearchBox } from 'tonva-react-form';
import { TuidMain, tv } from 'tonva-react-usql';
import { observer } from 'mobx-react';
import { CCartApp } from './CCartApp';

class PageProducts extends PageItems<any> {

    private productTuid: TuidMain;

    constructor(productTuid: TuidMain) {
        super();
        this.pageSize = 3;
        this.productTuid = productTuid;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        let { key } = param;
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.productTuid.search(param.key, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        if (item === undefined) return 0;
        return item.id;
    }
}

export class VHome extends VPage<CCartApp> {

    pageProducts: PageProducts;
    async showEntry(param?: any) {
        let productTuid = this.controller.cUsq.tuid("product");
        this.pageProducts = new PageProducts(productTuid);
        this.openPage(this.page);
    }

    private onSearch = async (key: string) => {
        this.pageProducts.first({ key: key });
    }

    private productRow = (product: any, index: number) => {
        return <div className="px-3 py-2">{tv(product)}</div>
    }

    private onProductClick = async (product: any) => {
        let { cProduct } = this.controller;
        cProduct.start(product.id);
    }

    private onScrollBottom = async () => {

        await this.pageProducts.more();
    }

    private page = observer(() => {
        let header = <SearchBox className="ml-1 mr-2 w-100" onSearch={this.onSearch} placeholder="搜索商品" />;
        let right = this.controller.cCart.renderCartLabel();
        return <Page header={header} onScrollBottom={this.onScrollBottom} right={right}>
            <List items={this.pageProducts} item={{ render: this.productRow, onClick: this.onProductClick }} />
        </Page>;
    })
}
