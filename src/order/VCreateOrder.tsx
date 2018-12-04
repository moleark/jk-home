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

    private renderDeliveryContact = (deliveryContact: any) => {
        let deliveryContactRow = <div className="row">
            <div className="col-12">
                {deliveryContact.name}{deliveryContact.mobile}<br />
                {deliveryContact.address}
            </div>
        </div>
        return deliveryContactRow;
    }

    private nullContact = () => {
        return <>请点击输入地址</>
    }

    private page = observer(() => {

        let { orderData, submitOrder, openContactList } = this.controller;
        let { person, products: orderItems, deliveryContact } = orderData;
        let footer = <button type="button" className="btn btn-danger w-100" onClick={submitOrder}>提交订单</button>;

        let { cCart } = this.controller.cApp;
        let chevronRight = <FA name="chevron-right" />
        return <Page header="订单预览" footer={footer}>
            <LMR right={chevronRight} onClick={openContactList} className="px-2 py-2">
                {tv(deliveryContact, this.renderDeliveryContact, undefined, this.nullContact)}
            </LMR>
            {cCart.renderCartToBePurchased()}
        </Page>
    })
}