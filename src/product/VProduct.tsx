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

    async showEntry(param: any) {

        let { packTuid, prices, product } = this.controller;
        this.packRows = [];
        let coll: { [packId: number]: PackRow } = {};
        for (let pr of prices) {
            let packRow: PackRow = {
                pack: pr.pack,
                retail: pr.retail,
                vipPrice: pr.vipPrice,
            } as any;
            let packId = pr.pack.id;
            coll[packId] = packRow;
            this.packRows.push(packRow);
        }
        for (let pk of product.pack) {
            let { id } = pk;
            let packRow = coll[id];
            if (packRow === undefined) {
                packRow = {} as any;
                this.packRows.push(packRow);
                packRow.pack = packTuid.boxId(id);
            }
        }

        this.openPage(this.page);
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

    private page = observer(() => {

        let { cApp, product } = this.controller;
        let header = this.controller.cApp.cHome.renderSearchHeader();
        let cartLabel = cApp.cCart.renderCartLabel();
        let listHeader = <div className="row">
            <div className="col-2">SKU</div>
            <div className="col-2">price</div>
            <div className="col-2">viprpice</div>
            <div className="col-2">viprpice</div>
            <div className="col-2">viprpice</div>
            <div className="col-2">viprpice</div>
        </div>
        return <Page header={header} right={cartLabel}>
            <div className="px-2 py-2 bg-white">{tv(product)}</div>
            <List items={this.packRows} item={{ render: this.onProductPackRender }} header={listHeader} className="px-2 bg-white" />
        </Page>
    })
}