import * as React from 'react';
import { TuidMain, BoxId } from 'tonva-react-uq';
import { VContactList } from './VContactList';
import { CCartApp } from 'CCartApp';
import { VContact } from './VContact';
import { Controller, Context } from 'tonva-tools';
import _ from 'lodash';
import { ContactType } from 'order/COrder';
import { VAddress } from './VAddress';
import { CAddress } from './CAddress';

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
        let { cUqCustomer } = cApp;

        this.contactTuid = cUqCustomer.tuid('contact');
    }

    async internalStart(contactType: ContactType) {
        this.contactType = contactType;
        this.userContacts = await this.cApp.currentUser.getContacts();
        this.openVPage(VContactList);
        if (!this.userContacts || this.userContacts.length === 0) {
            this.onContactEdit();
        }
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
        this.openVPage(VContact, userContactData);
    }

    saveContact = async (contact: any) => {

        let contactWithId = await this.contactTuid.save(undefined, contact);
        let { id: contactId } = contactWithId;

        let { currentUser } = this.cApp;
        await currentUser.addContact(contactId);
        if (contact.isDefault === true) {
            if (this.contactType === ContactType.ShippingContact)
                await currentUser.setDefaultShippingContact(contactId);
            else
                await currentUser.setDefaultInvoiceContact(contactId);
        }
        if (contact.id !== undefined) {
            currentUser.delContact(contact.id);
        }
        this.backPage();
        let contactBox = this.contactTuid.boxId(contactId);
        this.onContactSelected(contactBox);
    }

    onContactSelected = (contact: BoxId) => {

        let { cOrder } = this.cApp;
        cOrder.setContact(contact, this.contactType);
        this.backPage();
    }

    pickAddress = async (context: Context, name: string, value: number): Promise<number> => {
        let caddress = new CAddress(this.cApp, undefined);
        await caddress.start();
        return await caddress.vCall(VAddress);
    }
}