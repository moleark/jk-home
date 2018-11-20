import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CProduct } from './CProduct';
import { List } from 'tonva-react-form';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export class VProduct extends VPage<CProduct> {

    private inputs: { [pack: number]: HTMLInputElement } = {};
    @observable private product: any;

    async showEntry(param: any) {

        this.product = param;
        this.openPage(this.page);
    }

    private inputRef = (input: HTMLInputElement | null, pack: any) => {
        if (input === null) return;
        // let i = this.inputs[pack.id];
        // if (i === undefined) input.value = '1';
        this.inputs[pack.id] = input;
    }

    private onProductPackRender = (pack: any, index: number) => {
        return <div className="row">
            <div className="col-2">{pack.name}</div>
            <div className="col-2">{pack.name}</div>
            <div className="col-2">{pack.retail}</div>
            <div className="col-2">
                <input
                    ref={(input) => this.inputRef(input, pack)}
                    type="number"
                    defaultValue="1" />
            </div>
            <div className="col-2"><button type="button" onClick={() => this.onProductPackClicked(pack)}>Cart</button></div>
            <div className="col-2">Favorite</div>
        </div>
    }

    private onProductPackClicked = async (pack: any) => {
        let input = this.inputs[pack.id];
        await this.controller.cApp.cCart.AddToCart(pack, Number(input.value));
    }

    private page = observer(() => {
        let btn = this.controller.cApp.cCart.renderCartLabel();
        return <Page right={btn}>
            <div className="row">
                <div className="col-sm-12">{this.product.description}</div>
                <div className="col-sm-12">
                    <List items={this.product.pack} item={{ render: this.onProductPackRender }} />
                </div>
            </div>
        </Page>
    })
}