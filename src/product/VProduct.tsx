import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CProduct } from './CProduct';
import { List, LMR, FA } from 'tonva-react-form';
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
        // let i = this.inputs[pack.id];
        // if (i === undefined) input.value = '1';
        //this.inputs[pack.id] = input;
        packRow.input = input;
    }

    private onProductPackRender = (packRow: PackRow, index: number) => {
        let { pack, retail } = packRow;
        let right = <>
            <input
                className="text-center"
                ref={(input) => this.inputRef(input, packRow)}
                type="number"
                defaultValue="1" />
            <button type="button" onClick={() => this.onProductPackClicked(packRow)}><FA name="cart-plus" /></button>
            <button type="button" className="btn btn-light"><FA name="heart" /></button>
        </>
        return <LMR right={right}>
            {tv(pack)}
            {retail}
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
        let cartLabel = cApp.cCart.renderCartLabel();
        return <Page right={cartLabel}>
            <div className="row">
                <div className="col-sm-12">{tv(product)}</div>
                <div className="col-sm-12">
                    <List items={this.packRows} item={{ render: this.onProductPackRender }} />
                </div>
            </div>
        </Page>
    })
}