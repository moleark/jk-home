import * as React from 'react';
import { Controller } from 'tonva';
import { CCartApp } from 'CCartApp';
import { VMe } from './VMe';
import { CSelectShippingContact } from 'customer/CSelectContact';
import { EditMeInfoFirstOrder } from './EditMeInfoFirstOrder';

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

    tab = () => <this.renderMe />

    private renderMe = () => {
        return this.renderView(VMe);
    }

    openMyOrders = async (state: string) => {
        let { cOrder } = this.cApp;
        await cOrder.openMyOrders(state);
    }

    openContactList = async () => {
        let contactList = new CSelectShippingContact(this.cApp, undefined, false);
        await contactList.start();
    }

    openMeInfoFirstOrder = async () => {
        await this.openVPage(EditMeInfoFirstOrder);
    }
}