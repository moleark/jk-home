import * as React from 'react';
import { TuidMain, Map, Sheet, BoxId } from 'tonva-react-uq';
import { CCartApp } from 'CCartApp';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { observable } from 'mobx';
import * as _ from 'lodash';
import { Controller } from 'tonva-tools';
import { OrderSuccess } from './OrderSuccess';

export enum ContactType {
    ShippingContact = "ShippingContact",
    InvoiceContact = "InvoiceContact",
}

export class COrder extends Controller {
    private cApp: CCartApp;
    @observable orderData: Order = new Order();
    private orderSheet: Sheet;

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUsqOrder } = cApp;
        this.orderSheet = cUsqOrder.sheet('order');
    }

    protected async internalStart(param: any) {

        let cart = param;
        await this.createOrderFromCart(cart);
        this.showVPage(VCreateOrder);
    }

    private createOrderFromCart = async (cartItem: any[]) => {

        this.orderData.webUser = this.cApp.currentUser.id;
        this.orderData.customer = this.cApp.currentUser.currentCustomer.id;
        let defaultSetting = undefined;

        if (this.orderData.shippingContact === undefined) {
            defaultSetting = this.cApp.currentUser.getSetting();
            if (defaultSetting.defaultShippingContact) {
                this.setContact(defaultSetting.defaultShippingContact, ContactType.ShippingContact);
            } else {
                let contactArr: any[] = await this.cApp.currentUser.getContacts();
                if (contactArr && contactArr.length > 0) {
                    this.setContact(contactArr[0].contact, ContactType.ShippingContact);
                }
            }
        }

        if (this.orderData.invoiceContact === undefined) {
            if (defaultSetting === undefined) {
                defaultSetting = this.cApp.currentUser.getSetting();
            }
            if (defaultSetting.defaultInvoiceContact) {
                this.setContact(defaultSetting.defaultInvoiceContact, ContactType.InvoiceContact);
            } else {
                let contactArr: any[] = await this.cApp.currentUser.getContacts();
                if (contactArr && contactArr.length > 0) {
                    this.setContact(contactArr[0].contact, ContactType.InvoiceContact);
                }
            }
        }

        if (cartItem !== undefined && cartItem.length > 0) {
            this.orderData.currency = cartItem[0].currency;
            this.orderData.orderItems = cartItem.map((element: any, index: number) => {
                var item = new OrderItem();
                item.product = element.product;
                item.packs = element.packs.filter(v => v.quantity > 0);
                //item.price = element.price;
                //item.quantity = element.quantity;
                return item;
            });

            // 运费和运费减免
        }
    }

    setContact = (contactBox: BoxId, contactType: ContactType) => {
        if (contactType === ContactType.ShippingContact)
            this.orderData.shippingContact = contactBox;
        else
            this.orderData.invoiceContact = contactBox;
    }

    submitOrder = async () => {

        if (!this.orderData.shippingContact) {
            this.openContactList(ContactType.ShippingContact);
            return;
        }
        if (!this.orderData.invoiceContact) {
            this.openContactList(ContactType.InvoiceContact);
            return;
        }

        let result: any = await this.orderSheet.save("order", this.orderData.getDataForSave());
        await this.orderSheet.action(result.id, result.flow, result.state, "submit");

        this.cApp.cart.clear(); //.removeFromCart(this.orderData.orderItems);

        // 打开订单显示界面
        this.closePage(1);
        this.showVPage(OrderSuccess, result);
    }

    openContactList = (contactType: ContactType) => {

        this.cApp.cUser.start(contactType);
    }
}