import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CProduct } from './CProduct';
import { tv } from 'tonva-react-usql';
import { List, LMR, SearchBox } from 'tonva-react-form';
import { observer } from 'mobx-react';

export class VProductList extends VPage<CProduct> {

    async showEntry(param: any) {

        let key = param;
        this.controller.pageProducts.first({ key: key });
        this.openPage(this.page);
    }

    private renderChemical = (chemical: any, purity: string) => {

        return <>
            <div className="col-4 col-md-2 text-muted">CAS:</div>
            <div className="col-8 col-md-4">{chemical.CAS}</div>
            <div className="col-4 col-md-2 text-muted">纯度:</div>
            <div className="col-8 col-md-4">{purity}</div>
            <div className="col-4 col-md-2 text-muted">分子式:</div>
            <div className="col-8 col-md-4">{chemical.molecularFomula}</div>
            <div className="col-4 col-md-2 text-muted">分子量:</div>
            <div className="col-8 col-md-4">{chemical.molecularWeight}</div>
        </>
    }

    private renderBrand = (brand: any) => {
        return <>
            <div className="col-4 col-md-2 text-muted">品牌:</div>
            <div className="col-8 col-md-4">{brand.name}</div>
        </>
    }

    private productRow = (product: any, index: number) => {

        return <div className="row d-flex">
            <div className="col-12">
                <div className="row py-2">
                    <div className="col-12"><strong>{product.description}</strong></div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <img src="favicon.ico" alt="structure" />
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {tv(product.chemical, this.renderChemical, product.purity)}
                            <div className="col-4 col-md-2 text-muted">产品编号:</div>
                            <div className="col-8 col-md-4">{product.origin}</div>
                            {tv(product.brand, this.renderBrand)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    private onProductClick = async (product: any) => {
        this.controller.showProductDetail(product.id);
    }

    private onScrollBottom = async () => {

        await this.controller.pageProducts.more();
    }

    private page = observer(() => {

        let { pageProducts } = this.controller;
        let header = this.controller.cApp.cHome.renderSearchHeader();
        let cart = this.controller.cApp.cCart.renderCartLabel();
        return <Page header={header} right={cart} onScrollBottom={this.onScrollBottom}>
            <List before={''} items={pageProducts} item={{ render: this.productRow, onClick: this.onProductClick }} className="bg-white px-2" />
        </Page>
    });
}