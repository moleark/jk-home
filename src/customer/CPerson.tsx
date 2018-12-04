import * as React from 'react';
import { ControllerUsq, TuidMain, Map, CTuidEdit, CUsq } from 'tonva-react-usql';
import { VAddressList } from './VAddressList';
import { CCartApp } from 'home/CCartApp';
import { VContact } from './VContact';
import { Controller } from 'tonva-tools';

export class CPerson extends Controller {

    private cApp: CCartApp;

    private personId: number;
    private cContactEdit: CTuidEdit;
    private personTuid: TuidMain;
    private contactTuid: TuidMain;
    private deliveryContactMap: Map;

    person: any;
    addresses: any[] = [];

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUsqCustomer } = this.cApp;
        this.personTuid = cUsqCustomer.tuid('person');
        this.contactTuid = cUsqCustomer.tuid('contact');
        this.deliveryContactMap = cUsqCustomer.map('personConsigneeContact');
        this.cContactEdit = cUsqCustomer.cTuidEdit(this.contactTuid);
    }

    async internalStart(param: any) {

        param = 1;
        this.personId = param;

        this.person = await this.personTuid.load(this.personId);
        this.addresses = await this.deliveryContactMap.table({ person: this.personId });
        this.showVPage(VAddressList);
    }

    onContactEdit = async (contact?: any) => {
        // let id = await this.cContactEdit.call(address && address.id);
        // await this.deliveryContactMap.add({ person: this.personId, arr1: [{ address: id }] });
        // let { cContact } = this.cApp;
        // cContact.start();
        let { cUsqCustomer } = this.cApp;
        this.contactTuid = cUsqCustomer.tuid("contact")
        this.showVPage(VContact);
    }

    saveContact = async (contact: any) => {

        // await this.contactTuid.save(0, contact);
        // await this.deliveryContactMap.add({ person: this.person.id, contact: contact.id });
        // this.onContactSelected(contact);
        this.closePage(2);
    }

    onContactSelected = (contact: any) => {

        let { cOrder } = this.cApp;
        cOrder.setContact(contact);
        this.backPage();
    }
}