import { observable } from 'mobx';
import { Sheet, BoxId, Query } from 'tonva-react-uq';
import { Controller, nav } from 'tonva-tools';
import { CCartApp } from 'CCartApp';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { OrderSuccess } from './OrderSuccess';
import { CSelectShippingContact, CSelectInvoiceContact, CSelectContact } from 'customer/CSelectContact';
import { VMyOrders } from './VMyOrders';
import { VOrderDetail } from './VOrderDetail';
import { WebUser } from 'CurrentUser';
import { CInvoiceInfo } from 'customer/CInvoiceInfo';
import { orderItemGroupByProduct } from 'tools/groupByProduct';
import { LoaderProductChemical } from 'product/itemLoader';

export class COrder extends Controller {
    private cApp: CCartApp;
    @observable orderData: Order = new Order();
    private orderSheet: Sheet;
    private getPendingPaymentQuery: Query;
    currentUser: WebUser;

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUqOrder, currentUser } = cApp;
        this.orderSheet = cUqOrder.sheet('order');
        this.getPendingPaymentQuery = cUqOrder.query('getpendingPayment');
        this.currentUser = currentUser;
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
        }

        if (this.orderData.invoiceContact === undefined) {
            this.orderData.invoiceContact = await this.getDefaultInvoiceContact();
        }

        if (this.orderData.invoiceType === undefined) {
            this.orderData.invoiceType = await this.getDefaultInvoiceType();
        }

        if (this.orderData.invoiceInfo === undefined) {
            this.orderData.invoiceInfo = await this.getDefaultInvoiceInfo();
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

    private async getDefaultInvoiceType() {
        let defaultSetting = await this.getDefaultSetting();
        return defaultSetting.invoiceType;
    }

    private async getDefaultInvoiceInfo() {
        let defaultSetting = await this.getDefaultSetting();
        return defaultSetting.invoiceInfo;
    }

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
        // 打开下单成功显示界面
        nav.popTo(this.cApp.topKey);
        this.openVPage(OrderSuccess, result);
    }

    private onSelectContact = async (
        typeSelectContact: new (cApp: CCartApp, res: any, autoSelectMode: boolean) => CSelectContact,
    ) => {
        let cSelectContact = new typeSelectContact(this.cApp, undefined, true);
        let contact = await cSelectContact.call<any>();
        return contact;
    }

    onSelectShippingContact = async () => {
        let typeSelectContact: new (cApp: CCartApp, res: any, autoSelectMode: boolean) => CSelectContact = CSelectShippingContact;
        let contactBox = await this.onSelectContact(typeSelectContact);
        this.orderData.shippingContact = contactBox;
    }

    onSelectInvoiceContact = async () => {
        let typeSelectContact: new (cApp: CCartApp, res: any, autoSelectMode: boolean) => CSelectContact = CSelectInvoiceContact;
        let contactBox = await this.onSelectContact(typeSelectContact);
        this.orderData.invoiceContact = contactBox;
    }

    /*
    */
    openMyOrders = async (state: string) => {

        this.openVPage(VMyOrders, state);
    }

    getMyOrders = async (state: string) => {

        switch (state) {
            case 'pendingpayment':
                return await this.getPendingPaymentQuery.table(undefined);
                break;
            default:
                return await this.orderSheet.mySheets(undefined, 1, 20);
                break;
        }
    }

    onInvoiceInfoEdit = async () => {
        let cInvoiceInfo = new CInvoiceInfo(this.cApp, undefined);
        let { invoiceType, invoiceInfo } = this.orderData;
        let origInvoice = {
            invoiceType: invoiceType,
            invoiceInfo: invoiceInfo,
        }
        let newInvoice = await cInvoiceInfo.call<any>(origInvoice);
        this.orderData.invoiceType = newInvoice.invoiceType;
        this.orderData.invoiceInfo = newInvoice.invoiceInfo;
    }

    openOrderDetail = async (orderId: number) => {

        let order = await this.orderSheet.getSheet(orderId);
        let { data } = order;
        let { orderItems } = data;
        let orderItemsGrouped = orderItemGroupByProduct(orderItems);
        let loaderProduct = new LoaderProductChemical(this.cApp);
        for (let i = 0; i < orderItemsGrouped.length; i++) {
            let productId = orderItemsGrouped[i].product.id;
            orderItemsGrouped[i].product = await loaderProduct.load(productId);
        }
        data.orderItems = orderItemsGrouped;
        this.openVPage(VOrderDetail, order);
    }

    openMeInfo = async () => {
        let { cMe } = this.cApp;
        await cMe.openMeInfoFirstOrder();
    }
}
