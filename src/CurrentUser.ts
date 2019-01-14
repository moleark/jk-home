import { UserInNav, User } from 'tonva-tools';
import { Map, BoxId } from 'tonva-react-usql';
import { cCartApp } from 'home/CCartApp';

export class WebUser {

    id: number;
    name: string;
    nick?: string;
    icon?: string;
    guest: number;
    token: string;
    private _user: User;

    private webUserCustomerMap: Map;
    private webUserConsigneeContactMap: Map;

    constructor() {
        let { cUsqWebUser } = cCartApp;
        this.webUserCustomerMap = cUsqWebUser.map('webUserCustomer');
        this.webUserConsigneeContactMap = cUsqWebUser.map('webUserConsigneeContact');
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

    async getConsigneeContacts(): Promise<any[]> {

        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.getConsigneeContacts()
        }
        return this.webUserConsigneeContactMap.table({ webUser: this.id });
    }
};

export class Customer {

    private consigneeContactMap: Map;
    id: number;

    constructor(customer: BoxId) {
        let { cUsqCustomer } = cCartApp;
        this.consigneeContactMap = cUsqCustomer.map('customerConsigneeContact');
    };

    async getConsigneeContacts(): Promise<any[]> {
        return await this.consigneeContactMap.table({ customer: this.id });
    }
}