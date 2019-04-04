import * as React from 'react';
import { Controller } from 'tonva-tools';
import { CCartApp } from 'CCartApp';
import { VMe } from './VMe';

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

    tab = () => <this.renderMe />

    private renderMe = () => {
        return this.renderView(VMe);
    }
}