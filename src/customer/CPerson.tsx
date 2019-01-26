import * as React from 'react';
import { ControllerUsq, TuidMain, Map, CTuidEdit, CUsq, BoxId } from 'tonva-react-usql';
import { VAddressList } from './VAddressList';
import { CCartApp } from 'CCartApp';
import { VContact } from './VContact';
import { Controller } from 'tonva-tools';
import _ from 'lodash';
import { ContactType } from 'order/COrder';

export class CUser extends Controller {
    cApp: CCartApp;

    contactType: ContactType;
    private contactTuid: TuidMain;

    currentUser: any;
    customer: any;
    userContacts: any[] = [];
    userInvoiceContacts: any[] = [];

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUsqCustomer } = cApp;

        this.contactTuid = cUsqCustomer.tuid('contact');
    }

    async internalStart(contactType: ContactType) {
        this.contactType = contactType;
        this.userContacts = await this.cApp.currentUser.getContacts();
        this.showVPage(VAddressList);
    }

    /**
     * 打开地址新建或编辑界面
     */
    onContactEdit = async (userContact?: any) => {

        let userContactData: any = {};
        if (userContact !== undefined) {
            userContactData.contact = await this.contactTuid.load(userContact.contact.id);
            let userSetting: any = await this.cApp.currentUser.getSetting();
            if ((this.contactType === ContactType.ShippingContact
                && userSetting.shippingContact && userSetting.shippingContact.id === userContact.contact.id) ||
                (this.contactType === ContactType.InvoiceContact
                    && userSetting.invoiceContact && userSetting.invoiceContact.id === userContact.contact.id))
                userContactData.contact.isDefault = true;
        }
        this.showVPage(VContact, userContactData);
    }

    saveContact = async (contact: any) => {

        let contactWithId = await this.contactTuid.save(undefined, contact);
        await this.cApp.currentUser.addContact(contactWithId.id);
        if (contact.isDefault === true) {
            if (this.contactType === ContactType.ShippingContact)
                await this.cApp.currentUser.setDefaultShippingContact(contactWithId.id);
            else
                await this.cApp.currentUser.setDefaultInvoiceContact(contactWithId.id);
        }
        if (contact.id !== undefined) {
            this.cApp.currentUser.delContact(contact.id);
        }
        this.backPage();
        this.onContactSelected(contactWithId);
    }

    onContactSelected = (contact: any) => {

        let { cOrder } = this.cApp;
        cOrder.setContact(contact, this.contactType);
        this.backPage();
    }
}