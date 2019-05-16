import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { COrder } from './COrder';
import { List, EasyDate } from 'tonva-react-form';

export class VMyOrders extends VPage<COrder> {

    private myOrders: any[];
    private currentState: string;
    async open(param: any) {
        // this.myOrders = param;
        // this.myOrders.reverse();
        this.currentState = param;
        this.openPage(this.page);
    }

    private renderOrder = (order: any, index: number) => {
        let { openOrderDetail } = this.controller;
        let { id, no, date, discription, flow } = order;
        return <div className="m-3 justify-content-between" onClick={() => openOrderDetail(id)}>
            <div><span className="small text-muted">订单编号: </span><strong>{no}</strong></div>
            <div className="small text-muted"><EasyDate date={date} /></div>
        </div>;
    }

    private page = () => {

        let tabs = [{
            title: '待付款',
            content: () => {
                return <List items={this.myOrders} item={{ render: this.renderOrder }} />
            },
            isSelected: this.currentState === 'pendingpayment',
            load: async () => {
                this.currentState = 'pendingpayment';
                this.myOrders = await this.controller.getMyOrders(this.currentState);
            }
        }, {
            title: '所有订单',
            content: () => {
                return <List items={this.myOrders} item={{ render: this.renderOrder }} />
            },
            isSelected: this.currentState === 'all',
            load: async () => {
                this.currentState = 'all';
                this.myOrders = await this.controller.getMyOrders(this.currentState);
            }
        }];
        return <Page header="我的订单" tabs={tabs} />
    }
}