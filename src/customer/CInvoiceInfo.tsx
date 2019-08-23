import { Controller } from 'tonva';
import { VInvoiceInfo } from './VInvoiceInfo';
import { CCartApp } from 'CCartApp';
import { Tuid } from 'tonva';

export class CInvoiceInfo extends Controller {
    protected cApp: CCartApp;
    private invoiceTypeTuid: Tuid;
    private invoiceInfoTuid: Tuid;
    fromOrderCreation: boolean;

    constructor(cApp: CCartApp, res: any, fromOrderCreation: boolean) {
        super(res);
        this.cApp = cApp;

        let { cUqCommon, cUqCustomer } = cApp;
        this.invoiceTypeTuid = cUqCommon.tuid('invoiceType');
        this.invoiceInfoTuid = cUqCustomer.tuid('invoiceInfo');
        this.fromOrderCreation = fromOrderCreation;
    }

    async internalStart(origInvoice?: any) {
        this.openVPage(VInvoiceInfo, origInvoice);
    }

    async saveInvoiceInfo(invoice: any) {
        let { invoiceType, invoiceInfo, isDefault } = invoice;
        let newInvoiceInfo = await this.invoiceInfoTuid.save(undefined, invoiceInfo);

        let { id: newInvoiceInfoId } = newInvoiceInfo;
        let invoiceBox = {
            invoiceType: this.invoiceTypeTuid.boxId(invoiceType),
            invoiceInfo: this.invoiceInfoTuid.boxId(newInvoiceInfoId),
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