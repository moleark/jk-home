import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { COrder } from './COrder';
import { tv } from 'tonva-react-uq';
import { List, LMR } from 'tonva-react-form';

export class VOrderDetail extends VPage<COrder> {

    async open(order: any) {

        this.openPage(this.page, order);
    }

    private renderOrderItem(orderItem: any) {
        let { product, pack, quantity, price, sumAmount } = orderItem;
        return <div className="px-3 my-1">
            {tv(product)}
        </div>
    }

    private page = (order: any) => {

        let { brief, data } = order;
        let { id, no, state, description, date } = brief;
        let { orderItems, currency, shippingContact, invoiceContact, amount, webUser } = data;
        return <Page header="订单详情">
            <div className="bg-white p-3 my-1">
                订单编号: {no}
            </div>
            <List items={orderItems} item={{ render: this.renderOrderItem }} />
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3">收货地址:</div>
                <div className="col-9">{tv(shippingContact)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3">发票地址:</div>
                <div className="col-9">{tv(invoiceContact)}</div>
            </div>
            <div className="bg-white p-3 my-1 text-right">
                <span className="text-danger font-weight-bold">总金额: {amount}{tv(currency)}</span>
            </div>
        </Page>
    }
}