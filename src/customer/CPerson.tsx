import * as React from 'react';
import { ControllerUsq, TuidMain, Map, CTuidEdit, CUsq } from 'tonva-react-usql';
import { VAddressList } from './VAddressList';
import { CCartApp } from 'home/CCartApp';
import { VContact } from './VContact';
import { Controller } from 'tonva-tools';

export class CUser extends Controller {

    private cApp: CCartApp;

    private customerId: number;
    private cContactEdit: CTuidEdit;
    private customerTuid: TuidMain;
    private contactTuid: TuidMain;
    private deliveryContactMap: Map;

    customer: any;
    addresses: any[] = [];

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUsqCustomer } = this.cApp;
        this.customerTuid = cUsqCustomer.tuid('customer');
        // this.contactTuid = cUsqCustomer.tuid('contact');
        this.deliveryContactMap = cUsqCustomer.map('customerConsigneeContact');
        // this.cContactEdit = cUsqCustomer.cTuidEdit(this.contactTuid);
    }

    async internalStart(param: any) {

        param = 1;
        this.customerId = param;

        this.customer = await this.customerTuid.load(this.customerId);
        this.addresses = await this.deliveryContactMap.table({ customer: this.customerId });
        this.showVPage(VAddressList);
    }

    onContactEdit = async (contact?: any) => {
        // let id = await this.cContactEdit.call(address && address.id);
        // await this.deliveryContactMap.add({ customer: this.customerId, arr1: [{ address: id }] });
        // let { cContact } = this.cApp;
        // cContact.start();
        let { cUsqCustomer } = this.cApp;
        this.contactTuid = cUsqCustomer.tuid("contact")
        this.showVPage(VContact);
    }

    saveContact = async (contact: any) => {

        // await this.contactTuid.save(0, contact);
        // await this.deliveryContactMap.add({ customer: this.customer.id, contact: contact.id });
        // this.onContactSelected(contact);
        this.closePage(2);
    }

    onContactSelected = (contact: any) => {

        let { cOrder } = this.cApp;
        cOrder.setContact(contact);
        this.backPage();
    }

    renderUser = () => {
        return <div>Me</div>
    }
}