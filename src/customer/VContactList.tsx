import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CSelectContact } from './CSelectContact';
import { List, LMR, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';

export class VContactList extends VPage<CSelectContact> {

    async open() {

        this.openPage(this.page);
    }

    private onContactRender = (userContact: any) => {
        let { contact } = userContact;
        let { onEditContact: onContactEdit, onContactSelected } = this.controller;
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

        let { onNewContact, userContacts } = this.controller;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => onNewContact()} >添加新地址</button>;
        let contactList = <List items={userContacts} item={{ render: this.onContactRender }} none="无地址" />;
        return <Page footer={footer} header="管理地址">
            {contactList}
        </Page>
    }
}