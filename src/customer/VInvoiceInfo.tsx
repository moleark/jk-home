import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context, tv, BoxId, FA } from 'tonva';
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
];

const uiSchema: UiSchema = {
    items: {
        id: { visible: false },
        title: {
            widget: 'text', label: '单位名称', placeholder: '必填',
            rules: (value: string) => {
                return (value && value.length > 200) ? '单位名称过长，请修改后录入' : undefined;
            }
        } as UiInputItem,
        taxNo: {
            widget: 'text', label: '纳税人识别码', placeholder: '必填',
            rules: (value: string) => {
                return (value && value.length > 50) ? '纳税人识别码过长，请修改后录入' : undefined;
            }
        } as UiInputItem,
        address: {
            widget: 'text', label: '注册地址', placeholder: '必填',
            rules: (value: string) => {
                return (value && value.length > 200) ? '注册地址过长，请修改后录入' : undefined;
            }
        } as UiInputItem,
        telephone: {
            widget: 'text', label: '注册电话', placeholder: '必填',
            rules: (value: string) => {
                return (value && value.length > 20) ? '注册电话过长，请修改后录入' : undefined;
            }
        } as UiInputItem,
        bank: {
            widget: 'text', label: '开户银行', placeholder: '必填',
            rules: (value: string) => {
                return (value && value.length > 100) ? '开会银行过长，请修改后录入' : undefined;
            }
        } as UiInputItem,
        accountNo: {
            widget: 'text', label: '银行账号', placeholder: '必填',
            rules: (value: string) => {
                return (value && value.length > 50) ? '银行账号过长，请修改后录入' : undefined;
            }
        } as UiInputItem,
        submit: { widget: 'button', label: '提交' },
    }
}

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
    @observable showTip: boolean = false;
    saveTip: string = "";
    private invoiceInfoData: any;

    async open(origInvoice?: any) {
        let { invoiceType, invoiceInfo } = origInvoice;
        this.invoiceType = (invoiceType && invoiceType.id) || 1;
        if (invoiceInfo) {
            invoiceInfo.assure();
            this.invoiceInfoData = { ...invoiceInfo.obj };
        }
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { form } = context;
        let { data } = form;
        let invoice = {
            invoiceType: this.invoiceType,
            invoiceInfo: data,
        };
        this.invoiceInfoData = data;

        try {
            await this.controller.saveInvoiceInfo(invoice);
            this.saveTip = "发票信息已经保存";
        } catch (error) {
            this.saveTip = "发票信息保存失败，请稍后再试";
        }
        this.showTip = true;
        setTimeout(() => { this.showTip = false; }, 2000);
    }

    private onSaveInvoice = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    @observable invoiceType: number;

    private buildForm(): JSX.Element {
        let requiredFields = this.invoiceType === 1 ? commonRequired : valueAddedRequired;
        let visibleFields = this.invoiceType === 1 ? commonVisible : valueAddedVisible;
        schema.forEach(e => {
            let { items } = uiSchema;
            e.required = requiredFields[e.name];
            items[e.name].visible = visibleFields[e.name];
        });
        return <Form ref={v => this.form = v} className="my-3"
            schema={schema}
            uiSchema={uiSchema}
            formData={this.invoiceInfoData}
            onButtonClick={this.onFormButtonClick}
            fieldLabelSize={3} />
    }

    private onInvoiceTypeClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.invoiceType = parseInt(event.currentTarget.value);
    }

    private page = observer(() => {
        let frm = this.buildForm();

        let tipUI = this.showTip ? (<div className="alert alert-primary" role="alert">
            <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
            {this.saveTip}
        </div>) : null;
        return <Page header="发票">
            <div className="px-3">
                <div className="form-group row py-3 mb-1 bg-white">
                    <div className="col-12 col-sm-3 pb-2 text-muted">发票类型:</div>
                    <div className="col-12 col-sm-9">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="invoiceType" id="common" value="1"
                                onChange={(event) => this.onInvoiceTypeClick(event)} checked={this.invoiceType === 1}></input>
                            <label className="form-check-label" htmlFor="common">普通发票</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="invoiceType" id="valueAdded" value="2"
                                onChange={(event) => this.onInvoiceTypeClick(event)} checked={this.invoiceType === 2}></input>
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
                {tipUI}
            </div>
        </Page>
    });
}