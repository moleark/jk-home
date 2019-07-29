import { observable, autorun, IReactionDisposer } from 'mobx';
import _ from 'lodash';
import { CartItem, CartPackRow } from './Cart';

export interface CartItemSimple {
    product: number;
    packs: CartPackRow[];
    $isSelected?: boolean;
    $isDeleted?: boolean;
    createdate: number;
}

export class CartViewModelSimple {

    constructor() {
        this.cartItems = this.data.list;
        this.disposer = autorun(this.calcSum);
    }

    private disposer: IReactionDisposer;
    cartItems: CartItemSimple[];
    @observable data = {
        list: observable<CartItemSimple>([]),
    };
    count = observable.box<number>(0);
    amount = observable.box<number>(0);

    dispose() {
        this.disposer();
    }

    protected calcSum = () => {
        let count = 0, amount = 0;
        for (let cp of this.cartItems) {
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

    getQuantity(productId: number, packId: number): number {
        let cp = this.cartItems.find(v => v.$isDeleted !== true && v.product === productId);
        if (cp === undefined) return 0;
        let packItem = cp.packs.find(v => v.pack.id === packId);
        if (packItem === undefined) return 0;
        return packItem.quantity;
    }
}

export class CartViewModel {

    constructor() {
        this.cartItems = this.data.list;
        this.disposer = autorun(this.calcSum);
    }

    private disposer: IReactionDisposer;

    cartItems: CartItem[];
    @observable data = {
        list: observable<CartItem>([]),
    };
    count = observable.box<number>(0);
    amount = observable.box<number>(0);

    dispose() {
        this.disposer();
    }

    protected calcSum = () => {
        let count = 0, amount = 0;
        for (let cp of this.cartItems) {
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
        this.amount.set(parseFloat(amount.toFixed(2)));
    }

    getQuantity(productId: number, packId: number): number {
        let cp = this.cartItems.find(v => v.$isDeleted !== true && v.product.id === productId);
        if (cp === undefined) return 0;
        let packItem = cp.packs.find(v => v.pack.id === packId);
        if (packItem === undefined) return 0;
        return packItem.quantity;
    }

    isDeleted(productId: number): boolean {
        let i = this.cartItems.findIndex(v => v.$isDeleted === true && v.product.id === productId);
        return i !== -1;
    }

    getSelectedItem(): CartItem[] {
        return this.cartItems.filter(v => {
            let { $isSelected, $isDeleted } = v;
            return $isSelected === true && $isDeleted !== true;
        });
    }

    add(cartItem: CartItem) {
        let { product, packs } = cartItem;
        let { id: productId } = product;
        let cartItemExists: CartItem = this.cartItems.find((element) => element.product.id === productId);
        if (!cartItemExists) {
            cartItem.$isSelected = true;
            cartItem.$isDeleted = false;
            this.cartItems.push(cartItem);
            return;
        }

        let { $isDeleted, packs: packsExists } = cartItemExists;
        if ($isDeleted === true) {
            packs.splice(0);
        }
        cartItemExists.$isDeleted = false;
        cartItemExists.$isSelected = true;

        let { pack, price, currency, quantity, inventoryAllocation, futureDeliveryTimeDescription } = packs[0];
        let piPack: CartPackRow = packsExists.find(v => v.pack.id === pack.id);
        if (piPack === undefined) {
            cartItemExists.packs.push(packs[0]);
        }
        else {
            piPack.price = price;
            piPack.quantity = quantity;
            piPack.currency = currency;
            piPack.futureDeliveryTimeDescription = futureDeliveryTimeDescription;
            piPack.inventoryAllocation = inventoryAllocation;
        }
    }

    removeFromCart(rows: [{ productId: number, packId: number }]) {
        if (rows && rows.length > 0) {
            rows.forEach(pe => {
                let cartItemIndex = this.cartItems.findIndex(e => e.product.id === pe.productId);
                if (cartItemIndex >= 0) {
                    let cartItem = this.cartItems[cartItemIndex];
                    let i = cartItem.packs.findIndex(e => e.pack.id === pe.packId)
                    if (i >= 0) {
                        cartItem.packs.splice(i, 1);
                        if (cartItem.packs.length === 0) {
                            this.cartItems.splice(cartItemIndex, 1);
                        }
                    }
                }
            })
        }
    }
}