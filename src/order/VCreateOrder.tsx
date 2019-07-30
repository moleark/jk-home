import * as React from 'react';
import { VPage, Page } from 'tonva';
import { COrder } from './COrder';
import { List, LMR, FA } from 'tonva';
import { tv, BoxId } from 'tonva';
import { observer } from 'mobx-react';
import { OrderItem } from './Order';
import { renderCartProduct } from 'cart/VCart';
import { observable } from 'mobx';
import { CartPackRow } from 'cart/Cart';

const blankTime = 2000;

export class VCreateOrder extends VPage<COrder> {
    @observable private useShippingAddress: boolean = true;
    @observable private shippingAddressIsBlank: boolean = false;
    @observable private invoiceAddressIsBlank: boolean = false;
    @observable private invoiceIsBlank: boolean = false;

    async open(param: any) {
        this.openPage(this.page);
    }

    private nullContact = () => {
        return <span className="text-primary">选择收货地址</span>;
    }

    //private renderProduct = (product: any) => <strong>{product.description}</strong>

    private packsRow = (item: CartPackRow, index: number) => {
        let { pack, quantity, price, currency, inventoryAllocation, futureDeliveryTimeDescription } = item;

        let deliveryTimeUI;
        if (inventoryAllocation && inventoryAllocation.length > 0) {
            deliveryTimeUI = inventoryAllocation.map((v, index) => {
                let { warehouse, quantity, deliveryTimeDescription } = v;
                return <div key={index} className="text-success">
                    {tv(warehouse, (values: any) => <>{values.name}</>)}: {quantity}
                    {deliveryTimeDescription}
                </div>
            });
        } else {
            deliveryTimeUI = <div>{futureDeliveryTimeDescription && '期货: ' + futureDeliveryTimeDescription}</div>;
        }

        return <div key={index} className="px-2 py-2 border-top">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1"><b>{tv(pack)}</b></div>
                <div className="w-12c mr-4 text-right">
                    <span className="text-danger h5"><small>¥</small>{parseFloat((price * quantity).toFixed(2))}</span>
                    <small className="text-muted">(¥{parseFloat(price.toFixed(2))} × {quantity})</small>
                </div>
            </div>
            <div>{deliveryTimeUI}</div>
        </div>;
    }

    private renderOrderItem = (orderItem: OrderItem) => {
        let { product, packs } = orderItem;
        return <div>
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
        // 必填项验证
        let { shippingContact, invoiceContact, invoiceType, invoiceInfo } = orderData;
        if (!shippingContact) {
            this.shippingAddressIsBlank = true;
            setTimeout(() => this.shippingAddressIsBlank = false, blankTime);
            return;
        }
        if (!invoiceContact) {
            if (this.useShippingAddress) {
                orderData.invoiceContact = shippingContact; //contactBox;
                this.invoiceAddressIsBlank = false;
            } else {
                this.invoiceAddressIsBlank = true;
                setTimeout(() => this.invoiceAddressIsBlank = false, blankTime);
                return;
            }
        }
        if (!invoiceType || !invoiceInfo) {
            this.invoiceIsBlank = true;
            setTimeout(() => this.invoiceIsBlank = false, blankTime);
            return;
        }

        this.controller.submitOrder();
    }

    private page = observer(() => {

        let { orderData, onSelectShippingContact, onSelectInvoiceContact, openMeInfo, currentUser, onInvoiceInfoEdit, onCouponEdit } = this.controller;
        let fillMeInfo = <div onClick={openMeInfo} className="alert alert-warning text-primary py-1" role="alert">
            点击完善您的个人信息
        </div>
        if (currentUser.allowOrdering)
            fillMeInfo = null;
        let footer = <div className="d-block">
            {fillMeInfo}
            <div className="w-100 px-3">
                <div className="d-flex justify-content-left flex-grow-1">
                    <span className="text-danger" style={{ fontSize: '1.8rem' }}><small>¥</small>{orderData.amount}</span>
                </div>
                <button type="button"
                    className="btn btn-danger w-30"
                    onClick={this.onSubmit} disabled={!currentUser.allowOrdering}>提交订单
                </button>
            </div>
        </div>;
        let chevronRight = <FA name="chevron-right" className="cursor-pointer" />

        let shippingAddressBlankTip = this.shippingAddressIsBlank ?
            <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写收货地址</div>
            : null;
        let invoiceAddressBlankTip = this.invoiceAddressIsBlank ? <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写发票地址</div> : null;
        let divInvoiceContact: any = null;
        if (this.useShippingAddress === false) {
            if (orderData.invoiceContact !== undefined) {
                divInvoiceContact = <div className="col-12 col-sm-10 offset-sm-2 d-flex">
                    {tv(orderData.invoiceContact, undefined, undefined, this.nullContact)}
                    <div>{chevronRight}</div>
                </div>
            } else {
                divInvoiceContact = <div className="col-8 offset-4 offset-sm-2">
                    <button className="btn btn-outline-primary"
                        onClick={onSelectInvoiceContact}>选择发票地址</button>
                    {invoiceAddressBlankTip}
                </div>
            }
        }

        let invoiceContactUI = <div className="row py-3 bg-white mb-1">
            <div className="col-4 col-sm-2 pb-2 text-muted">发票地址:</div>
            <div className="col-8 col-sm-10">
                <div>
                    <label className="cursor-pointer">
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
            {divInvoiceContact}
        </div>

        let invoiceBlankTip = this.invoiceIsBlank ? <div className="text-danger small my-2"><FA name="exclamation-circle" /> 必须填写发票信息</div> : null;
        let invoiceInfoUI = <div className="row py-3 bg-white mb-1" onClick={onInvoiceInfoEdit}>
            <div className="col-4 col-sm-2 pb-2 text-muted">发票信息:</div>
            <div className="col-8 col-sm-10">
                <LMR className="w-100 align-items-center" right={chevronRight}>
                    {tv(orderData.invoiceType, (v) => <>{v.description}</>, undefined, () => <span className="text-primary">填写发票信息</span>)}
                    {tv(orderData.invoiceInfo, (v) => <> -- {v.title}</>, undefined, () => <></>)}
                    {invoiceBlankTip}
                </LMR>
            </div>
        </div>

        let freightFeeUI = <></>;
        let freightFeeRemittedUI = <></>;
        if (orderData.freightFee) {
            freightFeeUI = <>
                <div className="col-4 col-sm-2 pb-2 text-muted">运费:</div>
                <div className="col-8 col-sm-10 text-right text-danger"><small>¥</small>{orderData.freightFee}</div>
            </>
            if (orderData.freightFeeRemitted) {
                freightFeeRemittedUI = <>
                    <div className="col-4 col-sm-2 pb-2 text-muted">运费减免:</div>
                    <div className="col-8 col-sm-10 text-right text-danger"><small>¥</small>{orderData.freightFeeRemitted}</div>
                </>
            }
        }

        let couponUI = <></>;
        if (1 === 1) {
            couponUI = <div className="row py-3 bg-white mb-1" onClick={onCouponEdit}>
                <div className="col-4 col-sm-2 pb-2 text-muted">优惠码:</div>
                <div className="col-8 col-sm-10">
                    <LMR className="w-100 align-items-center" right={chevronRight}>
                        {tv(orderData.coupon, (v) => {
                            let offsetUI, remittedUI;
                            if (orderData.couponOffsetAmount) {
                                offsetUI = <LMR right={<>{orderData.couponOffsetAmount}</>}>
                                    <div>优惠码折扣:</div>
                                </LMR>
                            }
                            if (orderData.couponRemitted) {
                                remittedUI = <LMR right={<>{orderData.couponRemitted}</>}>
                                    <div>优惠码减免:</div>
                                </LMR>
                            }
                            return <div>
                                <div>{v.code}</div>
                                {offsetUI}
                                {remittedUI}
                            </div>
                        }, undefined, () => <span className="text-primary">填写优惠码</span>)}
                    </LMR>
                </div>
            </div>
        }

        return <Page header="订单预览" footer={footer}>
            <div className="px-2">
                <div className="row py-3 bg-white mb-1" onClick={onSelectShippingContact}>
                    <div className="col-4 col-sm-2 pb-2 text-muted">收货地址:</div>
                    <div className="col-8 col-sm-10">
                        <LMR className="w-100 align-items-center" right={chevronRight}>{tv(orderData.shippingContact, undefined, undefined, this.nullContact)}</LMR>
                        {shippingAddressBlankTip}
                    </div>
                </div>
                {invoiceContactUI}
                {invoiceInfoUI}
            </div>
            <List items={orderData.orderItems} item={{ render: this.renderOrderItem, key: this.orderItemKey as any }} />
            <div className="px-2">
                <div className="row py-3 pr-3 bg-white my-1">
                    <div className="col-4 col-sm-2 pb-2 text-muted">商品总额:</div>
                    <div className="col-8 col-sm-10 text-right"><small>¥</small>{orderData.productAmount}</div>
                    {freightFeeUI}
                    {freightFeeRemittedUI}
                </div >
                {couponUI}
            </div>
        </Page >
    })
}