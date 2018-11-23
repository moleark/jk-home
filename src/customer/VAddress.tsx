import * as React from 'react';
import { CPerson } from './CPerson';
import { VPage, Page } from 'tonva-tools';
import { tv } from 'tonva-react-usql';

export class VAddress extends VPage<CPerson> {

    async showEntry(param: any) {

        this.openPage(this.page, param);
    }

    private page = (address: any) => {

        let { person } = this.controller;
        return <Page>
            {tv(person)}
            {tv(address)}
        </Page>
    }
}