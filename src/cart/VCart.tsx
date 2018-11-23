import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CCart } from './CCart';
import { List, LMR, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-usql';
import { observer } from 'mobx-react';

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

    private onCartItemRender = (item: any) => {
        let { product, pack, isDeleted } = item;
        let prod = <>{tv(product)}{tv(pack)}</>;
        let input = <input className="text-center" ref={(input) => this.mapInputRef(input, item)} type="number" onChange={() => this.updateQuantity(item)} disabled={isDeleted} />;
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
        return <LMR className="px-3 py-2"
            left={<input className="mr-3" type="checkbox" ref={(input) => this.mapCheckBox(input, item)} onChange={() => this.updateChecked(item)} disabled={isDeleted} />}
            right={<>{input} {button}</>}>
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
        return <button className="w-25 btn btn-success m-3" type="button" onClick={checkOut} disabled={amount <= 0}>
            {content}
        </button>;
    });

    private page = () => {
        let { cartData: cart } = this.controller;
        return <Page header="购物车">
            <div className="row">
                <div className="col-12">
                    <List items={cart} item={{ render: this.onCartItemRender }} />
                </div>
                <div className="col-12 text-center">
                    <this.CheckOutButton />
                </div>
            </div>
        </Page>
    }
}