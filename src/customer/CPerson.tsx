import * as React from 'react';
import { ControllerUsq, TuidMain, Map, CTuidEdit, CUsq } from 'tonva-react-usql';
import { VAddressList } from './VAddressList';
import { CCartApp } from 'home/CCartApp';

export class CPerson extends ControllerUsq {

    private cApp: CCartApp;

    private personId: number;
    private cAddressEdit: CTuidEdit;
    private personTuid: TuidMain;
    private addressTuid: TuidMain;
    private addressMap: Map;

    person: any;
    addresses: any[] = [];

    constructor(cApp: CCartApp, cUsq: CUsq, res: any) {
        super(cUsq, res);
        this.cApp = cApp;

        this.personTuid = this.cUsq.tuid('person');
        this.addressTuid = this.cUsq.tuid('address');
        this.addressMap = this.cUsq.map('personConsigneeAddress');
        this.cAddressEdit = this.cUsq.cTuidEdit(this.addressTuid);
    }

    async internalStart(param: any) {

        param = 1;
        this.personId = param;

        this.person = await this.personTuid.load(this.personId);
        this.addresses = await this.addressMap.table({ _person: this.personId });
        this.showVPage(VAddressList);
    }

    onAddressEdit = async (address?: any) => {
        let id = await this.cAddressEdit.call(address && address.id);
        await this.addressMap.add({ _person: this.personId, arr1: [{ _address: id }] });
    }

    onAddressSelected = (address: any) => {

        let { cOrder } = this.cApp;
        cOrder.setAddress(address);
        this.backPage();
    }
}