import { observable, computed, autorun, IReactionDisposer } from 'mobx';
import _ from 'lodash';
import { CUsq, Action, Query, TuidMain, TuidDiv, BoxId } from 'tonva-react-usql';
import { PackItem } from '../tools';

export class CartItem {
    pack: BoxId;
    product: BoxId;
    price: number;
    currency: BoxId;
    quantity: number;
    $isSelected?: boolean;
    $isDeleted?: boolean;
    checked: boolean;
    isDeleted: boolean;
    createdate: number;
}

export interface CartProduct {
    product: BoxId;
    packs: PackItem[];
    $isSelected?: boolean;
    $isDeleted?: boolean;
    createdate: number;
}

export abstract class Cart {
    protected productTuid: TuidMain;
    protected packTuid: TuidDiv;
    private disposer: IReactionDisposer;

    //@observable items: CartItem[] = [];
    @observable items: CartProduct[] = [];
    count = observable.box<number>(0);
    amount = observable.box<number>(0);

    constructor(cUsqProduct: CUsq) {

        this.productTuid = cUsqProduct.tuid('productx');
        this.packTuid = cUsqProduct.tuidDiv('productx', 'packx');
        this.disposer = autorun(this.calcSum);
    }

    dispose() {
        this.disposer();
        this.removeDeletedItem();
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

    abstract async load(): Promise<void>;

    getQuantity(productId: number, packId: number): number {
        let cp = this.items.find(v => v.product.id === productId);
        if (cp === undefined) return 0;
        let packItem = cp.packs.find(v => v.pack.id === packId);
        if (packItem === undefined) return 0;
        return packItem.quantity;
    }

    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    async AddToCart(product: any, pack: any, quantity: number, price: number, currency: any) {
        let packItem: PackItem = {
            pack: pack,
            price: price,
            quantity: quantity,
            currency: currency,
        };
        let cartItem = this.items.find((element) => element.product.id === product.id);
        if (!cartItem) {
            //cartItem = this.createCartItem(product, pack, quantity, price, currency);
            //this.items.push(cartItem);
            let row: CartProduct = {
                product: product,
                packs: [packItem],
                $isSelected: true,
                $isDeleted: false,
                createdate: Date.now(),
            };
            this.items.push(row);
        } else {
            let { packs } = cartItem;
            cartItem.$isSelected = true;
            let piPack = packs.find(v => v.pack.id === pack.id);
            if (piPack === undefined) {
                packs.push(packItem);
            }
            else {
                piPack.price = price;
                piPack.quantity = quantity;
            }
        }
        await this.storeCart(product, packItem);
    }

    createCartItem(product: any, pack: any, quantity: number, price: number, currency: any): any {

        let cartItem: CartItem = {
            pack: pack,
            product: product, // pack.obj.$owner,
            price: price,
            currency: currency,
            quantity: quantity,
            $isSelected: true,
            checked: true,
            isDeleted: false,
            createdate: Date.now()
        };
        return cartItem;
    }

    abstract async storeCart(product: BoxId, packItem: PackItem): Promise<void>;

    async updateChecked(cartItem: CartItem, checked: boolean) {
        /*
                let existItem = this.items.find((element) => element.pack.id === cartItem.pack.id);
                if (existItem)
                    existItem.checked = checked;
        */
    }

    /**
     *
     * @param cartItem
     * @param quantity
     */
    /*
    async updateQuantity(cartItem: CartItem, quantity: number) {

        let existItem = this.items.find((element) => element.pack.id === cartItem.pack.id);
        if (existItem) {
            if (quantity <= 0) {
                this.removeFromCart([existItem]);
            } else {
                existItem.quantity = quantity;
                await this.storeCart(existItem);
            }
        }
    }
*/
    /**
     *
     * @param item
     */
    async removeDeletedItem() {
        let rows: { product: BoxId, packItem: PackItem }[] = [];
        for (let cp of this.items) {
            let { product, packs, $isDeleted } = cp;
            for (let pi of packs) {
                if ($isDeleted === true || pi.quantity === 0) {
                    rows.push({
                        product: product,
                        packItem: pi
                    });
                }
            }
        }
        if (rows.length === 0) return;
        await this.removeFromCart(rows);

        for (let cp of this.items) {
            let { packs } = cp;
            _.remove(packs, v => v.quantity === 0);
        }
        _.remove(this.items, v => v.$isDeleted === true || v.packs.length === 0);

        //let rows: CartItem[] = this.items.filter((e) => e.isDeleted === true);
        /*
        if (rows && rows.length > 0) {
            await this.removeFromCart(rows);
        }
        */
    }

    protected abstract async removeFromCart(rows: { product: BoxId, packItem: PackItem }[]): Promise<void>;

    async clear() {
        this.items.forEach(v => v.$isDeleted = true);
        await this.removeDeletedItem();
    }

    getSelectItem(): CartProduct[] {
        /*
        let selectCartItem: CartItem[] = this.items.filter((element) => element.checked && !(element.isDeleted === true));
        if (!selectCartItem || selectCartItem.length === 0) return;
        return selectCartItem;
        */
        return this.items.filter(v => {
            let { $isSelected, $isDeleted } = v;
            return $isSelected === true && v.$isDeleted !== true;
        });
    }

    /*
    getItem(packId: number): CartItem {
        return this.items.find(x => x.pack.id === packId);
    }
    */
}

export class RemoteCart extends Cart {

    //private addToCartAction: Action;
    private getCartQuery: Query;
    private setCartAction: Action;
    private removeFromCartAction: Action;

    constructor(cUsqProduct: CUsq, cUsqOrder: CUsq) {
        super(cUsqProduct);
        //this.addToCartAction = cUsqOrder.action('addtocart');
        this.getCartQuery = cUsqOrder.query('getcart')
        this.setCartAction = cUsqOrder.action('setcart');
        this.removeFromCartAction = cUsqOrder.action('removefromcart');
    }

    async load() {
        let cartData = await this.getCartQuery.page(undefined, 0, 100);
        let cartDict: { [product: number]: CartProduct } = {};
        let cartProducts: CartProduct[] = [];
        for (let cd of cartData) {
            let { product, createdate, pack, price, quantity, currency } = cd;
            let packItem: PackItem = {
                pack: pack,
                price: price,
                quantity: quantity,
                currency: currency
            };
            let cpi = cartDict[product.id];
            if (cpi === undefined) {
                cpi = {
                    product: product,
                    packs: [packItem],
                    createdate: createdate,
                }
                cartProducts.push(cpi);
                cartDict[product.id] = cpi;
                continue;
            }
            cpi.packs.push(packItem);
        }
        this.items.push(...cartProducts);
    }

    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    async storeCart(product: BoxId, packItem: PackItem) {
        let param = {
            product: product,
            ...packItem
        }
        await this.setCartAction.submit(param);
    }

    async removeFromCart(rows: { product: BoxId, packItem: PackItem }[]) {
        let params = rows.map(v => {
            let { product, packItem } = v;
            return {
                product: product,
                ...packItem
            }
        })
        await this.removeFromCartAction.submit({ rows: params });
        //_.pullAllBy(this.items, rows, 'pack.id');
    }
}

const LOCALCARTNAME: string = "cart";
export class LocalCart extends Cart {

    constructor(cUsqProduct: CUsq) {
        super(cUsqProduct);
    }

    async load() {
        try {
            let cartstring = localStorage.getItem(LOCALCARTNAME);
            let cartData = JSON.parse(cartstring);
            if (cartData && cartData.length > 0) {
                cartData.forEach(element => {
                    let { product, packs } = element;
                    element.product = this.productTuid.boxId(product);
                    if (packs !== undefined) {
                        for (let p of packs) {
                            p.pack = this.packTuid.boxId(p.pack);
                        }
                    }
                });
                this.items.push(...cartData);
            }
        }
        catch {
            localStorage.removeItem(LOCALCARTNAME);
            this.items.splice(0, this.items.length);
        }
    }

    async storeCart(product: BoxId, packItem: PackItem) {
        let items = this.items.map(e => {
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

        localStorage.setItem(LOCALCARTNAME, JSON.stringify(items));
    }

    async removeFromCart(rows: { product: BoxId, packItem: PackItem }[]) {
        //_.remove(this.items, (e) => e.$isDeleted === true);
        await this.storeCart(undefined, undefined);
    }
}