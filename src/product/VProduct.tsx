import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CProduct } from './CProduct';
import { List } from 'tonva-react-form';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export class VProduct extends VPage<CProduct> {

    @observable private product: any;
    async showEntry(param: any) {

        this.product = param;
        this.openPage(this.page);
    }

    private onProductPackRender = (pack: any, index: number) => {
        return <div className="row">
            <div className="col-2">{pack.name}</div>
            <div className="col-2">{pack.name}</div>
            <div className="col-2">{pack.retail}</div>
            <div className="col-2"><input type="number" value={pack.quantity} onChange={this.onQuantityChange.bind(this, pack)} /></div>
            <div className="col-2"><button type="button" onClick={this.onProductPackClicked.bind(this, pack)}>Cart</button></div>
            <div className="col-2">Favorite</div>
        </div>
    }

    private onQuantityChange = (pack: any, event: React.ChangeEvent<HTMLInputElement>) => {

        pack.quantity = event.target.value;
    }

    private onProductPackClicked = async (pack: any) => {

        await this.controller.AddToCart(pack, pack.quantity);
    }

    private page = observer(() => {
        return <Page>
            <div className="row">
                <div className="col-sm-12">{this.product.description}</div>
                <div className="col-sm-12">
                    <List items={this.product.pack} item={{ render: this.onProductPackRender }} />
                </div>
            </div>
        </Page>
    })
}