import { Controller, Action } from 'tonva';
import { CCartApp } from 'CCartApp';
import { VCouponEdit } from './VCouponEdit';

export class CCoupon extends Controller {
    private cApp: CCartApp;
    private isValidCoupon: Action;
    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
        let { cUqSalesTask } = cApp;
        this.isValidCoupon = cUqSalesTask.action('isCanUseCoupon');
    }

    applyCoupon = async (coupon: string) => {

        let validationResult = await this.isValidCoupon.submit({ code: coupon, webuser: this.cApp.currentUser.id });
        let rtn = validationResult.result;
        if (rtn === 1) {
            this.returnCall(validationResult);
            this.closePage();
        }
        return rtn;
    }

    protected async internalStart(param: any) {
        this.openVPage(VCouponEdit);
    }
}