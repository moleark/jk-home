import * as React from 'react';
import { ControllerUsq, CUsq, TuidMain, Map, Sheet } from 'tonva-react-usql';
import { CCartApp } from 'home/CCartApp';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { CPerson } from 'customer/CPerson';
import { observable } from 'mobx';

export class COrder extends ControllerUsq {

    cApp: CCartApp;

    @observable orderData: Order = new Order();
    private personTuid: TuidMain;
    private addressMap: Map;
    private orderSheet: Sheet;

    constructor(cApp: CCartApp, cUsq: CUsq, res: any) {
        super(cUsq, res);
        this.cApp = cApp;

        this.personTuid = this.cUsq.tuid('person');
        this.addressMap = this.cUsq.map('personConsigneeAddress');
        this.orderSheet = this.cUsq.sheet('order');
    }

    protected async internalStart(param: any) {

        let cart = param;
        await this.createOrderFromCart(cart);
        this.showVPage(VCreateOrder);
    }

    private createOrderFromCart = async (cartItem: any[]) => {

        this.orderData.person = await this.personTuid.load(1);

        let addressArr = await this.addressMap.table({ _person: 1 });
        if (addressArr) {
            let address = addressArr.find((element: any) => {
                if (element.isDefault === true)
                    return element;
            });
            if (!address)
                address = addressArr[0];
            this.setAddress(address && address.address);
        }

        if (cartItem !== undefined) {
            this.orderData.products = cartItem.map((element: any, index: number) => {
                var item = new OrderItem();
                item.porduct = element.pack.obj.$owner;
                item.pack = element.pack;
                item.price = element.price;
                item.quantity = element.quantity;
                return item;
            });
        }
    }

    setAddress = (addressBox: any) => {

        this.orderData.deliveryAddress = addressBox;
    }

    submitOrder = async () => {

        if (!this.orderData.deliveryAddress) {
            this.openAddressList();
            return;
        }
        await this.orderSheet.loadSchema();
        await this.orderSheet.save("", this.orderData);
    }

    openAddressList = () => {

        let cPerson = new CPerson(this.cApp, this.cUsq, undefined);
        cPerson.start();
    }
}