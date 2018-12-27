import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CPerson } from './CPerson';
import { List } from 'tonva-react-form';
import { tv } from 'tonva-react-usql';

export class VAddressList extends VPage<CPerson> {

    async showEntry() {

        this.openPage(this.page);
    }

    private onContactRender = (contactWapper: any) => {
        let { onContactEdit, onContactSelected } = this.controller;
        return <div className="row">
            <div className="col-10" onClick={() => onContactSelected(contactWapper.address)}>
                {tv(contactWapper.address)}
            </div>
            <div className="col-2">
                <button type="button" className="btn btn-primary" onClick={() => onContactEdit(contactWapper.address)}>edit</button>
            </div>
        </div>
    }


    private page = () => {

        let { customer, addresses, onContactEdit } = this.controller;
        return <Page footer={<button type="button" className="btn btn-primary w-100" onClick={() => onContactEdit()} >添加新地址</button>}>
            <List items={addresses} item={{ render: this.onContactRender }} none="你还没有设置收货地址，请添加新地址" />
        </Page>
    }
}