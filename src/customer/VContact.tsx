import * as React from 'react';
import { VPage, Page, Form, Schema, UiSchema, Context, UiInputItem, UiIdItem } from 'tonva-tools';
import { CUser } from './CPerson';

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
    { name: 'submit', type: 'submit' },
]

const uiSchema: UiSchema = {
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
        address: { widget: 'id', label: '所在地区', placeholder: '所在地区' } as UiIdItem,
        addressString: {
            widget: 'text', label: '详细地址',
            rules: (value: any) => { if (value && value.length < 8) return "详细地址不能小于8个字符。"; else return undefined; },
            placeholder: '详细地址'
        } as UiInputItem,
        isDefault: { widget: 'checkbox', label: '作为默认地址' },
        submit: { widget: 'button', label: '提交' },
    }
}

export class VContact extends VPage<CUser> {

    private contactData: any = {};

    async open(userContactData: any) {

        let { contact } = userContactData;
        if (contact !== undefined) {
            this.contactData = {
                id: contact.id,
                name: contact.name,
                organizationName: contact.organizationName,
                mobile: contact.mobile,
                telephone: contact.telephone,
                email: contact.email,
                addressString: contact.addressString,
                isDefault: contact.isDefault,
            };
        }
        this.openPage(this.page);
    }

    private saveContact = async () => {
    }
    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveContact(context.form.data);
    }

    private page = () => {

        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveContact}>保存并使用</button>
        return <Page header="添加收货人" footer={footer}>
            <div className="App-container container text-left">
                <Form schema={schema} uiSchema={uiSchema} formData={this.contactData}
                    onButtonClick={this.onFormButtonClick} fieldLabelSize={3} className="my-3" />
            </div>
        </Page>
    }
}