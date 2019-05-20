import { BoxId } from 'tonva';
import { observable, computed } from 'mobx';
import { CartPackRow } from 'cart/Cart';

export class Order {

    webUser: any;
    organization: BoxId;
    customer: any;

    @observable shippingContact: BoxId;
    @observable invoiceContact: BoxId;
    @observable invoiceType: BoxId;
    @observable invoiceInfo: BoxId;
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
            invoiceType: this.invoiceType,
            invoiceInfo: this.invoiceInfo,
            amount: this.amount,
            currency: this.currency,
            orderItems: orderItems,
        }
    }
}

export class OrderItem {

    product: BoxId;
    @observable packs: CartPackRow[];
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