import { BoxId } from 'tonva-react-usql';
import { observable, computed } from 'mobx';
import { PackItem } from '../tools';

export class Order {

    webUser: any;
    organization: BoxId;
    customer: BoxId;

    @observable shippingContact: BoxId;
    invoiceContact: BoxId;
    @observable orderItems: OrderItem[] = [];

    @computed get amount() {
        return this.orderItems.reduce((pv, cv) => pv + cv.subAmount, 0);
    };
    currency: BoxId;
}

export class OrderItem {

    product: BoxId;
    @observable packs: PackItem[];
    @computed get subAmount() {
        return this.packs.reduce((p, c) => {
            return p + c.price * c.quantity
        }, 0);
    }
    /*
    pack: BoxId;

    @observable price: number;
    @observable quantity: number;
    @computed get subAmount() {
        return this.price * this.quantity;
    }
    */
}