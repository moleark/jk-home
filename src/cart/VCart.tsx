import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CCart } from './CCart';
import { List, LMR, FA } from 'tonva-react-form';
import { tv, BoxId } from 'tonva-react-usql';
import { observer } from 'mobx-react';
import { Product } from 'product/Product';
import { CartItem } from './Cart';

export class VCart extends VPage<CCart> {

    private inputRefs: { [item: number]: HTMLInputElement } = {}
    private checkBoxs: { [packId: number]: HTMLInputElement } = {}

    private mapInputRef = (input: HTMLInputElement | null, item: any) => {
        if (input === null) return;
        input.value = item.quantity;
        return this.inputRefs[item.pack.id] = input;
    }

    private mapCheckBox = (input: HTMLInputElement | null, item: any) => {
        if (input === null) return;
        input.checked = item.checked || false;
        return this.checkBoxs[item.pack.id] = input;
    }

    async showEntry() {

        this.openPage(this.page);
    }

    private updateChecked = async (item: any) => {

        let input = this.checkBoxs[item.pack.id];
        await this.controller.cart.updateChecked(item, input.checked);
    }

    /**
     *
     */
    private updateQuantity = async (item: any) => {

        let input = this.inputRefs[item.pack.id];
        await this.controller.cart.updateQuantity(item, Number(input.value));
    }

    private minusQuantity = async (item: any) => {

        if (item.quantity > 1)
            await this.controller.cart.updateQuantity(item, item.quantity - 1);
    }

    private plusQuantity = async (item: any) => {

        await this.controller.cart.updateQuantity(item, item.quantity + 1);
    }

    private renderProduct = (product: any) => <strong>{product.description}</strong>
    private renderPack = (pack: any) => {
        return <>{(pack.radiox === 1 ? "": pack.radiox + '*') + pack.radioy + pack.unit}</>
    }
    private renderItem = (cartItem: CartItem) => {
        return <div className="row">
            <div className="col-3">
                <img src="favicon.ico" alt={cartItem.product.obj.description} />
            </div>
            <div className="col-9">
                <div className="row">
                    <div className="col-12">
                        {tv(cartItem.product, this.renderProduct)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">{tv(cartItem.pack, this.renderPack)}</div>
                    <div className="col-3"><strong className="text-danger">{cartItem.price}</strong></div>
                    <div className="col-6 text-right d-flex">
                        <div onClick={() => this.minusQuantity(cartItem)}><FA name="minus-circle text-success" /></div>
                        <span className="px-4 bg-light">{cartItem.quantity}</span>
                        <div onClick={() => this.plusQuantity(cartItem)}><FA name="plus-circle text-success" /></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">货期</div>
                </div>
            </div>
        </div>
    }

    private onCartItemRender = (cartItem: CartItem) => {
        let { isDeleted } = cartItem;
        let prod = <>
            {this.renderItem(cartItem)}
        </>;
        let input = <input
            className="text-center"
            style={{ width: "60px" }}
            ref={(input) => this.mapInputRef(input, cartItem)}
            type="number"
            onChange={() => this.updateQuantity(cartItem)} disabled={isDeleted} />;
        let onClick, btnContent;
        let mid;
        if (isDeleted === true) {
            mid = <del>{prod}</del>;
            onClick = () => cartItem.isDeleted = false;
            btnContent = <FA name="rotate-left" />;
        }
        else {
            mid = <div>
                {prod}
            </div>
            onClick = () => cartItem.isDeleted = true;
            btnContent = <FA name="trash-o" />;
        }
        let button = <button className="btn btn-light" type="button" onClick={onClick}>{btnContent}</button>;
        return <LMR className="px-2 py-2"
            left={<input className="mr-3"
                type="checkbox"
                ref={(input) => this.mapCheckBox(input, cartItem)}
                onChange={() => this.updateChecked(cartItem)} disabled={isDeleted} />}
            right={<>{button}</>}>
            {mid}
        </LMR>;
    }

    private CheckOutButton = observer(() => {
        let { checkOut, cart } = this.controller;
        //let { count, amount } = cart.sum;
        let amount = cart.amount.get();
        let check = "去结算";
        let content = amount > 0 ?
            <>{check} ({amount} 元)</> :
            <>{check}</>;
        return <button className="btn btn-success w-100" type="button" onClick={checkOut} disabled={amount <= 0}>
            {content}
        </button>;
    });

    render(params: any): JSX.Element {
        return this.page();
    }

    private page = () => {
        let { cart } = this.controller;
        return <Page header="购物车" footer={<this.CheckOutButton />}>
            <div className="row">
                <div className="col-12">
                    <List items={cart.items} item={{ render: this.onCartItemRender }} />
                </div>
            </div>
        </Page>
    }
}