import * as React from 'react';
import { Controller, Context } from 'tonva';
import { CCartApp } from 'CCartApp';
import { VMe } from './VMe';
import { CSelectShippingContact } from 'customer/CSelectContact';
import { EditMeInfoFirstOrder } from './EditMeInfoFirstOrder';
import { CInvoiceInfo } from 'customer/CInvoiceInfo';
import { CAddress } from 'customer/CAddress';

export class CMe extends Controller {

    cApp: CCartApp;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
    }

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
        let contactList = new CSelectShippingContact(this.cApp, undefined, false);
        await contactList.start();
    }

    openInvoice = async () => {
        let cInvoiceInfo = new CInvoiceInfo(this.cApp, undefined);
        cInvoiceInfo.start();
    }

    openMeInfoFirstOrder = async () => {
        await this.openVPage(EditMeInfoFirstOrder);
    }

    pickAddress = async (context: Context, name: string, value: number): Promise<number> => {
        let cAddress = new CAddress(this.cApp, undefined);
        return await cAddress.call<number>();
    }
}