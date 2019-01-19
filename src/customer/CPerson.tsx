import * as React from 'react';
import { ControllerUsq, TuidMain, Map, CTuidEdit, CUsq, BoxId } from 'tonva-react-usql';
import { VAddressList } from './VAddressList';
import { CCartApp } from 'CCartApp';
import { VContact } from './VContact';
import { Controller } from 'tonva-tools';
import _ from 'lodash';

export class CUser extends Controller {
    cApp: CCartApp;

    private contactTuid: TuidMain;

    currentUser: any;
    customer: any;
    userShippingContacts: any[] = [];

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUsqCustomer } = cApp;

        this.contactTuid = cUsqCustomer.tuid('contact');
    }

    async internalStart(param: any) {

        this.userShippingContacts = await this.cApp.currentUser.getShippingContacts();
        this.showVPage(VAddressList);
    }

    /**
     * 打开地址新建或边界界面
     */
    onContactEdit = async (userShippingContact?: any) => {

        let userContactData: any = {};
        if (userShippingContact !== undefined) {
            userContactData.shippingContact = await this.contactTuid.load(userShippingContact.contact.id);
        }
        this.showVPage(VContact, userContactData);
    }

    saveContact = async (contact: any) => {

        let contactWithId = await this.contactTuid.save(undefined, contact);
        await this.cApp.currentUser.addShippingContact(contactWithId.id);
        if (contact.id !== undefined) {
            this.cApp.currentUser.delShippingContact(contact.id);
        }
        this.backPage();
        this.onContactSelected(contact);
    }

    onContactSelected = (contact: any) => {

        let { cOrder } = this.cApp;
        cOrder.setContact(contact);
        this.backPage();
    }
}