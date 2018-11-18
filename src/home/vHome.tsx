import * as React from 'react';
import { VPage, Page, nav, PageItems, Controller } from 'tonva-tools';
import { List, SearchBox } from 'tonva-react-form';
import { CUsq, TuidMain, CTuid, Tuid, CTuidMain, ControllerUsq } from 'tonva-react-usql';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { CProduct } from '../product';
import { CCartApp } from './CCartApp';

const usqCartName = '百灵威系统工程部/cart';
const sectionClass = "my-3 p-3 bg-white";

class PageProducts extends PageItems<any> {

    private productEntity: TuidMain;

    constructor(productEntity: TuidMain) {
        super();
        this.pageSize = 3;
        this.productEntity = productEntity;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        let { key } = param;
        if (pageStart === undefined) pageStart = 0;
        /*

        let ret = [
            { id: 1, description: "(4-Oxo-6,7-dihydro-4H,5H-cyclopenta[4,5]thieno-[2,3-d]pyrimidin-3-yl)-acetic acid, 97%" },
            { id: 2, description: "(1-Naphthylmethyl)triphenylphosphonium chloride, 98% " },
            { id: 3, description: "(4-Oxo-6,7-dihydro-4H,5H-cyclopenta[4,5]thieno-[2,3-d]pyrimidin-3-yl)-acetic acid, 97%" },
            { id: 4, description: "(1-Naphthylmethyl)triphenylphosphonium chloride, 98% " },
        ];
        if (pageStart === undefined) pageStart = 0;
        for (let r of ret) r.id = ++pageStart;
        return ret;
        */
        let ret = await this.productEntity.search(param.key, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        if (item === undefined) return 0;
        return item.id;
    }
}

export class VHome extends VPage<CCartApp> {

    cUsq: CUsq;
    pageProducts: PageProducts;
    async showEntry(param?: any) {
        this.cUsq = this.controller.getCUsq(usqCartName);
        let product = this.cUsq.getTuid("product");
        this.pageProducts = new PageProducts(product);
        this.openPage(this.page);
    }

    private onSearch = async (key: string) => {
        this.pageProducts.first({ key: key });
    }

    private productRow = (item: any, index: number) => {
        return <div className="px-3 py-2">{JSON.stringify(item)}</div>
    }

    private onProductClick = async (item: any) => {

        let cproduct = new CProduct(this.cUsq, undefined);
        cproduct.start(item.id);
    }

    private onScrollBottom = async () => {

        await this.pageProducts.more();
    }

    private page = observer(() => {

        return <Page header={false} onScrollBottom={this.onScrollBottom}>
            <SearchBox onSearch={this.onSearch} />
            <List items={this.pageProducts} item={{ render: this.productRow, onClick: this.onProductClick }} />
            <div className="row">
                <div className="col-sm-12">
                    <form className="form-inline">
                        <label className="sr-only" htmlFor="searchBox">Search</label>
                        <div className="input-group mb-2 mr-sm-2">
                            <input type="input" id="searchBox" className="form-control" placeholder="search" />
                            <div className="input-group-prepend">
                                <button type="button" className="input-group-text" onClick={undefined}>Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Page>;
    })
}
