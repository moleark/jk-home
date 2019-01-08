import { BoxId } from 'tonva-react-usql';
import { observable, computed } from 'mobx';

export class Order {

    webUser: any;
    organization: BoxId;
    customer: BoxId;

    @observable deliveryContact: any = {};
    invoiceContact: BoxId;
    @observable orderItems: OrderItem[] = [];
}

export class OrderItem {

    product: BoxId;
    pack: BoxId;

    @observable price: number;
    @observable quantity: number;
    @computed get amount() {
        return this.price * this.quantity;
    }
}