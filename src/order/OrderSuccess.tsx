import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { COrder } from './COrder';

export class OrderSuccess extends VPage<COrder> {

    async showEntry(orderCreateResult: any) {

        this.openPage(this.page, orderCreateResult);
    }

    private page = (orderCreateResult: any) => {
        return <Page>
            <div>{orderCreateResult.no}</div>
        </Page>
    }
}