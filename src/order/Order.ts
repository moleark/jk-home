import { BoxId } from 'tonva-react-usql';
import { observable, computed } from 'mobx';

export class Order {

    webUser: any;
    organization: BoxId;
    customer: BoxId;

    @observable deliveryContact: any = {};
    invoiceContact: BoxId;
    @observable orderItems: OrderItem[] = [];

    getPostData() {
        return {
            webUser: this.webUser,
            organization: this.organization && this.organization.id,
            customer: this.customer && this.customer.id,
            orderitems: this.orderItems.map((orderItem: OrderItem) => {
                return {
                    product: orderItem.product.id,
                    pack: orderItem.pack.id,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    amount: orderItem.amount,
                }
            }),
            deliveryOrderContact: this.deliveryContact.id
        }
    }
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