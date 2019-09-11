import * as React from 'react';
import _ from 'lodash';
import { Controller, Context } from 'tonva';
//import { CCartApp } from 'CCartApp';
import { CApp } from '../CApp';
import { CUqBase } from '../CBase';
import { VMe } from './VMe';
import { CSelectShippingContact } from '../customer/CSelectContact';
import { EditMeInfoFirstOrder } from './EditMeInfoFirstOrder';
import { CInvoiceInfo } from '../customer/CInvoiceInfo';
import { CAddress } from '../customer/CAddress';

export class CMe extends CUqBase {
    cApp: CApp;
    /*
    cApp: CCartApp;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
    }
    */

    protected async internalStart() {

    }

    async changeWebUser(webUser: any) {
        let { currentUser } = this.cApp;
        await currentUser.changeWebUser(webUser);
    }

    async changeWebUserContact(webUserContact: any) {
        let { currentUser } = this.cApp;
        await currentUser.changeWebUserContact(webUserContact);
    }

    tab = () => this.renderView(VMe);

    openMyOrders = async (state: string) => {
        let { cOrder } = this.cApp;
        await cOrder.openMyOrders(state);
    }

    openContactList = async () => {
        let contactList = this.newC(CSelectShippingContact); // new CSelectShippingContact(this.cApp, undefined, false);
        await contactList.start(false);
    }

    openInvoice = async () => {
        let cInvoiceInfo = this.newC(CInvoiceInfo); // new CInvoiceInfo(this.cApp, undefined, false);
        let { currentUser } = this.cApp;
        let defaultSetting = await currentUser.getSetting();

        let origInvoice = _.pick(defaultSetting, ['invoiceType', 'invoiceInfo']);
        cInvoiceInfo.start(origInvoice);
    }

    openMeInfoFirstOrder = async () => {
        await this.openVPage(EditMeInfoFirstOrder);
    }

    pickAddress = async (context: Context, name: string, value: number): Promise<number> => {
        let cAddress = this.newC(CAddress); // new CAddress(this.cApp, undefined);
        return await cAddress.call<number>();
    }
}