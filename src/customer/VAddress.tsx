import * as React from 'react';
import { CUser } from './CPerson';
import { VPage, Page } from 'tonva-tools';
import { tv } from 'tonva-react-uq';

export class VAddress extends VPage<CUser> {

    async open(param: any) {

        this.openPage(this.page, param);
    }

    private page = (address: any) => {

        let { customer } = this.controller;
        return <Page>
            {tv(customer)}
            {tv(address)}
        </Page>
    }
}