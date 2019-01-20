import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { COrder } from './COrder';
import { List, LMR, FA } from 'tonva-react-form';
import { tv, BoxId } from 'tonva-react-usql';
import { observer } from 'mobx-react';

export class VCreateOrder extends VPage<COrder> {

    async showEntry(param: any) {

        this.openPage(this.page);
    }

    private nullContact = () => {
        return <>请点击输入地址</>
    }

    private renderProduct = (product: any) => <strong>{product.description}</strong>
    private renderPack = (pack: any) => {
        return <>{(pack.radiox === 1 ? "" : pack.radiox + '*') + pack.radioy + pack.unit}</>
    }
    private renderItem = (orderItem: any) => {
        let { product, pack, price, quantity } = orderItem;
        let left = <img src="favicon.ico" alt="structure image" />;
        let right = <div className="w-6c text-right">
            <span className="text-primary">{quantity}</span>
        </div>;
        return <LMR left={left} right={right} className="px-3 py-2">
            <div className="px-3">
                <div>
                    {tv(product, this.renderProduct)}
                </div>
                <div className="row">
                    <div className="col-3">{tv(pack, this.renderPack)}</div>
                    <div className="col-3"><strong className="text-danger">{price}</strong></div>
                </div>
                <div className="row">
                    <div className="col-12">货期</div>
                </div>
            </div>
        </LMR>
    }

    private renderOrderItem = (orderItem: any) => {
        return <>
            {tv(orderItem, this.renderItem)}<br />
        </>
    }

    private page = observer(() => {

        let { orderData, submitOrder, openContactList } = this.controller;
        let { orderItems, shippingContact } = orderData;
        let footer = <button type="button" className="btn btn-danger w-100" onClick={submitOrder}>提交订单{orderData.amount}</button>;

        let chevronRight = <FA name="chevron-right" />
        return <Page header="订单预览" footer={footer}>
            <LMR right={chevronRight} onClick={openContactList} className="px-3 py-3">
                {tv(shippingContact, undefined, undefined, this.nullContact)}
            </LMR>
            <List items={orderItems} item={{ render: this.renderOrderItem }} />
        </Page>
    })
}