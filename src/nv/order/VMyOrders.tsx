import * as React from 'react';
import { VPage, Page } from 'tonva';
import { COrder } from './COrder';
import { List, EasyDate } from 'tonva';
import { observable } from 'mobx';

export class VMyOrders extends VPage<COrder> {

    @observable private pendingOrders: any[];
    @observable private allOrders: any[];
    private currentState: string;
    async open(param: any) {
        this.currentState = param;
        this.openPage(this.page);
    }

    private renderOrder = (order: any, index: number) => {
        let { openOrderDetail } = this.controller;
        let { id, no, date, discription, flow } = order;
        return <div className="m-3 justify-content-between cursor-pointer" onClick={() => openOrderDetail(id)}>
            <div><span className="small text-muted">订单编号: </span><strong>{no}</strong></div>
            <div className="small text-muted"><EasyDate date={date} /></div>
        </div>;
    }

    private page = () => {

        let tabs = [{
            title: '待付款',
            content: () => {
                return <List items={this.pendingOrders} item={{ render: this.renderOrder }} none="无待付款订单" />
            },
            isSelected: this.currentState === 'pendingpayment',
            load: async () => {
                this.currentState = 'pendingpayment';
                this.pendingOrders = await this.controller.getMyOrders(this.currentState);
            }
        }, {
            title: '所有订单',
            content: () => {
                return <List items={this.allOrders} item={{ render: this.renderOrder }} none="你还没有订单" />
            },
            isSelected: this.currentState === 'all',
            load: async () => {
                this.currentState = 'all';
                this.allOrders = await this.controller.getMyOrders(this.currentState);
            }
        }];
        return <Page header="我的订单" tabs={tabs} tabPosition="top" />
    }
}