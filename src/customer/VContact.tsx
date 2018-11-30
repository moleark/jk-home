import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CPerson } from './CPerson';

export class VContact extends VPage<CPerson> {

    async showEntry(param: any) {

        this.openPage(this.page);
    }

    private saveContact = async () => {

        await this.controller.saveContact(undefined);
    }

    private page = () => {

        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveContact}>保存并使用</button>
        return <Page header="添加收货人" footer={footer}>
            <form>
                <div className="form-group row">
                    <label htmlFor="name" className="col-3 col-form-label">收货人</label>
                    <div className="col-9">
                        <input type="input" className="form-control" id="name" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="mobile" className="col-3 col-form-label">手机号码</label>
                    <div className="col-9">
                        <input type="input" className="form-control" id="mobile" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="address" className="col-3 col-form-label">所在地区</label>
                    <div className="col-9">
                        <input type="input" className="form-control" id="address" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="addressDetail" className="col-3 col-form-label">详细地址</label>
                    <div className="col-9">
                        <input type="input" className="form-control" id="addressDetail" />
                    </div>
                </div>
            </form>
        </Page>
    }
}