import * as React from 'react';
import { observable } from 'mobx';
import { ItemSchema, StringSchema, ImageSchema, UiTextItem, UiImageItem, nav, Page, Edit, UiSchema, VPage } from 'tonva-tools';
import userApi from 'tonva-tools/entry/userApi';
import { CMe } from './CMe';
import { UiInputItem } from 'tonva-tools/ui/form/uiSchema';
import { webUserSchema, webUserUiSchema, webUserContactSchema, webUserContactUiSchema } from './EditMeInfo';

export class EditMeInfoFirstOrder extends VPage<CMe>{

    async open(param: any) {
        this.openPage(this.page);
    }

    @observable private webUserData: any;
    @observable private webUserContactData: any;

    constructor(props: any) {
        super(props);

        let { cApp } = this.controller;
        let { firstName, gender, salutation, organizationName, departmentName, telephone, mobile, email } = cApp.currentUser;
        this.webUserData = {
            firstName: firstName,
            gender: gender,
            salutation: salutation,
            organizationName: organizationName,
            departmentName: departmentName
        };

        this.webUserContactData = {
            telephone: telephone,
            mobile: mobile,
            email: email
        }
    }

    private onWebUserChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.webUserData[name] = newValue;
        await this.controller.changeWebUser(this.webUserData);
    }

    private onWebUserContactChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.webUserContactData[name] = newValue;
        await this.controller.changeWebUserContact(this.webUserContactData);
    }

    private page = () => {
        return <Page header="首次下单补充个人信息">
            <div className="alert alert-primary small" role="alert">
                化学品是受国家安全法规限制的特殊商品，百灵威提供技术咨询、资料以及化学产品的对象必须是具有化学管理和应用能力的专业单位（非个人）。
                为此，需要您重新提供非虚拟的、可核查的信息。这些信息包括下面所有带有 <span className="text-danger">*</span> 的信息。
            </div>
            <Edit schema={webUserSchema} uiSchema={webUserUiSchema}
                data={this.webUserData}
                onItemChanged={this.onWebUserChanged} />
            <Edit schema={webUserContactSchema} uiSchema={webUserContactUiSchema}
                data={this.webUserContactData}
                onItemChanged={this.onWebUserContactChanged} />
        </Page>;
    }
}