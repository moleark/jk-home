import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CProduct } from './CProduct';
import { List, LMR, FA, SearchBox } from 'tonva-react-form';
import { tv, BoxId } from 'tonva-react-usql';
import { observer } from 'mobx-react';

interface PackRow {
    pack: BoxId;
    input: HTMLInputElement;
    retail: number;
    vipPrice: number;
}

export class VProduct extends VPage<CProduct> {
    private packRows: PackRow[];

    async showEntry(product: any) {

        let { packTuid } = this.controller;
        this.packRows = [];
        let coll: { [packId: number]: PackRow } = {};
        for (let pr of product.prices) {
            let packRow: PackRow = {
                pack: pr.packx,
                retail: pr.retail,
                vipPrice: pr.vipPrice,
            } as any;
            let packId = pr.packx.id;
            coll[packId] = packRow;
            this.packRows.push(packRow);
        }
        for (let pk of product.packx) {
            let { id } = pk;
            let packRow = coll[id];
            if (packRow === undefined) {
                packRow = {} as any;
                this.packRows.push(packRow);
                packRow.pack = packTuid.boxId(id);
            }
        }

        this.openPage(this.page, product);
    }

    private inputRef = (input: HTMLInputElement | null, packRow: PackRow) => {
        if (input === null) return;
        packRow.input = input;
    }

    private onProductPackRender = (packRow: PackRow, index: number) => {
        let { pack, retail } = packRow;
        let right = <>
            <input
                className="text-center"
                style={{ width: "60px" }}
                ref={(input) => this.inputRef(input, packRow)}
                type="number"
                defaultValue="1" />
            <button type="button"
                className="btn btn-light"
                onClick={() => this.onProductPackClicked(packRow)}>
                <FA name="cart-plus" className="text-info" />
            </button>
            <button type="button" className="btn btn-light"><FA name="heart-o" className="text-danger small" /></button>
        </>
        return <LMR className="pt-3" right={right}>
            <div className="row">
                <div className="col-2">{pack.obj.name}</div>
                <div className="col-2">{retail}</div>
                <div className="col-2">{retail}</div>
            </div>
        </LMR>
    };

    private onProductPackClicked = async (packRow: PackRow) => {

        let { pack, retail } = packRow;
        let { cApp } = this.controller;
        let { cCart } = cApp
        let input = packRow.input;
        await cCart.AddToCart(pack, Number(input.value), retail);
    }

    private page = observer((product1: any) => {

        let { cApp, product } = this.controller;
        let header = this.controller.cApp.cHome.renderSearchHeader();
        let cartLabel = cApp.cCart.renderCartLabel();
        let listHeader = <LMR className="pt-3" right="quantity  cart  favorite">
            <div className="row">
                <div className="col-2">SKU</div>
                <div className="col-2">price</div>
                <div className="col-2">vipPrice</div>
            </div>
        </LMR>
        return <Page header={header} right={cartLabel}>
            <div className="px-2 py-2 bg-white">{tv(product)}</div>
            <List items={this.packRows} item={{ render: this.onProductPackRender }} header={listHeader} className="px-2 bg-white" />
        </Page>
    })



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

}