import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { COrder } from './COrder';
import { tv } from 'tonva-react-uq';
import { List, LMR } from 'tonva-react-form';
import { groupByProduct, orderItemGroupByProduct } from 'tools/groupByProduct';
import { renderCartProduct } from 'cart/VCart';

export class VOrderDetail extends VPage<COrder> {

    async open(order: any) {

        this.openPage(this.page, order);
    }


    private packsRow = (item: any, index: number) => {
        let { pack, quantity, price, currency } = item;

        return <div key={index} className="px-2 py-2 border-top">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1"><b>{tv(pack)}</b></div>
                <div className="w-12c mr-4 text-right">
                    <span className="text-danger h5"><small>¥</small>{price * quantity}</span>
                    <small className="text-muted">(¥{price} × {quantity})</small>
                </div>
            </div>
        </div>;
    }

    private renderOrderItem = (orderItem: any) => {
        let { product, packs } = orderItem;
        return <div>
            <div className="row">
                <div className="col-lg-6 pb-3">{tv(product)}</div>
                <div className="col-lg-6">{
                    packs.map((p, index) => {
                        return this.packsRow(p, index);
                    })
                }</div>
            </div>
        </div>;
    }

    private page = (order: any) => {

        let { brief, data } = order;
        let { id, no, state, description, date } = brief;
        let { orderItems, currency, shippingContact, invoiceContact, invoiceType, invoiceInfo, amount, webUser } = data;
        let orderItemsGrouped = orderItemGroupByProduct(orderItems);
        let header = <>订单详情: {no}</>
        return <Page header={header}>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3">订单状态:</div>
                <div className="col-9">{tv(state)}</div>
            </div>
            <List items={orderItemsGrouped} item={{ render: this.renderOrderItem }} />
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3">收货地址:</div>
                <div className="col-9">{tv(shippingContact)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3">发票地址:</div>
                <div className="col-9">{tv(invoiceContact)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3">发票信息:</div>
                <div className="col-9">{tv(invoiceInfo)}</div>
            </div>
            <div className="bg-white p-3 my-1 text-right">
                <span className="text-danger font-weight-bold">总金额: {amount}{tv(currency)}</span>
            </div>
        </Page>
    }
}