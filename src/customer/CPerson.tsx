import * as React from 'react';
import { ControllerUsq, TuidMain, Map, CTuidEdit, CUsq } from 'tonva-react-usql';
import { VAddressList } from './VAddressList';
import { CCartApp } from 'home/CCartApp';

export class CPerson extends ControllerUsq {

    private cApp: CCartApp;

    private personId: number;
    private cContactEdit: CTuidEdit;
    private personTuid: TuidMain;
    private contactTuid: TuidMain;
    private deliveryContactMap: Map;

    person: any;
    addresses: any[] = [];

    constructor(cApp: CCartApp, cUsq: CUsq, res: any) {
        super(cUsq, res);
        this.cApp = cApp;

        this.personTuid = this.cUsq.tuid('person');
        this.contactTuid = this.cUsq.tuid('contact');
        this.deliveryContactMap = this.cUsq.map('personConsigneeContact');
        this.cContactEdit = this.cUsq.cTuidEdit(this.contactTuid);
    }

    async internalStart(param: any) {

        param = 1;
        this.personId = param;

        this.person = await this.personTuid.load(this.personId);
        this.addresses = await this.deliveryContactMap.table({ _person: this.personId });
        this.showVPage(VAddressList);
    }

    onAddressEdit = async (address?: any) => {
        let id = await this.cContactEdit.call(address && address.id);
        await this.deliveryContactMap.add({ _person: this.personId, arr1: [{ _address: id }] });
        // let { cContact } = this.cApp;
        // cContact.start();
    }

    onAddressSelected = (address: any) => {

        let { cOrder } = this.cApp;
        cOrder.setAddress(address);
        this.backPage();
    }
}