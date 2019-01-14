import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CProduct, productRow } from './CProduct';
import { List, LMR, FA } from 'tonva-react-form';
import { tv, BoxId } from 'tonva-react-usql';
import { observer } from 'mobx-react';
import { cCartApp } from 'home/CCartApp';

interface PackRow {
    pack: BoxId;
    input: HTMLInputElement;
    retail: number;
    vipPrice: number;
    currency: any;
}

export class VProduct extends VPage<CProduct> {
    private packRows: PackRow[];

    async showEntry(product: any) {

        let { packTuid } = this.controller;
        this.packRows = [];
        let coll: { [packId: number]: PackRow } = {};
        for (let pr of product.prices) {
            let packRow: PackRow = {
                pack: pr.pack,
                retail: pr.retail,
                vipPrice: pr.vipPrice,
                currency: pr.currency,
            } as any;
            let packId = pr.pack.id;
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
        let { pack, retail, currency } = packRow;
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
                <div className="col-2">{retail}{currency && currency.name}</div>
                <div className="col-2">{retail}</div>
            </div>
        </LMR>
    };

    private onProductPackClicked = async (packRow: PackRow) => {

        let { pack, retail, currency } = packRow;
        let { cCart } = cCartApp;
        let input = packRow.input;
        await cCart.AddToCart(pack, Number(input.value), retail, currency);
    }

    private page = observer((product1: any) => {

        let { product } = this.controller;
        let header = cCartApp.cHome.renderSearchHeader();
        let cartLabel = cCartApp.cCart.renderCartLabel();
        let listHeader = <LMR className="pt-3" right="quantity  cart  favorite">
            <div className="row">
                <div className="col-2">SKU</div>
                <div className="col-2">price</div>
                <div className="col-2">vip price</div>
            </div>
        </LMR>
        return <Page header={header} right={cartLabel}>
            <div className="px-2 py-2 bg-white">{tv(product, productRow)}</div>
            <List items={this.packRows} item={{ render: this.onProductPackRender }} header={listHeader} className="px-2 bg-white" />
        </Page>
    })
}