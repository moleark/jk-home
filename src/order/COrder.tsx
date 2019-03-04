import * as React from 'react';
import { Sheet, BoxId } from 'tonva-react-uq';
import { CCartApp } from 'CCartApp';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { observable } from 'mobx';
import { Controller, nav } from 'tonva-tools';
import { OrderSuccess } from './OrderSuccess';
import { getPackedSettings } from 'http2';

export enum ContactType {
    ShippingContact = "ShippingContact",
    InvoiceContact = "InvoiceContact",
}

const blankTime = 2000;

export class COrder extends Controller {
    private cApp: CCartApp;
    @observable orderData: Order = new Order();
    @observable useShippingAddress: boolean = true;
    @observable shippingAddressIsBlank: boolean = false;
    @observable invoiceAddressIsBlank: boolean = false;

    private orderSheet: Sheet;

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUqOrder } = cApp;
        this.orderSheet = cUqOrder.sheet('order');
    }

    protected async internalStart(param: any) {

        let cart = param;
        await this.createOrderFromCart(cart);
        this.openVPage(VCreateOrder);
    }

    private createOrderFromCart = async (cartItem: any[]) => {
        let { currentUser } = this.cApp;
        this.orderData.webUser = currentUser.id;
        if (currentUser.currentCustomer !== undefined)
            this.orderData.customer = currentUser.currentCustomer.id;
        let defaultSetting = undefined;

        if (this.orderData.shippingContact === undefined) {
            defaultSetting = currentUser.getSetting();
            if (defaultSetting.defaultShippingContact) {
                this.setContact(defaultSetting.defaultShippingContact, ContactType.ShippingContact);
            } else {
                let contactArr: any[] = await currentUser.getContacts();
                if (contactArr && contactArr.length > 0) {
                    this.setContact(contactArr[0].contact, ContactType.ShippingContact);
                }
            }
        }

        if (this.orderData.invoiceContact === undefined) {
            if (defaultSetting === undefined) {
                defaultSetting = currentUser.getSetting();
            }
            if (defaultSetting.defaultInvoiceContact) {
                this.setContact(defaultSetting.defaultInvoiceContact, ContactType.InvoiceContact);
            } else {
                let contactArr: any[] = await currentUser.getContacts();
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
        if (contactType === ContactType.ShippingContact) {
            this.orderData.shippingContact = contactBox;
            this.shippingAddressIsBlank = false;
        } else {
            this.orderData.invoiceContact = contactBox;
            this.invoiceAddressIsBlank = false;
        }
    }

    submitOrder = async () => {

        let { shippingContact, invoiceContact, orderItems } = this.orderData;
        if (!shippingContact) {
            this.shippingAddressIsBlank = true;
            setTimeout(() => this.shippingAddressIsBlank = false, blankTime);
            return;
        }
        if (!invoiceContact) {
            if (this.useShippingAddress) {
                this.setContact(shippingContact, ContactType.InvoiceContact);
            } else {
                this.invoiceAddressIsBlank = true;
                setTimeout(() => this.invoiceAddressIsBlank = false, blankTime);
                return;
            }
        }

        let result: any = await this.orderSheet.save("order", this.orderData.getDataForSave());
        await this.orderSheet.action(result.id, result.flow, result.state, "submit");

        let { cartViewModel, cartService } = this.cApp;
        let param: [{ productId: number, packId: number }] = [] as any;
        orderItems.forEach(e => {
            e.packs.forEach(v => {
                param.push({ productId: e.product.id, packId: v.pack.id })
            })
        });
        cartService.removeFromCart(cartViewModel, param);
        // 打开订单显示界面
        nav.popTo(this.cApp.topKey);
        this.openVPage(OrderSuccess, result);
    }

    openContactList = (contactType: ContactType) => {

        this.cApp.cUser.start(contactType);
    }
}