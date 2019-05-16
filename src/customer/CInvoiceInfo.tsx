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

    async internalStart(origInvoice?: any) {
        if (origInvoice !== undefined) {
            let { invoiceInfo: invoiceInfoBox } = origInvoice;
            if (invoiceInfoBox !== undefined) {
                let invoiceInfo = await this.invoiceInfoTuid.load(invoiceInfoBox.id);
                origInvoice.invoiceInfo = invoiceInfo;
            }
        }
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
        if (isDefault === true) {
            let { currentUser } = this.cApp;
            await currentUser.setDefaultInvoice(invoiceBox.invoiceType, invoiceBox.invoiceInfo);
        }
        this.backPage();
        this.returnCall(invoiceBox);
    }
}