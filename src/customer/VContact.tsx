import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CContact } from './CContact';

export class VContact extends VPage<CContact> {

    async showEntry(param: any){

        this.openPage(this.page);
    }

    private page = () => {
        return <Page header="添加收货人">
            <div>geekgek</div>
        </Page>
    }
}