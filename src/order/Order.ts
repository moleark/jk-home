import { BoxId } from 'tonva-react-usql';
import { observable, computed } from 'mobx';

export class Order {

    organization: BoxId;
    customer: BoxId;

    @observable deliveryContact: BoxId;
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