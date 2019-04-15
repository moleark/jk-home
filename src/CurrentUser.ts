import { User, loadAppUqs } from 'tonva-tools';
import { Map, BoxId, CUq, Tuid } from 'tonva-react-uq';

export class WebUser {

    id: number;
    name: string;
    nick?: string;
    icon?: string;
    guest: number;
    token: string;

    firstName: string;
    gender: string;
    salutation: string;
    organizationName: string;
    departmentName: string;

    private _user: User;

    private webUserTuid: Tuid;
    private webUserCustomerMap: Map;
    private webUserContactMap: Map;
    private webUserSettingMap: Map;

    private cUsqCustomer: CUq;

    constructor(cUsqWebUser: CUq, cUsqCustomer: CUq) {
        this.webUserTuid = cUsqWebUser.tuid("webUser");
        this.webUserCustomerMap = cUsqWebUser.map('webUserCustomer');
        this.webUserContactMap = cUsqWebUser.map('webUserContacts');
        this.webUserSettingMap = cUsqWebUser.map('webUserSetting');
        this.cUsqCustomer = cUsqCustomer;
    }

    setUser = async (user: User) => {
        if (user !== undefined) {
            this._user = user;
            this.id = user.id;
            this.name = user.name;
            this.nick = user.nick;
            this.icon = user.icon;
            this.guest = user.guest;
            this.token = user.token;

            await this.loadWebUser();
        }
    }

    private async loadWebUser() {
        if (this._user !== undefined) {
            let webUser = await this.webUserTuid.load(this.id);
            if (webUser) {
                let { firstName, gender, salutation, organizationName, departmentName } = webUser;
                this.firstName = firstName;
                this.gender = gender;
                this.salutation = salutation;
                this.organizationName = organizationName;
                this.departmentName = departmentName;
            }
            let value = await this.webUserCustomerMap.obj({ webUser: this.id });
            if (value != undefined)
                this.currentCustomer = new Customer(value.customer, this.cUsqCustomer);
        }
    }

    get isLogined(): boolean {
        return this._user !== undefined;
    }
    get hasCustomer(): boolean {
        return this.currentCustomer !== undefined;
    }
    currentCustomer: Customer;

    async getContacts(): Promise<any[]> {

        if (this.currentCustomer !== undefined) {
            return await this.currentCustomer.getContacts()
        }
        return await this.webUserContactMap.table({ webUser: this.id });
    }

    async addContact(contactId: number) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.addContact(contactId);
            return;
        }
        await this.webUserContactMap.add({ webUser: this.id, arr1: [{ contact: contactId }] });
    }

    async delContact(contactId: number) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.delContact(contactId);
            return;
        }
        await this.webUserContactMap.del({ webUser: this.id, arr1: [{ contact: contactId }] });
    }

    async getSetting() {
        return await this.webUserSettingMap.obj({ webUser: this.id });
    }

    async setDefaultShippingContact(contactId: number) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.setDefaultShippingContact(contactId);
            return;
        }
        await this.webUserSettingMap.add({ webUser: this.id, shippingContact: contactId });
    }

    /*
    async unsetDefaultShippingContact() {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.unsetDefaultShippingContact();
            return;
        }
        await this.webUserSettingMap.del?();
    }
    */

    async setDefaultInvoiceContact(contactId: number) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.setDefaultInvoiceContact(contactId);
            return;
        }
        await this.webUserSettingMap.add({ webUser: this.id, arr1: [{ invoiceContact: contactId }] });
    }

    async changeWebUser(webUser: any) {
        await this.webUserTuid.save(this.id, webUser);
        await this.loadWebUser();
    }
};

export class Customer {

    private contactMap: Map;
    id: number;

    private customerSettingMap: Map;

    constructor(customer: BoxId, cUsqCustomer: CUq) {
        this.id = customer.id;
        this.contactMap = cUsqCustomer.map('customerContacts');
        this.customerSettingMap = cUsqCustomer.map('customerSetting');
    };

    async getContacts(): Promise<any[]> {
        return await this.contactMap.table({ customer: this.id });
    }

    async addContact(contactId: number) {
        await this.contactMap.add({ customer: this.id, arr1: [{ contact: contactId }] });
    }

    async delContact(contactId: number) {
        await this.contactMap.del({ customer: this.id, arr1: [{ contact: contactId }] });
    }

    async getSetting() {
        return await this.customerSettingMap.obj({ customer: this.id });
    }

    async setDefaultShippingContact(contactId: number) {
        await this.customerSettingMap.add({ customer: this.id, arr1: [{ defaultShippingContact: contactId }] });
    }

    async setDefaultInvoiceContact(contactId: number) {
        await this.customerSettingMap.add({ customer: this.id, arr1: [{ defaultInvoiceContact: contactId }] });
    }
}