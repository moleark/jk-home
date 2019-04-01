import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { COrder } from './COrder';
import { List, LMR, FA } from 'tonva-react-form';
import { tv, BoxId } from 'tonva-react-uq';
import { observer } from 'mobx-react';
import { OrderItem } from './Order';
import { renderCartProduct } from 'cart/VCart';
import { observable } from 'mobx';

const blankTime = 2000;

export class VCreateOrder extends VPage<COrder> {
    @observable private useShippingAddress: boolean = true;
    @observable private shippingAddressIsBlank: boolean = false;
    @observable private invoiceAddressIsBlank: boolean = false;

    async open(param: any) {
        this.openPage(this.page);
    }

    private nullContact = () => {
        return <span className="text-primary">选择收货地址</span>;
    }

    //private renderProduct = (product: any) => <strong>{product.description}</strong>

    private packsRow = (item: any, index:number) => {
        let { pack, quantity, price, currency, inventoryAllocation, futureDeliveryTimeDescription } = item;
        let deliveryTimeUI = inventoryAllocation && inventoryAllocation.length > 0 ?
            <div className="text-success">国内现货</div>
            : <div>期货:{futureDeliveryTimeDescription}</div>;

        return <div key={index} className="px-2 py-2 border-top">
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
                    packs.map((p, index) => {
                        return this.packsRow(p, index);
                    })
                }</div>
            </div>
        </div>;
    }

    private orderItemKey = (orderItem: OrderItem) => {
        return orderItem.product.id;
    }

    private onSubmit = async () => {
        let { orderData } = this.controller;
        let { shippingContact, invoiceContact } = orderData;
        if (!shippingContact) {
            this.shippingAddressIsBlank = true;
            setTimeout(() => this.shippingAddressIsBlank = false, blankTime);
            return;
        }
        if (!invoiceContact) {
            if (this.useShippingAddress) {
                //this.setContact(shippingContact, ContactType.InvoiceContact);
                orderData.invoiceContact = shippingContact; //contactBox;
                this.invoiceAddressIsBlank = false;
            } else {
                this.invoiceAddressIsBlank = true;
                setTimeout(() => this.invoiceAddressIsBlank = false, blankTime);
                return;
            }
        }

        this.controller.submitOrder();
    }

    private page = observer(() => {

        let { orderData, onSelectShippingContact, onSelectInvoiceContact } = this.controller;
        // let { orderItems, shippingContact, invoiceContact } = orderData;
        let footer = <div>
            <div className="w-100 px-3">
                <div className="d-flex justify-content-left flex-grow-1">
                    <span className="text-danger" style={{ fontSize: '1.8rem' }}><small>¥</small>{orderData.amount}</span>
                </div>
                <button type="button"
                    className="btn btn-danger w-30"
                    onClick={this.onSubmit}>提交订单
                </button>
            </div>
        </div>;
        let chevronRight = <FA name="chevron-right" />

        let shippingAddressBlankTip = this.shippingAddressIsBlank ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写收货地址</div>
            : null;
        let invoiceAddressBlankTip = this.invoiceAddressIsBlank ? <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写发票地址</div> : null;
        let divInvoice: any = null;
        if (this.useShippingAddress === false) {
            if (orderData.invoiceContact !== undefined) {
                divInvoice = <div className="col-12 col-sm-10 offset-sm-2 pl-4 pl-sm-0 d-flex">
                    {tv(orderData.invoiceContact, undefined, undefined, this.nullContact)}
                    <div className="">{chevronRight}</div>
                </div>
            } else {
                divInvoice = <div className="col-8 pl-4 pl-sm-0 offset-4 offset-sm-2">
                    <button className="btn btn-outline-primary" 
                        onClick={onSelectInvoiceContact}>选择发票地址</button>
                    {invoiceAddressBlankTip}
                </div>
            }
        }

        let invoiceContactUI = <div className="row px-3 py-1 bg-white mb-1">
            <div className="col-4 col-sm-2 pb-2 text-muted">发票地址:</div>
            <div className="col-8 col-sm-8 pl-4 pl-sm-0">
                <div>
                    <label>
                        <input type="checkbox"
                            defaultChecked={this.useShippingAddress}
                            onChange={e => {
                                this.useShippingAddress = e.currentTarget.checked;
                                orderData.invoiceContact = undefined;
                                this.invoiceAddressIsBlank = false;
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
            <div className="row px-3 py-3 bg-white mb-1" 
                onClick={onSelectShippingContact}>
                <div className="col-12 col-sm-2 pb-2 text-muted">收货地址:</div>
                <div className="col-12 col-sm-10 pl-4 pl-sm-0">
                    <LMR className="w-100 align-items-center" right={chevronRight}>{tv(orderData.shippingContact, undefined, undefined, this.nullContact)}</LMR>
                    {shippingAddressBlankTip}
                </div>
            </div>
            {invoiceContactUI}
            <List items={orderData.orderItems} item={{ render: this.renderOrderItem, key: this.orderItemKey }} />
        </Page>
    })
}