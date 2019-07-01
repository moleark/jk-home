import * as React from 'react';
import { VPage, FA, Page } from 'tonva';
import { CCoupon } from './CCoupon';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

export class VCouponEdit extends VPage<CCoupon> {

    private couponInput: HTMLInputElement;
    @observable tips: string;
    async open(param: any) {
        if (param !== undefined) {

        }
        this.openPage(this.page);
    }

    private applyCoupon = async () => {
        let coupon = this.couponInput.value;
        if (!coupon)
            return;
        let ret = await this.controller.applyCoupon(coupon);
        switch (ret) {
            case -1:
                this.tips = '系统错误，稍后再试';
                break;
            case 1:
                this.tips = '有效';
                break;
            case 0:
            case 2:
            case 3:
            case 5:
                this.tips = '无效';
                break;
            case 4:
                this.tips = '用过了';
                break;
            default:
                break;
        }
    }

    private page = observer(() => {
        let tipsUI = <></>;
        if (this.tips) {
            tipsUI = <div className="text-danger">
                {this.tips}
            </div>
        }
        return <Page header="填写优惠码">
            <div className="px-2">
                <div className="row py-3 pr-3 bg-white my-1">
                    <div className="col-4 col-sm-2 pb-2 text-muted">优惠码:</div>
                    <div className="col-8 col-sm-10 d-flex">
                        <input ref={v => this.couponInput = v} type="number" className="form-control w-50" ></input>
                        <button className="btn btn-primary ml-3" onClick={this.applyCoupon}>应用</button>
                        <div>
                            <span className="fa-stack">
                                <FA name="check-circle" className="text-success fa-stack-2x"></FA>
                                <FA name="times-circle" className="text-danger fa-stack-2x"></FA>
                            </span>
                        </div>
                    </div>
                </div>
                {tipsUI}
            </div>
        </Page>
    })
}