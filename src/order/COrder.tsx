import * as React from 'react';
import { TuidMain, Map, Sheet } from 'tonva-react-usql';
import { CCartApp, cCartApp } from 'home/CCartApp';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { CUser } from 'customer/CPerson';
import { observable } from 'mobx';
import * as _ from 'lodash';
import { Controller } from 'tonva-tools';

export class COrder extends Controller {

    @observable orderData: Order = new Order();
    private webUserCustomerMap: Map;
    private webUserConsigneeContactMap: Map;

    private customerConsigneeContactMap: Map;
    private orderSheet: Sheet;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        let { cUsqWebUser, cUsqCustomer, cUsqOrder } = cCartApp;
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

        this.orderData.webUser = this.user.id;
        let userMap: any = await this.webUserCustomerMap.obj({ webUser: this.user.id });

        let contactArr: any;
        if (userMap !== undefined) {
            contactArr = await this.customerConsigneeContactMap.table({ customer: userMap.customer.id });
            this.orderData.customer = userMap.customer;
        } else {
            contactArr = await this.webUserConsigneeContactMap.table({ userMap: this.user.id });
        }
        if (contactArr) {
            let contactWapper = contactArr.find((element: any) => {
                if (element.isDefault === true)
                    return element;
            });
            if (!contactWapper)
                contactWapper = contactArr[0];
            this.setContact(contactWapper && contactWapper.address);
        }

        if (cartItem !== undefined) {
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

        this.orderData.deliveryContact = contactBox;
    }

    submitOrder = async () => {

        if (!this.orderData.deliveryContact) {
            this.openContactList();
            return;
        }
        await this.orderSheet.loadSchema();
        await this.orderSheet.save("", this.orderData);
    }

    openContactList = () => {

        let cPerson = new CUser(cCartApp, undefined);
        cPerson.start();
    }
}