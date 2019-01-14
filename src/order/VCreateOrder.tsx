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

    private RenderDeliveryContact = (consigneeContact: any) => {
        let deliveryContactRow = <div className="row">
            <div className="col-12">
                {consigneeContact.name}{consigneeContact.mobile}<br />
                {consigneeContact.address}
            </div>
        </div>
        return deliveryContactRow;
    }

    private nullContact = () => {
        return <>请点击输入地址</>
    }

    private renderProduct = (product: any) => <strong>{product.description}</strong>
    private renderPack = (pack: any) => <>{pack.name}</>
    private renderItem = (item: any) => {
        return <div className="row">
            <div className="col-3">
                <img src="favicon.ico" alt={item.product.obj.description} />
            </div>
            <div className="col-9">
                <div className="row">
                    <div className="col-12">
                        {tv(item.product, this.renderProduct)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">{item.pack.obj.name}</div>
                    <div className="col-3"><strong className="text-danger">{item.price}</strong></div>
                    <div className="col-6 text-right">
                        数量: <span className="px-4 bg-light">{item.quantity}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">货期</div>
                </div>
            </div>
        </div>
    }
    private renderOrderItem = (orderItem: any) => {
        return <>
            {tv(orderItem, this.renderItem)}<br />
        </>
    }

    private page = observer(() => {

        let { orderData, submitOrder, openContactList } = this.controller;
        let { orderItems, deliveryContact } = orderData;
        let footer = <button type="button" className="btn btn-danger w-100" onClick={submitOrder}>提交订单{orderData.amount}</button>;

        let chevronRight = <FA name="chevron-right" />
        return <Page header="订单预览" footer={footer}>
            <LMR right={chevronRight} onClick={openContactList} className="px-2 py-2">
                <div className="row">
                    <div className="col-4">{deliveryContact.name}</div>
                    <div className="col-8">{deliveryContact.mobile}</div>
                    <div className="col-12">{deliveryContact.addressString}</div>
                </div>
            </LMR>
            <List items={orderItems} item={{ render: this.renderOrderItem, className: "px-2" }} />
        </Page>
    })
}