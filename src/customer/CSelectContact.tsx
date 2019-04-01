import * as React from 'react';
import _ from 'lodash';
import { TuidMain, BoxId } from 'tonva-react-uq';
import { VContactList } from './VContactList';
import { CCartApp } from 'CCartApp';
import { VContact } from './VContact';
import { Controller, Context } from 'tonva-tools';
import { CAddress } from './CAddress';

export abstract class CSelectContact extends Controller {
    protected cApp: CCartApp;
    private contactTuid: TuidMain;
    //private contactType: ContactType;

    //private currentUser: any;
    //private customer: any;
    //userInvoiceContacts: any[] = [];

    userContacts: any[] = [];

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUqCustomer } = cApp;

        this.contactTuid = cUqCustomer.tuid('contact');
    }

    async internalStart(/*contactType: ContactType*/) {
        //this.contactType = contactType;
        this.userContacts = await this.cApp.currentUser.getContacts();
        this.openVPage(VContactList);
        if (!this.userContacts || this.userContacts.length === 0) {
            this.onNewContact();
        }
    }

    protected abstract async getIsDefault(userSetting:any, userContactId:number):Promise<boolean>;

    /**
     * 打开地址新建或编辑界面
     */
    onNewContact = async () => {
        this.openVPage(VContact, {contact: undefined});
    }

    onEditContact = async (userContact: any) => {
        let userContactId = userContact.contact.id;
        let contact = await this.contactTuid.load(userContactId);
        let userSetting = await this.cApp.currentUser.getSetting();
        contact.isDefault = this.getIsDefault(userSetting, userContactId);
        /*
        contact.isDefault = 
            ((this.contactType === ContactType.ShippingContact
                && shippingContact && shippingContact.id === userContactId)
            ||
            (this.contactType === ContactType.InvoiceContact
                && invoiceContact && invoiceContact.id === userContactId));
        */
        let userContactData: any = {contact: contact};
        this.openVPage(VContact, userContactData);
    }

    delContact = async (contact: any) => {
        // 真正的调用数据库操作
        alert('真正调用数据库操作');
    }

    saveContact = async (contact: any) => {

        let contactWithId = await this.contactTuid.save(contact.id, contact);
        let { id: contactId } = contactWithId;

        /*
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
        */
        this.backPage();
        let contactBox = this.contactTuid.boxId(contactId);
        this.onContactSelected(contactBox);
    }

    onContactSelected = (contact: BoxId) => {

        //let { cOrder } = this.cApp;
        //cOrder.setContact(contact, this.contactType);
        this.backPage();
        this.returnCall(contact);
    }

    pickAddress = async (context: Context, name: string, value: number): Promise<number> => {
        let cAddress = new CAddress(this.cApp, undefined);
        return await cAddress.call<number>();
        //await caddress.start();
        //return await caddress.vCall(VAddress);
    }
}

export class CSelectShippingContact extends CSelectContact {
    protected async getIsDefault(userSetting:any, userContactId:number):Promise<boolean> {
        let {shippingContact} = userSetting;
        return shippingContact && shippingContact.id === userContactId;
    }
}

export class CSelectInvoiceContact extends CSelectContact {
    protected async getIsDefault(userSetting:any, userContactId:number):Promise<boolean> {
        let {invoiceContact} = userSetting;
        return invoiceContact && invoiceContact.id === userContactId;
    }
}
