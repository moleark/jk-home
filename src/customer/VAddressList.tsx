import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CUser } from './CPerson';
import { List } from 'tonva-react-form';
import { tv } from 'tonva-react-usql';

export class VAddressList extends VPage<CUser> {

    async showEntry() {

        this.openPage(this.page);
    }

    private onContactRender = (consigneeContact: any) => {
        let { onContactEdit, onContactSelected } = this.controller;
        return <div className="row">
            <div className="col-10" onClick={() => onContactSelected(consigneeContact)}>
                {tv(consigneeContact)}
            </div>
            <div className="col-2">
                <button type="button" className="btn btn-primary" onClick={() => onContactEdit(consigneeContact)}>edit</button>
            </div>
        </div>
    }


    private page = () => {

        let { currentUser, onContactEdit } = this.controller;
        let { consigneeContacts } = currentUser;
        return <Page footer={<button type="button" className="btn btn-primary w-100" onClick={() => onContactEdit()} >添加新地址</button>}>
            <List items={consigneeContacts} item={{ render: this.onContactRender }} none="你还没有设置收货地址，请添加新地址" />
        </Page>
    }
}