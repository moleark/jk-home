import * as React from 'react';
import { ControllerUsq, TuidMain, Map, CTuidEdit, CUsq } from 'tonva-react-usql';
import { VAddressList } from './VAddressList';
import { CCartApp, cCartApp } from 'home/CCartApp';
import { VContact } from './VContact';
import { Controller } from 'tonva-tools';
import _ from 'lodash';

export class CUser extends Controller {

    private webUserCustomerMap: Map;
    private webUserConsigneeContactMap: Map;

    private customerTuid: TuidMain;
    private customerConsigneeContactMap: Map;

    private contactTuid: TuidMain;

    currentUser: any;
    customer: any;
    consigneeContacts: any[] = [];

    constructor(cApp: CCartApp, res: any) {
        super(res);

        let { cUsqWebUser, cUsqCustomer, cUsqOrder } = cCartApp;
        this.webUserCustomerMap = cUsqWebUser.map('webUserCustomer');
        this.webUserConsigneeContactMap = cUsqWebUser.map('webUserConsigneeContact');

        this.customerTuid = cUsqCustomer.tuid('customer');
        this.customerConsigneeContactMap = cUsqCustomer.map('customerConsigneeContact');

        this.contactTuid = cUsqCustomer.tuid('contact');
    }

    async internalStart(param: any) {

        this.currentUser = this.user;
        this.currentUser.consigneeContacts = [];

        let consigneeContacts;
        let userMap: any = await this.webUserCustomerMap.obj({ webUser: this.user.id });
        if (userMap !== undefined) {
            consigneeContacts = await this.customerConsigneeContactMap.table({ customer: userMap.customer.id });
        } else {
            consigneeContacts = await this.webUserConsigneeContactMap.table({ webUser: this.user.id });
        }
        if (consigneeContacts && consigneeContacts.length > 0) {
            consigneeContacts.forEach(element => {
                this.currentUser.consigneeContacts.push(element.contact.obj);
            });
        }
        this.showVPage(VAddressList);
    }

    /**
     * 打开地址新建或边界界面
     */
    onContactEdit = async (contact?: any) => {
        // let id = await this.cContactEdit.call(address && address.id);
        // await this.deliveryContactMap.add({ customer: this.customerId, arr1: [{ address: id }] });
        // let { cContact } = this.cApp;
        // cContact.start();
        // this.contactTuid = cUsqCustomer.tuid("contact")
        this.showVPage(VContact);
    }

    saveContact = async (contact: any) => {

        let contactWithId = await this.contactTuid.save(0, _.pick(contact, ['name', 'organizationName', 'mobile', 'telephone', 'email', 'addressString']));
        await this.webUserConsigneeContactMap.add({ webUser: this.user.id, contact: contactWithId.id });
        this.onContactSelected(contact);
    }

    onContactSelected = (contact: any) => {

        let { cOrder } = cCartApp;
        cOrder.setContact(contact);
        this.backPage();
    }
}