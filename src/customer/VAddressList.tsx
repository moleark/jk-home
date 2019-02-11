import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CUser } from './CPerson';
import { List, LMR, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { ContactType } from 'order/COrder';

export class VAddressList extends VPage<CUser> {

    async showEntry() {

        this.openPage(this.page);
    }

    private onContactRender = (userContact: any) => {
        let { contact } = userContact;
        let { onContactEdit, onContactSelected } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info" onClick={() => onContactEdit(userContact)}>
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2">
            <div onClick={() => onContactSelected(contact)}>
                {tv(contact)}
            </div>
        </LMR>
    }


    private page = () => {

        let { contactType, onContactEdit, userContacts } = this.controller;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => onContactEdit()} >添加新地址</button>;
        let contactList = <List items={userContacts} item={{ render: this.onContactRender }} none="你还没有设置收货地址，请添加新地址" />;
        if (contactType === ContactType.InvoiceContact)
            contactList = <List items={userContacts} item={{ render: this.onContactRender }} none="你还没有设置发票地址，请添加新地址" />
        return <Page footer={footer} header="管理地址">
            {contactList}
        </Page>
    }
}