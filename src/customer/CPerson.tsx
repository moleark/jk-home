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
    userShippingContacts: any[] = [];
    userInvoiceContacts: any[] = [];

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUsqCustomer } = cApp;

        this.contactTuid = cUsqCustomer.tuid('contact');
    }

    async internalStart(contactType: ContactType) {
        this.contactType = contactType;
        if (contactType === ContactType.ShippingContact)
            this.userShippingContacts = await this.cApp.currentUser.getShippingContacts();
        else
            this.userInvoiceContacts = await this.cApp.currentUser.getInvoiceContacts();
        this.showVPage(VAddressList);
    }

    /**
     * 打开地址新建或编辑界面
     */
    onContactEdit = async (userContact?: any) => {

        let userContactData: any = {};
        if (userContact !== undefined) {
            userContactData.contact = await this.contactTuid.load(userContact.contact.id);
        }
        this.showVPage(VContact, userContactData);
    }

    saveContact = async (contact: any) => {

        if (this.contactType === ContactType.ShippingContact) {
            let contactWithId = await this.contactTuid.save(undefined, contact);
            await this.cApp.currentUser.addShippingContact(contactWithId.id);
            if (contact.id !== undefined) {
                this.cApp.currentUser.delShippingContact(contact.id);
            }
        }
        else{
            let contactWithId = await this.contactTuid.save(undefined, contact);
            await this.cApp.currentUser.addInvoiceContact(contactWithId.id);
            if (contact.id !== undefined) {
                this.cApp.currentUser.delInvoiceContact(contact.id);
            }
        }
        this.backPage();
        this.onContactSelected(contact);
    }

    onContactSelected = (contact: any) => {

        let { cOrder } = this.cApp;
        cOrder.setContact(contact, this.contactType);
        this.backPage();
    }
}