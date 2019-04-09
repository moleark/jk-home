import * as React from 'react';
import { Controller } from 'tonva-tools';
import { CCartApp } from 'CCartApp';
import { VMe } from './VMe';
import { Sheet } from 'tonva-react-uq';

export class CMe extends Controller {

    cApp: CCartApp;
    private orderSheet: Sheet;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
        let { cUqOrder } = cApp;
        this.orderSheet = cUqOrder.sheet("order");
    }

    protected async internalStart() {

    }

    async changeWebUser(webUser: any) {
        let { currentUser } = this.cApp;
        await currentUser.changeWebUser(webUser);
    }

    tab = () => <this.renderMe />

    private renderMe = () => {
        return this.renderView(VMe);
    }
}