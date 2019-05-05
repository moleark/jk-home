import * as React from 'react';
import _ from 'lodash';
import { TuidMain, BoxId } from 'tonva-react-uq';
import { VContactList } from './VContactList';
import { CCartApp } from 'CCartApp';
import { VContact } from './VContact';
import { Controller, Context, nav } from 'tonva-tools';
import { CAddress } from './CAddress';

export abstract class CSelectContact extends Controller {
    protected cApp: CCartApp;
    private contactTuid: TuidMain;
    fromOrderCreation: boolean;

    userContacts: any[] = [];

    constructor(cApp: CCartApp, res: any, fromOrderCreation: boolean) {
        super(res);
        this.cApp = cApp;
        let { cUqCustomer } = cApp;

        this.contactTuid = cUqCustomer.tuid('contact');
        this.fromOrderCreation = fromOrderCreation;
    }

    async internalStart(/*contactType: ContactType*/) {
        //this.contactType = contactType;
        this.userContacts = await this.cApp.currentUser.getContacts();
        this.openVPage(VContactList);
        if (!this.userContacts || this.userContacts.length === 0) {
            this.onNewContact();
        }
    }

    protected abstract async getIsDefault(userSetting: any, userContactId: number): Promise<boolean>;

    /**
     * 打开地址新建界面
     */
    onNewContact = async () => {
        this.openVPage(VContact, { contact: undefined });
    }

    /**
     * 打开地址编辑界面
     */
    onEditContact = async (userContact: any) => {
        let userContactId = userContact.contact.id;
        let contact = await this.contactTuid.load(userContactId);
        let userSetting = await this.cApp.currentUser.getSetting();
        contact.isDefault = this.getIsDefault(userSetting, userContactId);
        let userContactData: any = { contact: contact };
        this.openVPage(VContact, userContactData);
    }

    delContact = async (contact: any) => {
        // 真正的调用数据库操作
        alert('真正调用数据库操作');
    }

    saveContact = async (contact: any) => {

        let newContact = await this.contactTuid.save(undefined, contact);
        let { id: newContactId } = newContact;

        let { currentUser } = this.cApp;
        await currentUser.addContact(newContactId);
        if (contact.isDefault === true) {
            await this.setDefaultContact(newContactId);
        }
        // contact.id !== undefined表示是修改了已有的contact(我们只能用“替换”表示“修改”，所以此时需要删除原contact)
        if (contact.id !== undefined) {
            await currentUser.delContact(contact.id);
        }
        this.backPage();
        if (this.fromOrderCreation) {
            let contactBox = this.contactTuid.boxId(newContactId);
            this.onContactSelected(contactBox);
        }
    }

    protected abstract async setDefaultContact(contactId: number);

    onContactSelected = (contact: BoxId) => {
        if (this.fromOrderCreation) {
            this.backPage();
            this.returnCall(contact);
        }
    }

    pickAddress = async (context: Context, name: string, value: number): Promise<number> => {
        let cAddress = new CAddress(this.cApp, undefined);
        return await cAddress.call<number>();
    }
}

export class CSelectShippingContact extends CSelectContact {
    protected async getIsDefault(userSetting: any, userContactId: number): Promise<boolean> {
        let { shippingContact } = userSetting;
        return shippingContact && shippingContact.id === userContactId;
    }

    protected async setDefaultContact(contactId: number) {
        let { currentUser } = this.cApp;
        await currentUser.setDefaultShippingContact(contactId);
    }
}

export class CSelectInvoiceContact extends CSelectContact {
    protected async getIsDefault(userSetting: any, userContactId: number): Promise<boolean> {
        let { invoiceContact } = userSetting;
        return invoiceContact && invoiceContact.id === userContactId;
    }

    protected async setDefaultContact(contactId: number) {
        let { currentUser } = this.cApp;
        await currentUser.setDefaultInvoiceContact(contactId);
    }
}
