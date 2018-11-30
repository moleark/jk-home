import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CPerson } from './CPerson';
import { List } from 'tonva-react-form';
import { tv } from 'tonva-react-usql';

export class VAddressList extends VPage<CPerson> {

    async showEntry() {

        this.openPage(this.page);
    }

    private onAddressRender = (item: any) => {
        let { onAddressEdit, onAddressSelected } = this.controller;
        return <div className="row">
            <div className="col-10" onClick={() => onAddressSelected(item.address)}>
                {tv(item.address)}
            </div>
            <div className="col-2">
                <button type="button" className="btn btn-primary" onClick={() => onAddressEdit(item.address)}>edit</button>
            </div>
        </div>
    }


    private page = () => {

        let { person, addresses, onAddressEdit } = this.controller;
        return <Page footer={<button type="button" className="btn btn-primary w-100" onClick={() => onAddressEdit()} >添加新地址</button>}>
            <List items={addresses} item={{ render: this.onAddressRender }} none="你还没有设置收货地址，请添加新地址" />
        </Page>
    }
}