import * as React from 'react';
import { ControllerUsq, CUsq, TuidMain, Map, Sheet } from 'tonva-react-usql';
import { CCartApp } from 'home/CCartApp';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { CPerson } from 'customer/CPerson';
import { observable } from 'mobx';
import * as _ from 'lodash';
import { Controller } from 'tonva-tools';

export class COrder extends Controller {

    cApp: CCartApp;

    @observable orderData: Order = new Order();
    private personTuid: TuidMain;
    private consigneeContactMap: Map;
    private orderSheet: Sheet;

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUsqCustomer, cUsqOrder } = this.cApp;
        this.personTuid = cUsqCustomer.tuid('person');
        this.consigneeContactMap = cUsqCustomer.map('personConsigneeContact');
        this.orderSheet = cUsqOrder.sheet('order');
    }

    protected async internalStart(param: any) {

        let cart = param;
        await this.createOrderFromCart(cart);
        this.showVPage(VCreateOrder);
    }

    private createOrderFromCart = async (cartItem: any[]) => {

        this.orderData.person = await this.personTuid.load(this.user.id);

        let contactArr = await this.consigneeContactMap.table({ person: this.user.id });
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
            this.orderData.products = cartItem.map((element: any, index: number) => {
                var item = new OrderItem();
                item.product = element.pack.obj.$owner;
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

        let cPerson = new CPerson(this.cApp, undefined);
        cPerson.start(this.user.id);
    }
}