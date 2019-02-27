import { observable, computed, autorun, IReactionDisposer, IObservableArray } from 'mobx';
import _ from 'lodash';
import { CUq, Action, Query, TuidMain, TuidDiv, BoxId } from 'tonva-react-uq';
import { CCartApp } from '../CCartApp';
import { MainProduct } from 'mainSubs';
import { LoaderProduct } from 'product/itemLoader';
import { CartPackRow } from './Cart';

export interface CartItem {
    product: MainProduct;
    packs: CartPackRow[];
    $isSelected?: boolean;
    $isDeleted?: boolean;
    createdate: number;
}

export abstract class Cart2 {

    @observable items: CartItem[] = [];
    protected cApp: CCartApp;
    constructor(cApp: CCartApp) {
        this.cApp = cApp;
    }

    /*
    @computed get count() {
        return this.items.reduce((accumulator, currentValue) => accumulator + currentValue.packs.reduce((a, c) => a + c.quantity, 0), 0);
    }
    */
    count = observable.box<number>(0);
    amount = observable.box<number>(0);

    abstract get isLocal(): boolean;
    abstract async load(): Promise<void>;
    // abstract async storeCart(product: number, packItem: PackItem): Promise<void>;
    // abstract async removeFromCart(rows: { product: number, packItem: PackItem }[]): Promise<void>;

    AddToCart(productId: number, packId: number, quantity: number, price: number, currency: number) {

    }

    getSelectItem() {
        return [];
    }

    protected async generateItems(cartData: any) {
        let cartDict: { [product: number]: CartItem } = {};
        let productLoader = new LoaderProduct(this.cApp);
        for (let cd of cartData) {
            let { product, createdate, pack, price, quantity, currency } = cd;
            let packItem: CartPackRow = {
                pack: pack,
                price: price,
                quantity: quantity,
                currency: currency
            };

            let cpi = cartDict[product.id];
            if (cpi === undefined) {
                cpi = {} as any;
                cpi.product = await productLoader.load(product);
                cpi.packs = [];
                cpi.packs.push(packItem);
                cpi.createdate = createdate;
                cpi.$isSelected = false;
                cpi.$isDeleted = false;
                this.items.push(cpi);
                cartDict[product.id] = cpi;
                continue;
            }
            cpi.packs.push(packItem);
        }
    }
}

export class CartRemote2 extends Cart2 {
    private getCartQuery: Query;
    private setCartAction: Action;
    private removeFromCartAction: Action;

    get isLocal(): boolean { return false }

    constructor(cApp: CCartApp) {
        super(cApp);

        let { cUqOrder } = this.cApp;
        this.getCartQuery = cUqOrder.query('getcart')
        this.setCartAction = cUqOrder.action('setcart');
        this.removeFromCartAction = cUqOrder.action('removefromcart');
    }

    async load(): Promise<void> {
        let cartData = await this.getCartQuery.page(undefined, 0, 100);
        this.generateItems(cartData);
    }
}

const LOCALCARTNAME: string = "cart";
export class CartLocal2 extends Cart2 {
    private productTuid: TuidMain;
    private packTuid: TuidDiv;

    constructor(cApp: CCartApp) {
        super(cApp);

        let { cUqProduct } = this.cApp;
        this.productTuid = cUqProduct.tuid('productx');
        this.packTuid = cUqProduct.tuidDiv('productx', 'packx');
    }

    get isLocal(): boolean { return true }

    async load(): Promise<void> {
        try {
            let cartstring = localStorage.getItem(LOCALCARTNAME);
            if (cartstring === null) return;

            let cartData = JSON.parse(cartstring);
            this.generateItems(cartData);
        }
        catch {
            localStorage.removeItem(LOCALCARTNAME);
        }
    }

    /*
    async storeCart(product: BoxId, packItem: PackItem) {
        let items = this.cart.items.map(e => {
            let { product, packs } = e;
            return {
                product: product.id,
                packs: packs && packs.map(v => {
                    let { pack, price, currency, quantity } = v;
                    return {
                        pack: pack.id,
                        price: price,
                        currency: currency && currency.id,
                        quantity: quantity,
                    }
                }),
            }
        });

        let text = JSON.stringify(items);
        localStorage.setItem(LOCALCARTNAME, text);
    }

    async removeFromCart(rows: { product: BoxId, packItem: PackItem }[]) {
        await this.storeCart(undefined, undefined);
    }

    clear() {
        localStorage.removeItem(LOCALCARTNAME);
    }
    */
}