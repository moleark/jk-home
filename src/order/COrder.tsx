import { observable } from 'mobx';
import { Sheet, BoxId, Query, Action, Tuid, Map } from 'tonva';
import { Controller, nav } from 'tonva';
import { CCartApp } from 'CCartApp';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { OrderSuccess } from './OrderSuccess';
import { CSelectShippingContact, CSelectInvoiceContact, CSelectContact } from 'customer/CSelectContact';
import { VMyOrders } from './VMyOrders';
import { VOrderDetail } from './VOrderDetail';
import { WebUser } from 'CurrentUser';
import { CInvoiceInfo } from 'customer/CInvoiceInfo';
import { groupByProduct } from 'tools/groupByProduct';
import { LoaderProductWithChemical } from 'product/itemLoader';
import { CCoupon } from './CCoupon';
import { CartItem2 } from 'cart/Cart';

const FREIGHTFEEFIXED = 12;
const FREIGHTFEEREMITTEDSTARTPOINT = 100;

export class COrder extends Controller {
    private cApp: CCartApp;
    @observable orderData: Order = new Order();
    private orderSheet: Sheet;
    private getPendingPaymentQuery: Query;
    private priceMap: Map;
    currentUser: WebUser;

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUqOrder, currentUser, cUqSalesTask, cUqProduct } = cApp;
        this.orderSheet = cUqOrder.sheet('order');
        this.getPendingPaymentQuery = cUqOrder.query('getpendingPayment');
        this.priceMap = cUqProduct.map('pricex');
        this.currentUser = currentUser;
    }

    protected async internalStart(param: any) {
        let cart = param;
        await this.createOrderFromCart(cart);
        this.openVPage(VCreateOrder);
    }

    private createOrderFromCart = async (cartItems: CartItem2[]) => {
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

        if (cartItems !== undefined && cartItems.length > 0) {
            this.orderData.currency = cartItems[0].packs[0].currency;
            this.orderData.orderItems = cartItems.map((element: any, index: number) => {
                var item = new OrderItem();
                item.product = element.product;
                item.packs = element.packs.filter(v => v.quantity > 0);
                return item;
            });

            // 运费和运费减免
            this.orderData.freightFee = FREIGHTFEEFIXED;
            if (this.orderData.productAmount > FREIGHTFEEREMITTEDSTARTPOINT)
                this.orderData.freightFeeRemitted = FREIGHTFEEFIXED * -1;
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
        return defaultSetting.shippingContact || await this.getContact();
    }

    private async getDefaultInvoiceContact() {
        let defaultSetting = await this.getDefaultSetting();
        return defaultSetting.invoiceContact || await this.getContact();
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

        let param: [{ productId: number, packId: number }] = [] as any;
        orderItems.forEach(e => {
            e.packs.forEach(v => {
                param.push({ productId: e.product.id, packId: v.pack.id })
            })
        });
        let { cart } = this.cApp;
        cart.removeFromCart(param);

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

    onCouponEdit = async () => {
        let cCoupon = new CCoupon(this.cApp, undefined);
        let coupon = await cCoupon.call<any>(this.orderData.coupon);
        if (coupon) {
            await this.applyCoupon(coupon);
        }
    }

    /**
     *
     */
    applyCoupon = async (coupon: any) => {

        let { id, code, discount, preferential, validitydate, isValid } = coupon;
        if (code !== undefined && isValid === 1 && new Date(validitydate).getTime() > Date.now()) {
            this.orderData.coupon = id;
            if (discount) {
                this.orderData.couponOffsetAmount = Math.round(this.orderData.productAmount * discount) * -1;
                /*
                let { orderItems } = this.orderData;
                if (orderItems !== undefined && orderItems.length > 0) {
                    let promises: PromiseLike<any>[] = [];
                    orderItems.forEach(e => {
                        promises.push(this.priceMap.table({ product: e.product.id, salesRegion: 1 }));
                    });
                    let prices = await Promise.all(promises);

                    for (let i = 0; i < orderItems.length; i++) {
                        let oi = orderItems[i];
                        let eachPrices = prices[i];
                        let { product, packs } = oi;
                        for (let j = 0; j < packs.length; j++) {
                            let pk = packs[j];
                            let price: any = eachPrices.find(
                                p => p.product.id === product.id &&
                                    p.pack.id === pk.pack.id &&
                                    p.discountinued === 0 &&
                                    p.expireDate > Date.now());
                            if (price) {
                                pk.price = Math.round(price.retail * (1 - discount));
                            }
                        };
                    };
                }
                */
            }
            if (preferential) {
                this.orderData.couponRemitted = preferential * -1;
            }
            // 运费和运费减免
            this.orderData.freightFee = FREIGHTFEEFIXED;
            if (this.orderData.productAmount > FREIGHTFEEREMITTEDSTARTPOINT)
                this.orderData.freightFeeRemitted = FREIGHTFEEFIXED * -1;
        }
    }

    removeCoupon = async () => {

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
        let { orderitems } = data;
        let orderItemsGrouped = groupByProduct(orderitems);
        let loaderProduct = new LoaderProductWithChemical(this.cApp);
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

    renderDeliveryTime = (pack: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderDeliveryTime(pack);
    }

    renderOrderItemProduct = (product: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderCartProduct(product);
    }
}
