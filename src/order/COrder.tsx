import { observable } from 'mobx';
import { Sheet, BoxId } from 'tonva-react-uq';
import { Controller, nav } from 'tonva-tools';
import { CCartApp } from 'CCartApp';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { OrderSuccess } from './OrderSuccess';
import { CSelectShippingContact, CSelectInvoiceContact, CSelectContact } from 'customer/CSelectContact';

/*
export enum ContactType {
    ShippingContact = "ShippingContact",
    InvoiceContact = "InvoiceContact",
}
*/

export class COrder extends Controller {
    private cApp: CCartApp;
    @observable orderData: Order = new Order();
    private orderSheet: Sheet;

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUqOrder } = cApp;
        this.orderSheet = cUqOrder.sheet('order');
    }

    protected async internalStart(param: any) {
        let cart = param;
        await this.createOrderFromCart(cart);
        this.openVPage(VCreateOrder);
    }

    private createOrderFromCart = async (cartItem: any[]) => {
        let { currentUser } = this.cApp;
        this.orderData.webUser = currentUser.id;
        if (currentUser.currentCustomer !== undefined) {
            this.orderData.customer = currentUser.currentCustomer.id;
        }

        if (this.orderData.shippingContact === undefined) {
            this.orderData.shippingContact = await this.getDefaultShippingContact();
            //this.shippingAddressIsBlank = false;
        }

        if (this.orderData.invoiceContact === undefined) {
            this.orderData.invoiceContact = await this.getDefaultInvoiceContact();
            //this.invoiceAddressIsBlank = false;
        }

        if (cartItem !== undefined && cartItem.length > 0) {
            this.orderData.currency = cartItem[0].currency;
            this.orderData.orderItems = cartItem.map((element: any, index: number) => {
                var item = new OrderItem();
                item.product = element.product;
                item.packs = element.packs.filter(v => v.quantity > 0);
                //item.price = element.price;
                //item.quantity = element.quantity;
                return item;
            });

            // 运费和运费减免
        }
    }

    private defaultSetting: any;
    private async getDefaultSetting() {
        if (this.defaultSetting) return this.defaultSetting;
        let { currentUser } = this.cApp;
        return this.defaultSetting = await currentUser.getSetting() || {};
    }

    private contact0: BoxId;
    private async getContact(): Promise<BoxId> {
        if (this.contact0 === null) return;
        if (this.contact0 !== undefined) return this.contact0;
        let { currentUser } = this.cApp;
        let contactArr = await currentUser.getContacts();
        if (contactArr === undefined || contactArr.length === 0) {
            this.contact0 = null;
            return;
        }
        return this.contact0 = contactArr[0].contact;
    }

    private async getDefaultShippingContact() {
        let defaultSetting = await this.getDefaultSetting();
        return defaultSetting.defaultShippingContact || await this.getContact();
    }

    private async getDefaultInvoiceContact() {
        let defaultSetting = await this.getDefaultSetting();
        return defaultSetting.defaultInvoiceContact || await this.getContact();
    }

    /*
    setContact = (contactBox: BoxId, contactType: ContactType) => {
        if (contactType === ContactType.ShippingContact) {
            this.orderData.shippingContact = contactBox;
            //this.shippingAddressIsBlank = false;
        } else {
            this.orderData.invoiceContact = contactBox;
            //this.invoiceAddressIsBlank = false;
        }
    }
    */
    submitOrder = async () => {
        let { orderItems } = this.orderData;

        let result: any = await this.orderSheet.save("order", this.orderData.getDataForSave());
        await this.orderSheet.action(result.id, result.flow, result.state, "submit");

        let { cartViewModel, cartService } = this.cApp;
        let param: [{ productId: number, packId: number }] = [] as any;
        orderItems.forEach(e => {
            e.packs.forEach(v => {
                param.push({ productId: e.product.id, packId: v.pack.id })
            })
        });
        cartService.removeFromCart(cartViewModel, param);
        // 打开订单显示界面
        nav.popTo(this.cApp.topKey);
        this.openVPage(OrderSuccess, result);
    }

    private onSelectContact = async (
        typeSelectContact: new (cApp: CCartApp, res: any) => CSelectContact,
        setDefaultContact: (contactId: number) => Promise<void>
    ) => {
        //this.cApp.cSelectContact.start(contactType);
        /*
        let typeSelectContact:new (cApp:CCartApp, res:any)=>CSelectContact;
        let setDefaultContact: (contactId:number) => Promise<void>;
        switch (contactType) {
            default: throw 'impossible';
            case ContactType.ShippingContact:
                typeSelectContact = CSelectShippingContact;
                setDefaultContact = async (contactId:number) => await currentUser.setDefaultShippingContact(contactId);
                break;
            case ContactType.InvoiceContact:
                typeSelectContact = CSelectInvoiceContact;
                setDefaultContact = async (contactId:number) => await currentUser.setDefaultInvoiceContact(contactId);
                break;
        }
        */
        let cSelectContact = new typeSelectContact(this.cApp, undefined);
        let contact = await cSelectContact.call<any>();
        if (contact === undefined) return;

        let contactId = contact.id;
        let { currentUser } = this.cApp;
        await currentUser.addContact(contactId);
        if (contact.isDefault === true) {
            setDefaultContact(contactId);
        }
        if (contactId !== undefined) {
            // 为什么要删除contact???!!!
            // currentUser.delContact(contactId);
        }
    }

    onSelectShippingContact = async () => {
        let { currentUser } = this.cApp;
        let setDefaultContact: (contactId: number) => Promise<void>;
        let typeSelectContact: new (cApp: CCartApp, res: any) => CSelectContact = CSelectShippingContact;
        setDefaultContact = async (contactId: number) => await currentUser.setDefaultShippingContact(contactId);
        await this.onSelectContact(typeSelectContact, setDefaultContact);
    }

    onSelectInvoiceContact = async () => {
        let { currentUser } = this.cApp;
        let setDefaultContact: (contactId: number) => Promise<void>;
        let typeSelectContact: new (cApp: CCartApp, res: any) => CSelectContact = CSelectInvoiceContact;
        setDefaultContact = async (contactId: number) => await currentUser.setDefaultInvoiceContact(contactId);
        await this.onSelectContact(typeSelectContact, setDefaultContact);
    }
}
