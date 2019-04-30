import { Controller } from 'tonva-tools';
import { VInvoiceInfo } from './VInvoiceInfo';
import { CCartApp } from 'CCartApp';
import { TuidMain } from 'tonva-react-uq';

export class CInvoiceInfo extends Controller {
    protected cApp: CCartApp;
    private invoiceTypeTuid: TuidMain;
    private invoiceInfoTuid: TuidMain;

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqCommon, cUqCustomer } = cApp;
        this.invoiceTypeTuid = cUqCommon.tuid('invoiceType');
        this.invoiceInfoTuid = cUqCustomer.tuid('invoiceInfo');
    }

    async internalStart(param?: any) {
        this.openVPage(VInvoiceInfo);
    }

    async saveInvoiceInfo(invoice: any) {
        let newInvoiceInfo = await this.invoiceInfoTuid.save(undefined, invoice.invoiceInfo);
        let newInvoice = {
            invoiceInfo: this.invoiceInfoTuid.boxId(newInvoiceInfo.id),
            invoiceType: this.invoiceTypeTuid.boxId(invoice.invoiceType)
        }
        this.returnCall(newInvoice);
        this.backPage();
    }
}