import * as React from 'react';
import { TuidMain, Map, Sheet } from 'tonva-react-usql';
import { CCartApp } from 'CCartApp';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { CUser } from 'customer/CPerson';
import { observable } from 'mobx';
import * as _ from 'lodash';
import { Controller } from 'tonva-tools';
import { OrderSuccess } from './OrderSuccess';

export class COrder extends Controller {
    private cApp: CCartApp;
    @observable orderData: Order = new Order();
    private webUserCustomerMap: Map;
    private webUserConsigneeContactMap: Map;

    private customerConsigneeContactMap: Map;
    private orderSheet: Sheet;

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUsqWebUser, cUsqCustomer, cUsqOrder } = cApp;
        this.webUserCustomerMap = cUsqWebUser.map('webUserCustomer');
        this.webUserConsigneeContactMap = cUsqWebUser.map('webUserConsigneeContact');
        this.customerConsigneeContactMap = cUsqCustomer.map('customerConsigneeContact');
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

        if (this.orderData.deliveryContact === undefined) {

            let contactArr: any[] = await this.cApp.currentUser.getConsigneeContacts();
            if (contactArr && contactArr.length > 0) {
                let contactWapper = contactArr.find((element: any) => {
                    if (element.isDefault === true)
                        return element;
                });
                if (!contactWapper)
                    contactWapper = contactArr[0];
                this.setContact(contactWapper.contact.obj);
            }
        }

        if (cartItem !== undefined && cartItem.length > 0) {
            this.orderData.currency = cartItem[0].currency;
            this.orderData.orderItems = cartItem.map((element: any, index: number) => {
                var item = new OrderItem();
                item.product = element.product,
                item.pack = element.pack;
                item.price = element.price;
                item.quantity = element.quantity;
                return item;
            });
        }
    }

    setContact = (contactBox: any) => {

        this.orderData.deliveryContact = { ...contactBox };
    }

    submitOrder = async () => {

        if (!this.orderData.deliveryContact) {
            this.openContactList();
            return;
        }
        let postOrder = this.orderData.getPostData();
        await this.orderSheet.loadSchema();
        let result: any = await this.orderSheet.save("", postOrder);
        await this.orderSheet.action(result.id, result.flow, result.state, "submit");
        this.cApp.cCart.cart.removeFromCart(this.orderData.orderItems);

        // 打开订单显示界面
        this.closePage(1);
        this.showVPage(OrderSuccess, result);
    }

    openContactList = () => {

        this.cApp.cUser.start();
    }
}