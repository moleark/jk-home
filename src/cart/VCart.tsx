import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CCart } from './CCart';
import { List, LMR, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-usql';
import { observer } from 'mobx-react';
import { Product } from 'product/Product';

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
        await this.controller.updateChecked(item, input.checked);
    }

    /**
     *
     */
    private updateQuantity = async (item: any) => {

        let input = this.inputRefs[item.pack.id];
        await this.controller.updateQuantity(item, Number(input.value));
    }

    private minusQuantity = async (item: any) => {

        if (item.quantity > 1)
            await this.controller.updateQuantity(item, item.quantity - 1);
    }

    private plusQuantity = async (item: any) => {

        await this.controller.updateQuantity(item, item.quantity + 1);
    }

    private renderProduct = (product: any) => <strong>{product.description}</strong>
    private renderPack = (pack: any) => <>{pack.name}</>
    private renderItem = (item: any) => {
        return <div className="row">
            <div className="col-3">
                <img src="favicon.ico" alt={item.product.obj.description} />
            </div>
            <div className="col-9">
                <div className="row">
                    <div className="col-12">
                        {tv(item.product, this.renderProduct)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">{tv(item.pack, this.renderPack)}</div>
                    <div className="col-3"><strong className="text-danger">{item.price}</strong></div>
                    <div className="col-6 text-right d-flex">
                        <div onClick={() => this.minusQuantity(item)}><FA name="minus-circle" /></div>
                        <span className="px-4 bg-light">{item.quantity}</span>
                        <div onClick={() => this.plusQuantity(item)}><FA name="plus-circle" /></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">货期</div>
                </div>
            </div>
        </div>
    }

    private onCartItemRender = (item: any) => {
        let { product, pack, isDeleted } = item;
        let prod = <>
            {tv(item, this.renderItem)}
        </>;
        let input = <input
            className="text-center"
            style={{ width: "60px" }}
            ref={(input) => this.mapInputRef(input, item)}
            type="number"
            onChange={() => this.updateQuantity(item)} disabled={isDeleted} />;
        let onClick, btnContent;
        let mid;
        if (isDeleted === true) {
            mid = <del>{prod}</del>;
            onClick = () => item.isDeleted = false;
            btnContent = <FA name="rotate-left" />;
        }
        else {
            mid = <div>
                {prod}
            </div>
            onClick = () => item.isDeleted = true;
            btnContent = <FA name="trash-o" />;
        }
        let button = <button className="btn btn-light" type="button" onClick={onClick}>{btnContent}</button>;
        return <LMR className="px-2 py-2"
            left={<input className="mr-3"
                type="checkbox"
                ref={(input) => this.mapCheckBox(input, item)}
                onChange={() => this.updateChecked(item)} disabled={isDeleted} />}
            right={<>{button}</>}>
            {mid}
        </LMR>;
    }

    private CheckOutButton = observer(() => {
        let { checkOut, sum } = this.controller;
        let { count, amount } = sum;
        let check = "去结算";
        let content = amount > 0 ?
            <>{check} ({amount} 元)</> :
            <>{check}</>;
        return <button className="btn btn-success w-100" type="button" onClick={checkOut} disabled={amount <= 0}>
            {content}
        </button>;
    });

    private page = () => {
        let { cartData: cart } = this.controller;
        return <Page header="购物车" footer={<this.CheckOutButton />}>
            <div className="row">
                <div className="col-12">
                    <List items={cart} item={{ render: this.onCartItemRender }} />
                </div>
            </div>
        </Page>
    }
}