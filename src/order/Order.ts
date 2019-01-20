import { BoxId } from 'tonva-react-usql';
import { observable, computed } from 'mobx';

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
    pack: BoxId;

    @observable price: number;
    @observable quantity: number;
    @computed get subAmount() {
        return this.price * this.quantity;
    }


}