import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { COrder, ContactType } from './COrder';
import { List, LMR, FA } from 'tonva-react-form';
import { tv, BoxId } from 'tonva-react-uq';
import { observer } from 'mobx-react';
import { OrderItem } from './Order';

export class VCreateOrder extends VPage<COrder> {

    async open(param: any) {

        this.openPage(this.page);
    }

    private nullContact = () => {
        return <>请点击此处输入收货地址</>
    }

    private renderProduct = (product: any) => <strong>{product.description}</strong>
    private renderPack = (pack: any) => {
        return <>{(pack.radiox === 1 ? "" : pack.radiox + '*') + pack.radioy + pack.unit}</>
    }
    private renderOrderItem = (orderItem: OrderItem) => {
        let { product, packs } = orderItem;
        let left = <img src="favicon.ico" alt="structure image" />;
        let right = <div>
            {packs.map((v) => {
                let { pack, price, quantity } = v;
                return <div key={pack.id} className="d-flex">
                    <div className="w-6c text-right">{tv(pack)}</div>
                    <div className="w-6c text-right">{price}<small>元</small></div>
                    <div className="mx-2"><FA className="text-muted" name="times" /></div>
                    <div className="w-4c">{quantity}</div>
                </div>
            })}
        </div>;
        return <LMR left={left} right={right} className="px-3 py-2">
            <div className="px-3">
                <div>
                    {tv(product, this.renderProduct)}
                </div>
                <div className="row">
                    <div className="col-12">货期</div>
                </div>
            </div>
        </LMR>
    }

    private page = observer(() => {

        let { orderData, submitOrder, openContactList } = this.controller;
        let { orderItems, shippingContact, invoiceContact } = orderData;
        let footer = <button type="button"
            className="btn btn-danger w-100"
            onClick={submitOrder}>提交订单{orderData.amount}</button>;

        let chevronRight = <FA name="chevron-right" />
        return <Page header="订单预览" footer={footer}>
            <div className="row px-3 py-3 bg-white mb-1" onClick={() => openContactList(ContactType.ShippingContact)}>
                <div className="col-12 col-sm-2 text-muted">收货地址:</div>
                <div className="col-12 col-sm-10 pl-4 pl-sm-0 d-flex">
                    {tv(shippingContact, undefined, undefined, this.nullContact)}
                    {chevronRight}
                </div>
            </div>
            <div className="row px-3 py-3 bg-white mb-1" onClick={() => openContactList(ContactType.InvoiceContact)}>
                <div className="col-12 col-sm-2 text-muted">发票地址:</div>
                <div className="col-12 col-sm-10 pl-4 pl-sm-0 d-flex">
                    {tv(invoiceContact, undefined, undefined, this.nullContact)}
                    {chevronRight}
                </div>
            </div>
            <List items={orderItems} item={{ render: this.renderOrderItem }} />
        </Page>
    })
}
/*
            <LMR right={chevronRight} onClick={() => openContactList(ContactType.ShippingContact)} className="px-3 py-3">
                <div className="row">
                    <div className="col-12 col-sm-2">收货地址</div>
                    <div className="col-12 col-sm-10">{tv(shippingContact, undefined, undefined, this.nullContact)}</div>
                </div>
            </LMR>
            <LMR right={chevronRight} onClick={() => openContactList(ContactType.InvoiceContact)} className="px-3 py-3">
                <div className="row">
                    <div className="col-12 col-sm-2">发票地址</div>
                    <div className="col-12 col-sm-10">{tv(invoiceContact, undefined, undefined, this.nullContact)}</div>
                </div>
            </LMR>
*/