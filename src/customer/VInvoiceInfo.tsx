import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context } from 'tonva-tools';
import { CInvoiceInfo } from './CInvoiceInfo';
import { Schema } from 'tonva-tools';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { number } from 'prop-types';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'title', type: 'string', required: false },
    { name: 'taxNo', type: 'string', required: false },
    { name: 'address', type: 'id', required: false },
    { name: 'telephone', type: 'string', required: false },
    { name: 'bank', type: 'string', required: false },
    { name: 'accountNo', type: 'string', required: false },
];

const commonRequired = {
    id: false,
    title: true,
    taxNo: true,
    address: false,
    telephone: false,
    bank: false,
    accountNo: false,
};

const valueAddedRequired = {
    id: false,
    title: true,
    taxNo: true,
    address: true,
    telephone: true,
    bank: true,
    accountNo: true,
}


export class VInvoiceInfo extends VPage<CInvoiceInfo> {
    private form: Form;
    private invoice: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            title: { widget: 'text', label: '单位名称', placeholder: '必填' } as UiInputItem,
            taxNo: { widget: 'text', label: '纳税人识别码', placeholder: '必填' } as UiInputItem,
            address: { widget: 'text', label: '注册地址', placeholder: '必填' } as UiInputItem,
            telephone: { widget: 'text', label: '注册电话', placeholder: '必填' } as UiInputItem,
            bank: { widget: 'text', label: '开户银行', placeholder: '必填' } as UiInputItem,
            accountNo: { widget: 'text', label: '银行账号', placeholder: '必填' } as UiInputItem,
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(param?: any) {
        this.invoiceType = 1;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let invoice = { invoiceType: this.invoiceType, invoiceInfo: context.form.data };
        await this.controller.saveInvoiceInfo(invoice);
    }

    private onSaveInvoice = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    @observable invoiceType: number;

    private buildForm(): JSX.Element {
        let requiredFields = this.invoiceType === 1 ? commonRequired : valueAddedRequired;
        schema.forEach(e => {
            let { items } = this.uiSchema;
            e.required = requiredFields[e.name];
            items[e.name].visible = requiredFields[e.name];
        });
        return <Form ref={v => this.form = v} className="my-3"
            schema={schema}
            uiSchema={this.uiSchema}
            formData={this.invoice}
            onButtonClick={this.onFormButtonClick}
            fieldLabelSize={3} />
    }

    private onInvoiceTypeClick = (event: React.MouseEvent<HTMLInputElement>) => {
        this.invoiceType = parseInt(event.currentTarget.value);
    }

    private page = observer(() => {
        let frm = this.buildForm();
        return <Page header="发票">
            <div className="px-3">
                <div className="form-group row py-3 mb-1 bg-white">
                    <div className="col-12 col-sm-3 pb-2 text-muted">发票类型:</div>
                    <div className="col-12 col-sm-9">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="invoiceType" id="common" value="1"
                                onClick={(event) => this.onInvoiceTypeClick(event)} defaultChecked></input>
                            <label className="form-check-label" htmlFor="common">普通发票</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="invoiceType" id="valueAdded" value="2"
                                onClick={(event) => this.onInvoiceTypeClick(event)}></input>
                            <label className="form-check-label" htmlFor="valueAdded">增值税发票</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 bg-white">
                {frm}
                <button type="button"
                    className="btn btn-primary w-100"
                    onClick={this.onSaveInvoice}>确定</button>
            </div>
        </Page>
    });
}