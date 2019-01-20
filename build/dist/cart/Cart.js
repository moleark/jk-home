import * as tslib_1 from "tslib";
import { observable, autorun } from 'mobx';
import _ from 'lodash';
var CartItem = /** @class */ (function () {
    function CartItem() {
    }
    return CartItem;
}());
export { CartItem };
var Cart = /** @class */ (function () {
    function Cart(cUsqProduct) {
        var _this = this;
        this.calcSum = function () {
            var ret = _this.items.reduce(function (accumulator, currentValue) {
                var isDeleted = currentValue.isDeleted, quantity = currentValue.quantity, price = currentValue.price, checked = currentValue.checked;
                var count = accumulator.count, amount = accumulator.amount;
                if (isDeleted === true)
                    return accumulator;
                if (price === Number.NaN || quantity === Number.NaN)
                    return accumulator;
                return {
                    count: count + quantity,
                    amount: amount + (!(checked === true) ? 0 : quantity * price)
                };
            }, { count: 0, amount: 0 });
            var count = ret.count, amount = ret.amount;
            _this.count.set(count);
            _this.amount.set(amount);
        };
        //@observable items: CartItem[] = [];
        this.items = [];
        this.count = observable.box(0);
        this.amount = observable.box(0);
        this.productTuid = cUsqProduct.tuid('productx');
        this.packTuid = cUsqProduct.tuidDiv('productx', 'packx');
        this.disposer = autorun(this.calcSum);
    }
    Cart.prototype.dispose = function () {
        this.disposer();
    };
    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    Cart.prototype.AddToCart = function (product, pack, quantity, price, currency) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var packItem, cartItem, row, packs, packItem_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packItem = {
                            pack: pack,
                            price: price,
                            quantity: quantity,
                            currency: currency,
                        };
                        cartItem = this.items.find(function (element) { return element.product.id === product.id; });
                        if (!cartItem) {
                            row = {
                                product: product,
                                packs: [packItem],
                                $isSelected: true,
                                $isDeleted: false,
                                createdate: Date.now(),
                            };
                            this.items.push(row);
                        }
                        else {
                            packs = cartItem.packs;
                            packItem_1 = packs.find(function (v) { return v.pack.id === pack.id; });
                            if (packItem_1 === undefined) {
                                packs.push(packItem_1);
                            }
                            else {
                                packItem_1.price = price;
                                packItem_1.quantity = quantity;
                            }
                            //cartItem.packs.push.quantity = quantity;
                            //cartItem.price = price;
                        }
                        //(cartItem as any).$isSelected = true;
                        return [4 /*yield*/, this.storeCart(product, packItem)];
                    case 1:
                        //(cartItem as any).$isSelected = true;
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Cart.prototype.createCartItem = function (product, pack, quantity, price, currency) {
        var cartItem = {
            pack: pack,
            product: product,
            price: price,
            currency: currency,
            quantity: quantity,
            $isSelected: true,
            checked: true,
            isDeleted: false,
            createdate: Date.now()
        };
        return cartItem;
    };
    Cart.prototype.updateChecked = function (cartItem, checked) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
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
    Cart.prototype.removeDeletedItem = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rows, _i, _a, cp, product, packs, $isDeleted, _b, packs_1, pi, _c, _d, cp, packs;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        for (_i = 0, _a = this.items; _i < _a.length; _i++) {
                            cp = _a[_i];
                            product = cp.product, packs = cp.packs, $isDeleted = cp.$isDeleted;
                            for (_b = 0, packs_1 = packs; _b < packs_1.length; _b++) {
                                pi = packs_1[_b];
                                if ($isDeleted === true || pi.quantity === 0) {
                                    rows.push({
                                        product: product,
                                        packItem: pi
                                    });
                                }
                            }
                        }
                        if (rows.length === 0)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.removeFromCart(rows)];
                    case 1:
                        _e.sent();
                        for (_c = 0, _d = this.items; _c < _d.length; _c++) {
                            cp = _d[_c];
                            packs = cp.packs;
                            _.remove(packs, function (v) { return v.quantity === 0; });
                        }
                        _.remove(this.items, function (v) { return v.$isDeleted === true || v.packs.length === 0; });
                        return [2 /*return*/];
                }
            });
        });
    };
    Cart.prototype.clear = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.items.forEach(function (v) { return v.$isDeleted = true; });
                        return [4 /*yield*/, this.removeDeletedItem()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Cart.prototype.getSelectItem = function () {
        /*
        let selectCartItem: CartItem[] = this.items.filter((element) => element.checked && !(element.isDeleted === true));
        if (!selectCartItem || selectCartItem.length === 0) return;
        return selectCartItem;
        */
        return this.items.filter(function (v) {
            var $isSelected = v.$isSelected, $isDeleted = v.$isDeleted;
            return $isSelected === true && v.$isDeleted !== true;
        });
    };
    tslib_1.__decorate([
        observable
    ], Cart.prototype, "items", void 0);
    return Cart;
}());
export { Cart };
var RemoteCart = /** @class */ (function (_super) {
    tslib_1.__extends(RemoteCart, _super);
    function RemoteCart(cUsqProduct, cUsqOrder) {
        var _this = _super.call(this, cUsqProduct) || this;
        _this.addToCartAction = cUsqOrder.action('addtocart');
        _this.getCartQuery = cUsqOrder.query('getcart');
        _this.setCartAction = cUsqOrder.action('setcart');
        _this.removeFromCartAction = cUsqOrder.action('removefromcart');
        return _this;
    }
    /*
    @computed get sum(): any {
        return this.items.reduce((accumulator: any, currentValue: any) => {
            let { isDeleted, quantity, price, checked } = currentValue;
            let { count, amount } = accumulator;
            if (isDeleted === true) return accumulator;
            if (price === Number.NaN || quantity === Number.NaN) return accumulator;
            return {
                count: count + quantity,
                amount: amount + (!(checked === true) ? 0 : quantity * price)
            };
        }, { count: 0, amount: 0 });
    }
    */
    RemoteCart.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, cartData;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getCartQuery.page(undefined, 0, 100)];
                    case 1:
                        cartData = _b.sent();
                        (_a = this.items).push.apply(_a, cartData);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    RemoteCart.prototype.storeCart = function (product, packItem) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var param;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = tslib_1.__assign({ product: product }, packItem);
                        return [4 /*yield*/, this.setCartAction.submit(param)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RemoteCart.prototype.removeFromCart = function (rows) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var params;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = rows.map(function (v) {
                            var product = v.product, packItem = v.packItem;
                            return tslib_1.__assign({ product: product }, packItem);
                        });
                        return [4 /*yield*/, this.removeFromCartAction.submit({ rows: params })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return RemoteCart;
}(Cart));
export { RemoteCart };
var LOCALCARTNAME = "cart";
var LocalCart = /** @class */ (function (_super) {
    tslib_1.__extends(LocalCart, _super);
    function LocalCart(cUsqProduct) {
        return _super.call(this, cUsqProduct) || this;
    }
    LocalCart.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, cartstring, cartData;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                try {
                    cartstring = window.localStorage.getItem(LOCALCARTNAME);
                    cartData = JSON.parse(cartstring);
                    if (cartData && cartData.length > 0) {
                        cartData.forEach(function (element) {
                            var product = element.product, packs = element.packs;
                            element.product = _this.productTuid.boxId(product);
                            if (packs !== undefined) {
                                for (var _i = 0, packs_2 = packs; _i < packs_2.length; _i++) {
                                    var p = packs_2[_i];
                                    p.pack = _this.packTuid.boxId(p.pack);
                                }
                            }
                        });
                        (_a = this.items).push.apply(_a, cartData);
                    }
                }
                catch (_c) {
                    localStorage.removeItem(LOCALCARTNAME);
                    this.items.splice(0, this.items.length);
                }
                return [2 /*return*/];
            });
        });
    };
    LocalCart.prototype.storeCart = function (product, packItem) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                window.localStorage.setItem(LOCALCARTNAME, JSON.stringify(this.items.map(function (e) {
                    var product = e.product, packs = e.packs;
                    return {
                        product: product.id,
                        packs: packs && packs.map(function (v) {
                            var pack = v.pack, price = v.price, currency = v.currency, quantity = v.quantity;
                            return {
                                pack: pack,
                                price: price,
                                currency: currency,
                                quantity: quantity,
                            };
                        }),
                    };
                })));
                return [2 /*return*/];
            });
        });
    };
    LocalCart.prototype.removeFromCart = function (rows) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //_.remove(this.items, (e) => e.$isDeleted === true);
                    return [4 /*yield*/, this.storeCart(undefined, undefined)];
                    case 1:
                        //_.remove(this.items, (e) => e.$isDeleted === true);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LocalCart;
}(Cart));
export { LocalCart };
//# sourceMappingURL=Cart.js.map