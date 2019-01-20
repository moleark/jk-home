import * as React from 'react';
import { TuidMain, Map, Sheet, BoxId } from 'tonva-react-usql';
import { CCartApp } from 'CCartApp';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { observable } from 'mobx';
import * as _ from 'lodash';
import { Controller } from 'tonva-tools';
import { OrderSuccess } from './OrderSuccess';

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
        // this.orderData.customer = cCartApp.currentUser.currentCustomer;

        if (this.orderData.shippingContact === undefined) {

            let contactArr: any[] = await this.cApp.currentUser.getShippingContacts();
            if (contactArr && contactArr.length > 0) {
                let contactWapper = contactArr.find((element: any) => {
                    if (element.isDefault === true)
                        return element;
                });
                if (!contactWapper)
                    contactWapper = contactArr[0];
                this.setContact(contactWapper.contact);
            }
        }

        if (cartItem !== undefined && cartItem.length > 0) {
            this.orderData.currency = cartItem[0].currency;
            this.orderData.orderItems = cartItem.map((element: any, index: number) => {
                var item = new OrderItem();
                item.product = element.product,
                item.packs = element.packs;
                //item.price = element.price;
                //item.quantity = element.quantity;
                return item;
            });
        }
    }

    setContact = (contactBox: BoxId) => {

        this.orderData.shippingContact = contactBox;
    }

    submitOrder = async () => {

        if (!this.orderData.shippingContact) {
            this.openContactList();
            return;
        }

        let result: any = await this.orderSheet.save("order", this.orderData);
        await this.orderSheet.action(result.id, result.flow, result.state, "submit");

        this.cApp.cCart.cart.clear(); //.removeFromCart(this.orderData.orderItems);

        // 打开订单显示界面
        this.closePage(1);
        this.showVPage(OrderSuccess, result);
    }

    openContactList = () => {

        this.cApp.cUser.start();
    }
}