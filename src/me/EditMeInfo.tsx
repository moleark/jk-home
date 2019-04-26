import * as React from 'react';
import { observable } from 'mobx';
import { ItemSchema, StringSchema, ImageSchema, UiTextItem, UiImageItem, nav, Page, Edit, UiSchema, VPage } from 'tonva-tools';
import userApi from 'tonva-tools/entry/userApi';
import { CMe } from './CMe';
import { UiInputItem } from 'tonva-tools/ui/form/uiSchema';

export class EditMeInfo extends VPage<CMe>{

    async open(param: any) {
        this.openPage(this.page);
    }

    private schema: ItemSchema[] = [
        { name: 'nick', type: 'string' } as StringSchema,
        { name: 'icon', type: 'image' } as ImageSchema,
    ];
    private uiSchema: UiSchema = {
        items: {
            nick: { widget: 'text', label: '别名', placeholder: '好的别名更方便记忆' } as UiTextItem,
            icon: { widget: 'image', label: '头像' } as UiImageItem,
        }
    }
    @observable private data: any;

    private webUserSchema: ItemSchema[] = [
        { name: 'firstName', type: 'string' } as StringSchema,
        { name: 'gender', type: 'string' } as StringSchema,
        { name: 'salutation', type: 'string' } as StringSchema,
        { name: 'organizationName', type: 'string' } as StringSchema,
        { name: 'departmentName', type: 'string' } as StringSchema,
    ];
    private webUserUiSchema: UiSchema = {
        items: {
            firstName: { widget: 'text', label: '真实姓名', placeholder: '化学品是受国家安全法规限制的特殊商品，百灵威提供技术咨询、资料以及化学产品的对象必须是具有化学管理和应用能力的专业单位（非个人）。为此，需要您重新提供非虚拟的、可核查的信息。' } as UiTextItem,
            gender: { widget: 'text', label: '性别' } as UiTextItem,
            salutation: { widget: 'text', label: '称谓' } as UiTextItem,
            organizationName: { widget: 'text', label: '单位名称' } as UiTextItem,
            departmentName: { widget: 'text', label: '部门名称' } as UiTextItem,
        }
    }
    @observable private webUserData: any;

    // 个人联系方式信息
    private webUserContactSchema: ItemSchema[] = [
        { name: 'telephone', type: 'string' } as StringSchema,
        { name: 'mobile', type: 'string' } as StringSchema,
        { name: 'email', type: 'string' } as StringSchema,
    ];
    private webUserContactUiSchema: UiSchema = {
        items: {
            telephone: { widget: 'text', label: '固定电话' } as UiTextItem,
            mobile: { widget: 'text', label: '移动电话' } as UiTextItem,
            email: {
                widget: 'text', label: 'Email',
                rules: (value: any) => {
                    if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))
                        return "Email格式不正确。";
                    else
                        return undefined;
                },
                placeholder: 'Email'
            } as UiInputItem,
        }
    }
    @observable private webUserContactData: any;

    constructor(props: any) {
        super(props);
        let { nick, icon } = nav.user;
        this.data = {
            nick: nick,
            icon: icon,
        };

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

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        await userApi.userSetProp(name, newValue);
        this.data[name] = newValue;
        nav.user[name] = newValue;
        nav.saveLocalUser();
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
        return <Page header="个人信息">
            <Edit schema={this.schema} uiSchema={this.uiSchema}
                data={this.data}
                onItemChanged={this.onItemChanged} />
            <Edit schema={this.webUserSchema} uiSchema={this.webUserUiSchema}
                data={this.webUserData}
                onItemChanged={this.onWebUserChanged} />
            <Edit schema={this.webUserContactSchema} uiSchema={this.webUserContactUiSchema}
                data={this.webUserContactData}
                onItemChanged={this.onWebUserContactChanged} />
        </Page>;
    }
}
