import * as React from 'react';
import { ControllerUsq, TuidMain, Map, CTuidEdit, CUsq } from 'tonva-react-usql';
import { VAddressList } from './VAddressList';
import { CCartApp, cCartApp } from 'home/CCartApp';
import { VContact } from './VContact';
import { Controller } from 'tonva-tools';

export class CUser extends Controller {

    private webUserId: number;
    private webUserCustomerMap: Map;
    private webUserConsigneeContactMap: Map;

    private customerTuid: TuidMain;
    private customerConsigneeContactMap: Map;

    customer: any;
    addresses: any[] = [];

    constructor(cApp: CCartApp, res: any) {
        super(res);

        let { cUsqWebUser, cUsqCustomer, cUsqOrder } = cCartApp;
        this.webUserCustomerMap = cUsqWebUser.map('webUserCustomer');
        this.webUserConsigneeContactMap = cUsqWebUser.map('webUserConsigneeContact');
        this.customerTuid = cUsqCustomer.tuid('customer');
        this.customerConsigneeContactMap = cUsqCustomer.map('customerConsigneeContact');
    }

    async internalStart(param: any) {

        let userMap: any = await this.webUserCustomerMap.obj({ webUser: this.user.id });
        if (userMap !== undefined) {
            this.addresses = await this.customerConsigneeContactMap.table({ customer: userMap.customer.id });
        } else {
            this.addresses = await this.webUserConsigneeContactMap.table({ webUser: this.webUserId });
        }
        this.showVPage(VAddressList);
    }

    onContactEdit = async (contact?: any) => {
        // let id = await this.cContactEdit.call(address && address.id);
        // await this.deliveryContactMap.add({ customer: this.customerId, arr1: [{ address: id }] });
        // let { cContact } = this.cApp;
        // cContact.start();
        let { cUsqCustomer } = cCartApp;
        // this.contactTuid = cUsqCustomer.tuid("contact")
        this.showVPage(VContact);
    }

    saveContact = async (contact: any) => {

        // await this.contactTuid.save(0, contact);
        // await this.deliveryContactMap.add({ customer: this.customer.id, contact: contact.id });
        // this.onContactSelected(contact);
        this.closePage(2);
    }

    onContactSelected = (contact: any) => {

        let { cOrder } = cCartApp;
        cOrder.setContact(contact);
        this.backPage();
    }
}