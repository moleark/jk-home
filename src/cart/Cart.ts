import { observable, computed, autorun, IReactionDisposer, IObservableArray } from 'mobx';
import _ from 'lodash';
import { Action, Query, TuidDiv, BoxId } from 'tonva';
import { CCartApp } from '../CCartApp';
import { LoaderProductChemical } from 'product/itemLoader';
import { MainProductChemical } from 'mainSubs';
import { PackRow } from 'product/Product';

export interface CartItem {
    product: MainProductChemical;
    packs: CartPackRow[];
    $isSelected?: boolean;
    $isDeleted?: boolean;
    createdate: number;
}

export interface CartPackRow extends PackRow {
    price: number;
    retail?: number;
    currency: any;
}

export class Cart {
    cApp: CCartApp;

    private cartStore: CartStore;
    private disposer: IReactionDisposer;

    @observable data: any = {
        list: observable<any>([]),
    };
    items: any[];
    count = observable.box<number>(0);
    amount = observable.box<number>(0);

    constructor(cApp: CCartApp) {
        this.cApp = cApp;
        this.items = this.data.list;
        this.disposer = autorun(this.calcSum);
    }

    dispose() {
        this.disposer();
        // this.removeDeletedItem();
    }

    protected calcSum = () => {
        let count = 0, amount = 0;
        for (let cp of this.items) {
            let { $isSelected, $isDeleted, packs } = cp;
            if ($isDeleted === true) continue;
            for (let pi of packs) {
                let { price, quantity } = pi;
                count += quantity;
                if (price === Number.NaN || quantity === Number.NaN) continue;
                if ($isSelected === true) {
                    amount += quantity * price;
                }
            }
        }
        this.count.set(count);
        this.amount.set(amount);
    }

    async init(cartStore: CartStore): Promise<void> {
        this.cartStore = cartStore;
        let items = await this.cartStore.load();
    }

    /*
    private mergeToRemote(localItems: any[]) {
        let originLength = localItems.length;
        let nowLength = this.items.length;
        if (originLength > 0) {
            if (nowLength > 0) {
                // 合并，谁覆盖谁？
                for (let i = 0; i < originLength; i++) {
                    let { product: tempProduct, pack: tempPack } = localItems[i];
                    let cartItemExits = this.items.find(v => v.product === tempProduct && v.pack === tempPack);
                    if (cartItemExits) {
                        // 如果本地购物车中的产品已经过期，则要删除
                    } else {
                        this.items.push(localItems[i]);
                    }
                }
            } else {
                this.items.push(...localItems);
            }
            // 保存到远程
        }
    }
    */

    getQuantity(productId: number, packId: number): number {
        let cp = this.items.find(v => v.$isDeleted !== true && v.product.id === productId && v.pack.id === packId);
        return cp === undefined ? 0 : cp.quantity;
    }

    isDeleted(productId: number): boolean {
        let i = this.items.findIndex(v => v.$isDeleted === true && v.product.id === productId);
        return i !== -1;
    }

    getSelectedItem(): CartItem[] {
        return this.items.filter(v => {
            let { $isSelected, $isDeleted } = v;
            return $isSelected === true && $isDeleted !== true;
        });
    }

    /**
     * 添加购物车
     * @param packId 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    add = async (productId: number, packId: number, quantity: number, price: number, currency: any) => {

        let cartItem = this.items.find((e) => e.product === productId && e.pack === packId);
        if (!cartItem) {
            cartItem = { product: productId, pack: packId, quantity: quantity, price: price, currency: currency };
            this.items.push(cartItem);
        } else {
            cartItem.quantity = quantity;
            cartItem.price = price;
            cartItem.currency = currency;
        }
        cartItem.$isSelected = true;
        cartItem.$isDeleted = false;
        cartItem.createdate = Date.now();

        await this.cartStore.storeCart(cartItem);
    }

    removeFromCart(rows: [{ productId: number, packId: number }]) {
        if (rows && rows.length > 0) {
            rows.forEach(pe => {
                let cartItemIndex = this.items.findIndex(e => e.product.id === pe.productId);
                if (cartItemIndex >= 0) {
                    let cartItem = this.items[cartItemIndex];
                    let i = cartItem.packs.findIndex(e => e.pack.id === pe.packId)
                    if (i >= 0) {
                        cartItem.packs.splice(i, 1);
                        if (cartItem.packs.length === 0) {
                            this.items.splice(cartItemIndex, 1);
                        }
                    }
                }
            })
        }
    }

    /*
    setDeletedMark(productId: number, packId: number) {
        let cp = this.items.find(v => v.$isDeleted !== true && v.product === productId && v.pack === packId);
        if (cp !== undefined)
            cp.$isDeleted = true;
    }

    async removeDeletedItem() {
        let rows: { product: number, packItem: CartPackRow }[] = [];
        for (let cp of this.items) {
            let { quantity, $isDeleted } = cp;
            if ($isDeleted === true || quantity === 0) {
                // TODO:
            }
        }
        if (rows.length === 0) return;
        await this.cartStore.removeFromCart(rows);

        // 下面是从本地数据结构中删除
        for (let cp of this.items) {
            let { packs } = cp;
            let packIndexes: number[] = [];
            let len = packs.length;
            for (let i = 0; i < len; i++) {
                if (packs[i].quantity === 0) packIndexes.push(i);
            }
            for (let i = packIndexes.length - 1; i >= 0; i--) packs.splice(packIndexes[i], 1);
        }

        let itemIndexes: number[] = [];
        let len = this.items.length;
        for (let i = 0; i < len; i++) {
            let { $isDeleted, packs } = this.items[i];
            if ($isDeleted === true || packs.length === 0) itemIndexes.push(i);
        }
        for (let i = itemIndexes.length - 1; i >= 0; i--) this.items.splice(itemIndexes[i], 1);
    }

    async clear() {
        this.items.forEach(v => v.$isDeleted = true);
        await this.removeDeletedItem();
    }
    */

}

abstract class CartStore {

    protected cApp: CCartApp;
    private getInventoryAllocationQuery: Query;
    private packTuid: TuidDiv;
    protected cart: Cart;
    constructor(cart: Cart, cApp: CCartApp) {
        this.cart = cart;
        this.cApp = cApp;

        let { cUqWarehouse, cUqProduct } = this.cApp;
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
        this.packTuid = cUqProduct.tuidDiv('productx', 'packx');
    }
    abstract get isLocal(): boolean;
    abstract async load(): Promise<CartItem[]>;
    abstract async storeCart(cartItem: any): Promise<void>;
    abstract async removeFromCart(rows: { product: number, packItem: CartPackRow }[]): Promise<void>;

    protected async generateItems(cartData: any): Promise<CartItem[]> {
        let results: CartItem[] = [];

        let productService = new LoaderProductChemical(this.cApp);
        for (let cd of cartData) {
            let { product: productId, createdate, packs } = cd;
            let cartItem: CartItem = {} as any;
            cartItem.product = await productService.load(productId);
            cartItem.createdate = createdate || Date.now();
            cartItem.$isSelected = false;
            cartItem.$isDeleted = false;
            results.push(cartItem);

            cartItem.packs = [];
            if (packs !== undefined) {
                for (let p of packs) {
                    let { pack: packId, price, quantity, currency } = p;
                    let packItem: CartPackRow = {
                        pack: this.packTuid.boxId(packId),
                        price: price,
                        quantity: quantity,
                        currency: currency,
                    };
                    packItem.inventoryAllocation =
                        await this.getInventoryAllocationQuery.table({ product: productId, pack: packId, salesRegion: this.cApp.currentSalesRegion })
                    cartItem.packs.push(packItem);
                }
            }
        }
        return results;
    }
}

class CartRemote extends CartStore {
    private getCartQuery: Query;
    private setCartAction: Action;
    private removeFromCartAction: Action;

    get isLocal(): boolean { return false }

    constructor(cart: Cart, cApp: CCartApp) {
        super(cart, cApp);

        let { cUqOrder } = this.cApp;
        this.getCartQuery = cUqOrder.query('getcart')
        this.setCartAction = cUqOrder.action('setcart');
        this.removeFromCartAction = cUqOrder.action('removefromcart');
    }

    async load(): Promise<any[]> {

        return await this.getCartQuery.page(undefined, 0, 100);
    }

    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    async storeCart(cartItem: any) {
        await this.setCartAction.submit(cartItem);
    }

    async removeFromCart(rows: { product: number, packItem: CartPackRow }[]) {
        let params = rows.map(v => {
            let { product, packItem } = v;
            return {
                product: product,
                ...packItem
            }
        })
        await this.removeFromCartAction.submit({ rows: params });
    }
}

const LOCALCARTNAME: string = "cart";
class CartLocal extends CartStore {

    constructor(cart: Cart, cApp: CCartApp) {
        super(cart, cApp);
    }

    get isLocal(): boolean { return true }

    async load(): Promise<any[]> {
        try {
            let cartstring = localStorage.getItem(LOCALCARTNAME);
            if (cartstring === null) return [];
            return JSON.parse(cartstring);
        }
        catch {
            localStorage.removeItem(LOCALCARTNAME);
            return [];
        }
    }

    async storeCart(cartItem: any) {
        let text = JSON.stringify(cartItem);
        localStorage.setItem(LOCALCARTNAME, text);
    }

    async removeFromCart(rows: { product: number, packItem: CartPackRow }[]) {
        await this.storeCart(undefined);
    }

    clear() {
        localStorage.removeItem(LOCALCARTNAME);
    }
}