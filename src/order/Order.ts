import { BoxId } from 'tonva-react-usql';
import { observable, computed } from 'mobx';
import { PackItem } from '../tools';

export class Order {

    webUser: any;
    organization: BoxId;
    customer: BoxId;

    @observable shippingContact: BoxId;
    @observable invoiceContact: BoxId;
    @observable orderItems: OrderItem[] = [];

    @computed get amount() {
        return this.orderItems.reduce((pv, cv) => pv + cv.subAmount, 0);
    };
    currency: BoxId;

    getDataForSave() {
        let orderItems: any[] = [];
        this.orderItems.forEach(oi => {
            oi.packs.forEach(pk => {
                this.currency = pk.currency;
                orderItems.push({
                    product: oi.product, pack: pk.pack, price: pk.price, quantity: pk.quantity
                    , subAmount: pk.quantity * pk.price
                })
            })
        });
        return {
            webUser: this.webUser,
            organization: this.organization,
            customer: this.customer,
            shippingContact: this.shippingContact,
            invoiceContact: this.invoiceContact,
            amount: this.amount,
            currency: this.currency,
            orderItems: orderItems,
        }
    }
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