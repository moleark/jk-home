//import { Controller } from 'tonva';
import { CBase } from '../CBase';
import { VInvoiceInfo } from './VInvoiceInfo';
//import { CCartApp } from 'CCartApp';
//import { Tuid } from 'tonva';

export class CInvoiceInfo extends CBase {
    //protected cApp: CCartApp;
    //private invoiceTypeTuid: Tuid;
    //private invoiceInfoTuid: Tuid;
    fromOrderCreation: boolean;
    /*
    constructor(cApp: CCartApp, res: any, fromOrderCreation: boolean) {
        super(res);
        this.cApp = cApp;

        let { cUqCommon, cUqCustomer } = cApp;
        this.invoiceTypeTuid = cUqCommon.tuid('invoiceType');
        this.invoiceInfoTuid = cUqCustomer.tuid('invoiceInfo');
        this.fromOrderCreation = fromOrderCreation;
    }
    */

    /*
    protected init() {
        let { cUqCommon, cUqCustomer } = this.cApp;
        this.invoiceTypeTuid = cUqCommon.tuid('invoiceType');
        this.invoiceInfoTuid = cUqCustomer.tuid('invoiceInfo');
        //this.fromOrderCreation = fromOrderCreation;
    }
    */

    async internalStart(origInvoice: any, fromOrderCreation: boolean) {
        this.fromOrderCreation = fromOrderCreation;
        this.openVPage(VInvoiceInfo, origInvoice);
    }

    async saveInvoiceInfo(invoice: any) {
        let { invoiceType, invoiceInfo, isDefault } = invoice;
        let newInvoiceInfo = await this.uqs.common.InvoiceInfo.save(undefined, invoiceInfo);

        let { id: newInvoiceInfoId } = newInvoiceInfo;
        let invoiceBox = {
            invoiceType: this.uqs.common.InvoiceType.boxId(invoiceType),
            invoiceInfo: this.uqs.common.InvoiceInfo.boxId(newInvoiceInfoId),
        }
        // if (isDefault === true || !this.fromOrderCreation) {
        let { currentUser } = this.cApp;
        await currentUser.setDefaultInvoice(invoiceBox.invoiceType, invoiceBox.invoiceInfo);
        // }
        if (this.fromOrderCreation) {
            this.backPage();
            this.returnCall(invoiceBox);
        }
    }
}