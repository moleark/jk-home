import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { COrder, ContactType } from './COrder';
import { List, LMR, FA } from 'tonva-react-form';
import { tv, BoxId } from 'tonva-react-uq';
import { observer } from 'mobx-react';
import { OrderItem } from './Order';
import { renderCartProduct } from 'cart/VCart';
import { observable } from 'mobx';

export class VCreateOrder extends VPage<COrder> {
    async open(param: any) {

        this.openPage(this.page);
    }

    private nullContact = () => {
        return <span className="text-primary">选择收货地址</span>;
    }

    private renderProduct = (product: any) => <strong>{product.description}</strong>

    private packsRow = (item: any) => {
        let { pack, quantity, price, currency, inventoryAllocation, futureDeliveryTimeDescription } = item;
        let deliveryTimeUI = <></>;
        if (inventoryAllocation && inventoryAllocation.length > 0) {
            deliveryTimeUI = <div className="text-success">国内现货</div>
        } else {
            deliveryTimeUI = <div>期货:{futureDeliveryTimeDescription}</div>
        }
        return <div className="px-2 py-2 border-top">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1"><b>{tv(pack)}</b></div>
                <div className="w-12c mr-4 text-right">
                    <span className="text-danger h5"><small>¥</small>{price * quantity}</span>
                    <small className="text-muted">(¥{price} × {quantity})</small>
                </div>
            </div>
            <div>{deliveryTimeUI}</div>
        </div>;
    }

    private renderOrderItem = (orderItem: OrderItem) => {
        let { product, packs } = orderItem;
        return <div className="px-3">
            <div className="row">
                <div className="col-lg-6 pb-3">{renderCartProduct(product, 0)}</div>
                <div className="col-lg-6">{
                    packs.map(p => {
                        return this.packsRow(p);
                    })
                }</div>
            </div>
        </div>;
    }

    private page = observer(() => {

        let { orderData, submitOrder, openContactList } = this.controller;
        // let { orderItems, shippingContact, invoiceContact } = orderData;
        let footer = <div>
            <div className="w-100">
                <div className="d-flex justify-content-left flex-grow-1">
                    <span className="text-danger" style={{ fontSize: '1.8rem' }}><small>¥</small>{orderData.amount}</span>
                </div>
                <button type="button"
                    className="btn btn-danger w-30"
                    onClick={submitOrder}>提交订单
                </button>
            </div>
        </div>;
        let chevronRight = <FA name="chevron-right" />

        let shippingAddressBlankTip = this.controller.shippingAddressIsBlank ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写收货地址</div>
            : null;
        let invoiceAddressBlankTip = this.controller.invoiceAddressIsBlank ? <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写发票地址</div> : null;
        let divInvoice: any = null;
        if (this.controller.useShippingAddress === false) {
            if (orderData.invoiceContact !== undefined) {
                divInvoice = <div className="col-12 col-sm-10 offset-sm-2 pl-4 pl-sm-0 d-flex">
                    {tv(orderData.invoiceContact, undefined, undefined, this.nullContact)}
                    <div className="">{chevronRight}</div>
                </div>
            } else {
                divInvoice = <div className="col-8 pl-4 pl-sm-0 offset-4 offset-sm-2">
                    <button className="btn btn-outline-primary" onClick={() => openContactList(ContactType.InvoiceContact)}>选择发票地址</button>
                    {invoiceAddressBlankTip}
                </div>
            }
        }

        let invoiceContactUI = <div className="row px-3 py-1 bg-white mb-1">
            <div className="col-4 col-sm-2 text-muted">发票地址:</div>
            <div className="col-8 col-sm-8 pl-4 pl-sm-0">
                <div>
                    <label>
                        <input type="checkbox"
                            defaultChecked={this.controller.useShippingAddress}
                            onChange={e => {
                                this.controller.useShippingAddress = e.currentTarget.checked;
                                orderData.invoiceContact = undefined;
                                this.controller.invoiceAddressIsBlank = false;
                            }} /> 同收货地址
                    </label>
                </div>
            </div>
            {divInvoice}
      </div>
        /*
        if (shippingContact.id !== invoiceContact.id) {
            invoiceContactUI = <div className="row px-3 py-3 bg-white mb-1" onClick={() => openContactList(ContactType.InvoiceContact)}>
                <div className="col-4 col-sm-2 text-muted">发票地址:</div>
                <div className="col-12 col-sm-10 pl-4 pl-sm-0 d-flex">
                    {tv(invoiceContact, undefined, undefined, this.nullContact)}
                    {chevronRight}
                </div>
            </div>
        }
        */
        return <Page header="订单预览" footer={footer}>
            <div className="row px-3 py-3 bg-white mb-1" onClick={() => openContactList(ContactType.ShippingContact)}>
                <div className="col-12 col-sm-2 text-muted">收货地址:</div>
                <div className="col-12 col-sm-10 pl-4 pt-2 pl-sm-0">
                    <LMR className="w-100 align-items-center" right={chevronRight}>{tv(orderData.shippingContact, undefined, undefined, this.nullContact)}</LMR>
                    {shippingAddressBlankTip}
                </div>
            </div>
            {invoiceContactUI}
            <List items={orderData.orderItems} item={{ render: this.renderOrderItem }} />
        </Page>
    })
}