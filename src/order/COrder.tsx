import * as React from 'react';
import { ControllerUsq, CUsq, TuidMain, Map, Sheet } from 'tonva-react-usql';
import { CCartApp } from 'home/CCartApp';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { CPerson } from 'customer/CPerson';
import { observable } from 'mobx';
import * as _ from 'lodash';

export class COrder extends ControllerUsq {

    cApp: CCartApp;

    @observable orderData: Order = new Order();
    private personTuid: TuidMain;
    private consigneeContactMap: Map;
    private orderSheet: Sheet;

    constructor(cApp: CCartApp, cUsq: CUsq, res: any) {
        super(cUsq, res);
        this.cApp = cApp;

        this.personTuid = this.cUsq.tuid('person');
        this.consigneeContactMap = this.cUsq.map('personConsigneeContact');
        this.orderSheet = this.cUsq.sheet('order');
    }

    protected async internalStart(param: any) {

        let cart = param;
        await this.createOrderFromCart(cart);
        this.showVPage(VCreateOrder);
    }

    private createOrderFromCart = async (cartItem: any[]) => {

        this.orderData.person = await this.personTuid.load(this.user.id);

        let addressArr = await this.consigneeContactMap.table({ _person: this.user.id });
        if (addressArr) {
            let addressWapper = addressArr.find((element: any) => {
                if (element.isDefault === true)
                    return element;
            });
            if (!addressWapper)
                addressWapper = addressArr[0];
            this.setAddress(addressWapper && addressWapper.address);
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

    setAddress = (contactBox: any) => {

        this.orderData.deliveryContact = contactBox;
    }

    submitOrder = async () => {

        if (!this.orderData.deliveryContact) {
            this.openAddressList();
            return;
        }
        await this.orderSheet.loadSchema();
        await this.orderSheet.save("", this.orderData);
    }

    openAddressList = () => {

        let cPerson = new CPerson(this.cApp, this.cUsq, undefined);
        cPerson.start(this.user.id);
    }
}