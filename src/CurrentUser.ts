import { UserInNav, User } from 'tonva-tools';
import { Map, BoxId, CUsq } from 'tonva-react-usql';

export class WebUser {

    id: number;
    name: string;
    nick?: string;
    icon?: string;
    guest: number;
    token: string;
    private _user: User;

    private webUserCustomerMap: Map;
    private webUserShippingContactMap: Map;
    private webUserInvoiceContactMap: Map;

    constructor(cUsqWebUser: CUsq) {
        this.webUserCustomerMap = cUsqWebUser.map('webUserCustomer');
        this.webUserShippingContactMap = cUsqWebUser.map('webUserConsigneeContact');
        this.webUserInvoiceContactMap = cUsqWebUser.map('webUserInvoiceContact');
    }

    set user(user: User) {
        if (user !== undefined) {
            this._user = user;
            this.id = user.id;
            this.name = user.name;
            this.nick = user.nick;
            this.icon = user.icon;
            this.guest = user.guest;
            this.token = user.token;

            if (this._user !== undefined) {
                this.webUserCustomerMap.obj({ webUser: this.id })
                    .then((value) => {
                        if (value != undefined)
                            this.currentCustomer = new Customer(value.Customer);
                    })
            }
        }
    }

    get isLogined(): boolean {
        return this._user !== undefined;
    }
    get hasCustomer(): boolean {
        return this.currentCustomer !== undefined;
    }
    currentCustomer: Customer;

    async getShippingContacts(): Promise<any[]> {

        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.getShippingContacts()
        }
        return this.webUserShippingContactMap.table({ webUser: this.id });
    }

    async addShippingContact(contactId: number) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.addShippingContact(contactId);
        }
        await this.webUserShippingContactMap.add({ webUser: this.id, arr1: [{ contact: contactId }] });
    }

    async delShippingContact(contactId: number) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.delShippingContact(contactId);
        }
        await this.webUserShippingContactMap.del({ webUser: this.id, arr1: [{ contact: contactId }] });
    }

    async getInvoiceContacts(): Promise<any[]> {

        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.getInvoiceContacts()
        }
        return this.webUserInvoiceContactMap.table({ webUser: this.id });
    }

    async addInvoiceContact(contactId: number) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.addInvoiceContact(contactId);
        }
        await this.webUserInvoiceContactMap.add({ webUser: this.id, arr1: [{ contact: contactId }] });
    }

    async delInvoiceContact(contactId: number) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.delInvoiceContact(contactId);
        }
        await this.webUserInvoiceContactMap.del({ webUser: this.id, arr1: [{ contact: contactId }] });
    }
};

export class Customer {

    private shippingContactMap: Map;
    private invoiceContactMap: Map;
    id: number;

    constructor(customer: BoxId) {
        // let { cUsqCustomer } = cCartApp;
        // this.consigneeContactMap = cUsqCustomer.map('customerConsigneeContact');
    };

    async getShippingContacts(): Promise<any[]> {
        return await this.shippingContactMap.table({ customer: this.id });
    }

    async addShippingContact(contactId: number) {
        await this.shippingContactMap.add({ webUser: this.id, arr1: [{ contact: contactId }] });
    }

    async delShippingContact(contactId: number) {
        await this.shippingContactMap.del({ webUser: this.id, arr1: [{ contact: contactId }] });
    }

    async getInvoiceContacts(): Promise<any[]> {
        return await this.invoiceContactMap.table({ customer: this.id });
    }

    async addInvoiceContact(contactId: number) {
        await this.invoiceContactMap.add({ webUser: this.id, arr1: [{ contact: contactId }] });
    }

    async delInvoiceContact(contactId: number) {
        await this.invoiceContactMap.del({ webUser: this.id, arr1: [{ contact: contactId }] });
    }
}