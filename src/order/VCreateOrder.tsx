import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { COrder } from './COrder';
import { List } from 'tonva-react-form';
import { tv } from 'tonva-react-usql';
import { observer } from 'mobx-react';

export class VCreateOrder extends VPage<COrder> {

    async showEntry(param: any) {

        this.openPage(this.page);
    }

    private page = observer(() => {

        let { orderData, submitOrder, openAddressList } = this.controller;
        let { person, products, deliveryAddress } = orderData;
        return <Page>
            <div className="row" onClick={openAddressList}>
                <div className="col-12">
                    {tv(person)}
                    {tv(deliveryAddress)}
                </div>
            </div>
            <List items={products} item={{}} />
            <div className="row">
                <div className="col-12">
                    <button type="button" className="btn btn-danger" onClick={submitOrder}>提交订单</button>
                </div>
            </div>
        </Page>
    })
}