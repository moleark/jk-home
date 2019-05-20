import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context } from 'tonva';
import { CInvoiceInfo } from './CInvoiceInfo';
import { Schema } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'title', type: 'string', required: false },
    { name: 'taxNo', type: 'string', required: false },
    { name: 'address', type: 'id', required: false },
    { name: 'telephone', type: 'string', required: false },
    { name: 'bank', type: 'string', required: false },
    { name: 'accountNo', type: 'string', required: false },
    { name: 'isDefault', type: 'boolean', required: false },
];

const commonRequired = {
    id: false,
    title: true,
    taxNo: true,
    address: false,
    telephone: false,
    bank: false,
    accountNo: false,
    isDefault: false,
};

const valueAddedRequired = {
    id: false,
    title: true,
    taxNo: true,
    address: true,
    telephone: true,
    bank: true,
    accountNo: true,
    isDefault: false,
}

const commonVisible = {
    id: false,
    title: true,
    taxNo: true,
    address: false,
    telephone: false,
    bank: false,
    accountNo: false,
    isDefault: true,
};

const valueAddedVisible = {
    id: false,
    title: true,
    taxNo: true,
    address: true,
    telephone: true,
    bank: true,
    accountNo: true,
    isDefault: true,
}



export class VInvoiceInfo extends VPage<CInvoiceInfo> {
    private form: Form;

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
            isDefault: { widget: 'checkbox', label: '作为默认发票信息' },
        }
    }

    async open(origInvoice?: any) {
        if (origInvoice  !== undefined && origInvoice.invoiceType !== undefined)
            this.invoiceType = origInvoice.invoiceType.id;
        else
            this.invoiceType = 1;
        this.openPage(this.page, origInvoice);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { form } = context;
        let { data } = form;
        let invoice = {
            invoiceType: this.invoiceType,
            invoiceInfo: data,
            isDefault: data.isDefault,
        };
        await this.controller.saveInvoiceInfo(invoice);
    }

    private onSaveInvoice = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    @observable invoiceType: number;

    private buildForm(invoiceInfo: any): JSX.Element {
        let requiredFields = this.invoiceType === 1 ? commonRequired : valueAddedRequired;
        let visibleFields = this.invoiceType === 1 ? commonVisible : valueAddedVisible;
        schema.forEach(e => {
            let { items } = this.uiSchema;
            e.required = requiredFields[e.name];
            items[e.name].visible = visibleFields[e.name];
        });
        return <Form ref={v => this.form = v} className="my-3"
            schema={schema}
            uiSchema={this.uiSchema}
            formData={invoiceInfo}
            onButtonClick={this.onFormButtonClick}
            fieldLabelSize={3} />
    }

    private onInvoiceTypeClick = (event: React.MouseEvent<HTMLInputElement>) => {
        this.invoiceType = parseInt(event.currentTarget.value);
    }

    private page = observer((origInvoice: any) => {
        let frm = this.buildForm(origInvoice.invoiceInfo);
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