import { BoxId } from 'tonva-react-usql';
import { observable, computed } from 'mobx';

export class Order {

    organization: BoxId;
    person: BoxId;

    @observable deliveryAddress: BoxId;
    invoiceAddress: BoxId;
    @observable products: OrderItem[] = [];
}

export class OrderItem {

    porduct: BoxId;
    pack: BoxId;

    @observable price: number;
    @observable quantity: number;
    @computed get Amount() {
        return this.price * this.quantity;
    }
}