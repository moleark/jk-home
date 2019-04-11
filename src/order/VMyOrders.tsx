import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { COrder } from './COrder';
import { List } from 'tonva-react-form';

export class VMyOrders extends VPage<COrder> {

    private myOrders: any;
    async open(param: any) {
        this.myOrders = param;
        this.openPage(this.page);
    }

    private renderOrder = (order: any, index: number) => {
        let { openOrderDetail } = this.controller;
        let { id, no, date, discription, flow } = order;
        return <div className="m-3 justify-content-between" onClick={() => openOrderDetail(id)}>
            <div><strong>{discription}</strong></div>
            <div>{new Date(date).toLocaleString()}</div>
        </div>;
    }

    private page = () => {

        return <Page header="我的订单">
            <List items={this.myOrders} item={{ render: this.renderOrder }} />
        </Page>
    }
}