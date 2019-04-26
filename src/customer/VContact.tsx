import * as React from 'react';
import _ from 'lodash';
import { VPage, Page, Form, Schema, UiSchema, Context, UiInputItem, UiIdItem } from 'tonva-tools';
import { tv } from 'tonva-react-uq';
import { CSelectContact } from './CSelectContact';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'name', type: 'string', required: true },
    { name: 'organizationName', type: 'string', required: true },
    { name: 'mobile', type: 'string', required: true },
    { name: 'telephone', type: 'string', required: false },
    { name: 'email', type: 'string', required: false },
    { name: 'address', type: 'id', required: true },
    { name: 'addressString', type: 'string', required: true },
    { name: 'isDefault', type: 'boolean', required: false },
    // { name: 'submit', type: 'submit' },
];

export class VContact extends VPage<CSelectContact> {

    //private contactData: any = {};
    private userContactData: any;
    private form: Form;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            name: { widget: 'text', label: '姓名', placeholder: '姓名' } as UiInputItem,
            organizationName: { widget: 'text', label: '单位名称', placeholder: '单位名称' } as UiInputItem,
            mobile: { widget: 'text', label: '手机号码', placeholder: '手机号码' } as UiInputItem,
            telephone: { widget: 'text', label: '电话', placeholder: '电话' } as UiInputItem,
            email: {
                widget: 'email', label: 'Email',
                rules: (value: any) => {
                    if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))
                        return "Email格式不正确。";
                    else
                        return undefined;
                },
                placeholder: 'Email'
            } as UiInputItem,
            address: {
                widget: 'id', label: '所在地区', placeholder: '所在地区',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickAddress(context, name, value),
                Templet: (item: any) => {
                    let { obj } = item;
                    if (!obj) return <small className="text-muted">请选择地区</small>;
                    let { country, province, city, county } = obj;
                    //, (v) => <>{v.chineseName}</>
                    return <>
                        {tv(country, v => <>{v.chineseName}</>)}
                        {tv(province, (v) => <>{v.chineseName}</>)}
                        {tv(city, (v) => <>{v.chineseName}</>)}
                        {tv(county, (v) => <>{v.chineseName}</>)}
                    </>;
                }
            } as UiIdItem,
            addressString: {
                widget: 'text', label: '详细地址',
                placeholder: '详细地址'
            } as UiInputItem,
            isDefault: { widget: 'checkbox', label: '作为默认地址' },
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(userContactData: any) {
        this.userContactData = userContactData;
        this.openPage(this.page);
    }

    private onSaveContact = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveContact(context.form.data);
    }

    private onDelContact = async () => {
        let { contact } = this.userContactData;
        if (await this.vCall(VConfirmDeleteContact, contact) === true) {
            await this.controller.delContact(contact);
            this.closePage();
        };
    }

    private page = () => {
        let contactData = _.clone(this.userContactData.contact);

        let buttonDel: any;
        if (contactData !== undefined) {
            buttonDel = <button className="btn btn-sm btn-info" onClick={this.onDelContact}>删除</button>;
        }
        let { fromOrderCreation } = this.controller;
        let footer = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSaveContact}>{fromOrderCreation ? '保存并使用' : '保存'}</button>;
        return <Page header="地址信息" footer={footer} right={buttonDel}>
            <div className="App-container container text-left">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    formData={contactData}
                    onButtonClick={this.onFormButtonClick}
                    fieldLabelSize={3} />
            </div>
        </Page>
    }
}

class VConfirmDeleteContact extends VPage<CSelectContact> {
    async open(contact: any) {
        this.openPage(this.page, contact);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private page = (contact: any) => {
        return <Page header="确认" back="close">
            <div className="w-50 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 text-center position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">{contact.name}</b>
                </div>
                <button className="btn btn-danger w-50 mx-auto d-block mt-3" onClick={this.onConfirm}>确认删除</button>
            </div>
        </Page>;
    }
}
