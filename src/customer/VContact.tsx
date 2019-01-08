import * as React from 'react';
import { VPage, Page, Form, Schema, UiSchema, Context } from 'tonva-tools';
import { CUser } from './CPerson';

const schema: Schema = [
    { name: 'webUser', type: 'id', required: false },
    { name: 'name', type: 'string', required: true },
    { name: 'organizationName', type: 'string', required: true },
    { name: 'mobile', type: 'string', required: true },
    { name: 'telephone', type: 'string', required: false },
    { name: 'email', type: 'string', required: false },
    { name: 'address', type: 'id', required: false },
    { name: 'addressString', type: 'string', required: true },
    { name: 'isDefault', type: 'integer', required: true },
    { name: 'submit', type: 'submit' },
]

const uiSchema: UiSchema = {
    items: {
        webUser: { visible: false },
        name: { widget: 'text', label: '姓名' },
        organizationName: { widget: 'text', label: '单位名称' },
        mobile: { widget: 'text', label: '手机号' },
        telephone: { widget: 'text', label: '电话' },
        addressString: { widget: 'text', label: '详细地址' },
        isDefault: { widget: 'checkbox', label: '作为默认地址' },
        submit: { widget: 'button', label: '提交' },
    }
}

export class VContact extends VPage<CUser> {

    async showEntry(param: any) {

        this.openPage(this.page);
    }

    private saveContact = async () => {
    }
    private onFormButtonClick = async (name: string, context: Context) => {

        if (context.form.data.isDefault)
            context.form.data.isDefault = 1;
        else
            context.form.data.isDefault = 0;
        await this.controller.saveContact(context.form.data);
    }

    private page = () => {

        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveContact}>保存并使用</button>
        return <Page header="添加收货人" footer={footer}>
            <div className="App-container container text-left">
                <Form schema={schema} uiSchema={uiSchema} formData={{ webUser: this.controller.user.id }}
                    onButtonClick={this.onFormButtonClick} fieldLabelSize={3} className="my-3" />
            </div>
        </Page>
    }
}