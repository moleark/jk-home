import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CCart } from './CCart';
import { List } from 'tonva-react-form';

export class VCart extends VPage<CCart> {

    private inputRefs: { [item: number]: HTMLInputElement } = {}

    private mapInputRef = (input: HTMLInputElement | null, item: any) => {

        if (input === null) return;
        input.value = item.quantity;
        return this.inputRefs[item.pack.id] = input;
    }

    async showEntry() {

        this.openPage(this.page);
    }

    /**
     *
     */
    private updateQuantity = async (item: any) => {

        let input = this.inputRefs[item.pack.id];
        await this.controller.updateQuantity(item, Number(input.value));
    }

    private removeFromCart = async(item: any) => {

        await this.controller.removeFromCart(item);
    }

    private onCartItemRender = (item: any) => {
        let {product, pack} = item;
        return <div className="row">
            <div className="col-1">
                <input type="checkbox" />
            </div>
            <div className="col-6">
                {product.content()}
                {pack.content()}
            </div>
            <div className="col-2">
                <input ref={(input) => this.mapInputRef(input, item)} type="number" onChange={() => this.updateQuantity(item)}></input>
            </div>
            <div className="col-2">
                <button type="button" onClick={() => this.removeFromCart(item)}>delete</button>
            </div>
        </div>
    }

    private page = () => {
        return <Page>
            <List items={this.controller.cartData} item={{ render: this.onCartItemRender }} />
        </Page>
    }
}