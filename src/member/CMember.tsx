import * as React from 'react';
import { Controller } from 'tonva-tools';
import { VMember } from './VMember';
import { CCartApp } from 'home/CCartApp';

export class CMember extends Controller {

    cApp: CCartApp;

    constructor(cApp: CCartApp, res: any){
        super(res);

        this.cApp = cApp;
    }

    protected async internalStart(param: any) {

    }

    renderMember = () => {
        return this.renderView(VMember);
    }
}