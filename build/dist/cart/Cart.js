import * as tslib_1 from "tslib";
import { observable, autorun } from 'mobx';
import _ from 'lodash';
var CartStore = /** @class */ (function () {
    function CartStore(cart) {
        this.cart = cart;
    }
    return CartStore;
}());
var Cart = /** @class */ (function () {
    function Cart(cCartApp) {
        var _this = this;
        this.data = {
            list: observable([]),
        };
        this.count = observable.box(0);
        this.amount = observable.box(0);
        this.calcSum = function () {
            var count = 0, amount = 0;
            for (var _i = 0, _a = _this.items; _i < _a.length; _i++) {
                var cp = _a[_i];
                var $isSelected = cp.$isSelected, $isDeleted = cp.$isDeleted, packs = cp.packs;
                if ($isDeleted === true)
                    continue;
                for (var _b = 0, packs_1 = packs; _b < packs_1.length; _b++) {
                    var pi = packs_1[_b];
                    var price = pi.price, quantity = pi.quantity;
                    count += quantity;
                    if (price === Number.NaN || quantity === Number.NaN)
                        continue;
                    if ($isSelected === true) {
                        amount += quantity * price;
                    }
                }
            }
            _this.count.set(count);
            _this.amount.set(amount);
        };
        this.cCartApp = cCartApp;
        var cUqProduct = cCartApp.cUqProduct, cUqOrder = cCartApp.cUqOrder;
        this.cUqProduct = cUqProduct;
        this.cUqOrder = cUqOrder;
        this.items = this.data.list;
        this.disposer = autorun(this.calcSum);
    }
    Cart.prototype.dispose = function () {
        this.disposer();
        this.removeDeletedItem();
    };
    Cart.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, items_2, items_3, cartLocal, items, _c, _d, _i, items_1, item, product, packs, _e, packs_2, packItem, pack, quantity, price, currency;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!(this.cCartApp.isLogined === false)) return [3 /*break*/, 2];
                        this.cartStore = new CartLocal(this, this.cUqProduct);
                        return [4 /*yield*/, this.cartStore.load()];
                    case 1:
                        items_2 = _f.sent();
                        (_a = this.items).push.apply(_a, items_2);
                        return [2 /*return*/];
                    case 2:
                        if (!(this.cartStore === undefined)) return [3 /*break*/, 4];
                        this.cartStore = new CartRemote(this, this.cUqOrder);
                        return [4 /*yield*/, this.cartStore.load()];
                    case 3:
                        items_3 = _f.sent();
                        (_b = this.items).push.apply(_b, items_3);
                        return [2 /*return*/];
                    case 4:
                        cartLocal = this.cartStore;
                        items = this.items.splice(0, this.items.length);
                        this.items.splice(0, this.items.length);
                        this.cartStore = new CartRemote(this, this.cUqOrder);
                        _d = (_c = this.items).replace;
                        return [4 /*yield*/, this.cartStore.load()];
                    case 5:
                        _d.apply(_c, [_f.sent()]);
                        _i = 0, items_1 = items;
                        _f.label = 6;
                    case 6:
                        if (!(_i < items_1.length)) return [3 /*break*/, 11];
                        item = items_1[_i];
                        product = item.product, packs = item.packs;
                        _e = 0, packs_2 = packs;
                        _f.label = 7;
                    case 7:
                        if (!(_e < packs_2.length)) return [3 /*break*/, 10];
                        packItem = packs_2[_e];
                        pack = packItem.pack, quantity = packItem.quantity, price = packItem.price, currency = packItem.currency;
                        return [4 /*yield*/, this.AddToCart(product, pack, quantity, price, currency)];
                    case 8:
                        _f.sent();
                        _f.label = 9;
                    case 9:
                        _e++;
                        return [3 /*break*/, 7];
                    case 10:
                        _i++;
                        return [3 /*break*/, 6];
                    case 11:
                        cartLocal.clear();
                        return [2 /*return*/];
                }
            });
        });
    };
    Cart.prototype.getQuantity = function (productId, packId) {
        var cp = this.items.find(function (v) { return v.$isDeleted !== true && v.product.id === productId; });
        if (cp === undefined)
            return 0;
        var packItem = cp.packs.find(function (v) { return v.pack.id === packId; });
        if (packItem === undefined)
            return 0;
        return packItem.quantity;
    };
    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    Cart.prototype.AddToCart = function (product, pack, quantity, price, currency) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var packItem, cartItem, row, $isDeleted, packs, piPack;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _.remove(this.items, function (v) { return v.$isDeleted === true; });
                        packItem = {
                            pack: pack,
                            price: price,
                            quantity: quantity,
                            currency: currency,
                        };
                        cartItem = this.items.find(function (element) { return element.product.id === product.id; });
                        if (!cartItem) {
                            row = {};
                            row.product = product;
                            row.packs = [];
                            row.packs.push(packItem),
                                row.$isSelected = true;
                            row.$isDeleted = false;
                            row.createdate = Date.now();
                            this.items.push(row);
                        }
                        else {
                            $isDeleted = cartItem.$isDeleted, packs = cartItem.packs;
                            if ($isDeleted === true) {
                                cartItem.$isDeleted = false;
                                packs.splice(0);
                            }
                            cartItem.$isSelected = true;
                            cartItem.$isDeleted = false;
                            piPack = packs.find(function (v) { return v.pack.id === pack.id; });
                            if (piPack === undefined) {
                                packs.push(packItem);
                            }
                            else {
                                piPack.price = price;
                                piPack.quantity = quantity;
                            }
                        }
                        return [4 /*yield*/, this.storeCart(product, packItem)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Cart.prototype.storeCart = function (product, packItem) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartStore.storeCart(product, packItem)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param item
     */
    Cart.prototype.removeDeletedItem = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rows, _i, _a, cp, product, packs, $isDeleted, _b, packs_3, pi, _c, _d, cp, packs, packIndexes, len_1, i, i, itemIndexes, len, i, _e, $isDeleted, packs, i;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        rows = [];
                        for (_i = 0, _a = this.items; _i < _a.length; _i++) {
                            cp = _a[_i];
                            product = cp.product, packs = cp.packs, $isDeleted = cp.$isDeleted;
                            for (_b = 0, packs_3 = packs; _b < packs_3.length; _b++) {
                                pi = packs_3[_b];
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
                        _f.sent();
                        for (_c = 0, _d = this.items; _c < _d.length; _c++) {
                            cp = _d[_c];
                            packs = cp.packs;
                            packIndexes = [];
                            len_1 = packs.length;
                            for (i = 0; i < len_1; i++) {
                                if (packs[i].quantity === 0)
                                    packIndexes.push(i);
                            }
                            for (i = packIndexes.length - 1; i >= 0; i--)
                                packs.splice(packIndexes[i], 1);
                            //_.remove(packs, v => v.quantity === 0);
                        }
                        itemIndexes = [];
                        len = this.items.length;
                        for (i = 0; i < len; i++) {
                            _e = this.items[i], $isDeleted = _e.$isDeleted, packs = _e.packs;
                            if ($isDeleted === true || packs.length === 0)
                                itemIndexes.push(i);
                        }
                        for (i = itemIndexes.length - 1; i >= 0; i--)
                            this.items.splice(itemIndexes[i], 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    Cart.prototype.removeFromCart = function (rows) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartStore.removeFromCart(rows)];
                    case 1:
                        _a.sent();
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
        return this.items.filter(function (v) {
            var $isSelected = v.$isSelected, $isDeleted = v.$isDeleted;
            return $isSelected === true && v.$isDeleted !== true;
        });
    };
    tslib_1.__decorate([
        observable
    ], Cart.prototype, "data", void 0);
    return Cart;
}());
export { Cart };
var CartRemote = /** @class */ (function (_super) {
    tslib_1.__extends(CartRemote, _super);
    function CartRemote(cart, cUqOrder) {
        var _this = _super.call(this, cart) || this;
        _this.getCartQuery = cUqOrder.query('getcart');
        _this.setCartAction = cUqOrder.action('setcart');
        _this.removeFromCartAction = cUqOrder.action('removefromcart');
        return _this;
    }
    Object.defineProperty(CartRemote.prototype, "isLocal", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    CartRemote.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cartData, cartDict, cartProducts, _i, cartData_1, cd, product, createdate, pack, price, quantity, currency, packItem, cpi;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCartQuery.page(undefined, 0, 100)];
                    case 1:
                        cartData = _a.sent();
                        cartDict = {};
                        cartProducts = [];
                        for (_i = 0, cartData_1 = cartData; _i < cartData_1.length; _i++) {
                            cd = cartData_1[_i];
                            product = cd.product, createdate = cd.createdate, pack = cd.pack, price = cd.price, quantity = cd.quantity, currency = cd.currency;
                            packItem = {
                                pack: pack,
                                price: price,
                                quantity: quantity,
                                currency: currency
                            };
                            cpi = cartDict[product.id];
                            if (cpi === undefined) {
                                cpi = {}; //new CartProduct;
                                cpi.product = product;
                                cpi.packs = [];
                                cpi.packs.push(packItem);
                                cpi.createdate = createdate;
                                cpi.$isSelected = false;
                                cpi.$isDeleted = false;
                                cartProducts.push(cpi);
                                cartDict[product.id] = cpi;
                                continue;
                            }
                            cpi.packs.push(packItem);
                        }
                        return [2 /*return*/, cartProducts];
                }
            });
        });
    };
    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    CartRemote.prototype.storeCart = function (product, packItem) {
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
    CartRemote.prototype.removeFromCart = function (rows) {
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
    return CartRemote;
}(CartStore));
var LOCALCARTNAME = "cart";
var CartLocal = /** @class */ (function (_super) {
    tslib_1.__extends(CartLocal, _super);
    function CartLocal(cart, cUqProduct) {
        var _this = _super.call(this, cart) || this;
        _this.productTuid = cUqProduct.tuid('productx');
        _this.packTuid = cUqProduct.tuidDiv('productx', 'packx');
        return _this;
    }
    Object.defineProperty(CartLocal.prototype, "isLocal", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    CartLocal.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cartstring, cartData, items;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                try {
                    cartstring = localStorage.getItem(LOCALCARTNAME);
                    if (cartstring === null)
                        return [2 /*return*/, []];
                    cartData = JSON.parse(cartstring);
                    items = cartData.map(function (element) {
                        var _a;
                        var cartProduct = {};
                        var product = element.product, packs = element.packs, createdate = element.createdate;
                        if (packs !== undefined) {
                            for (var _i = 0, packs_4 = packs; _i < packs_4.length; _i++) {
                                var p = packs_4[_i];
                                p.pack = _this.packTuid.boxId(p.pack);
                            }
                        }
                        cartProduct.product = _this.productTuid.boxId(product);
                        cartProduct.packs = [];
                        (_a = cartProduct.packs).push.apply(_a, packs);
                        cartProduct.$isSelected = false;
                        cartProduct.$isDeleted = false;
                        cartProduct.createdate = createdate;
                        return cartProduct;
                    });
                    return [2 /*return*/, items];
                }
                catch (_b) {
                    localStorage.removeItem(LOCALCARTNAME);
                    return [2 /*return*/, []];
                }
                return [2 /*return*/];
            });
        });
    };
    CartLocal.prototype.storeCart = function (product, packItem) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var items, text;
            return tslib_1.__generator(this, function (_a) {
                items = this.cart.items.map(function (e) {
                    var product = e.product, packs = e.packs;
                    return {
                        product: product.id,
                        packs: packs && packs.map(function (v) {
                            var pack = v.pack, price = v.price, currency = v.currency, quantity = v.quantity;
                            return {
                                pack: pack.id,
                                price: price,
                                currency: currency && currency.id,
                                quantity: quantity,
                            };
                        }),
                    };
                });
                text = JSON.stringify(items);
                localStorage.setItem(LOCALCARTNAME, text);
                return [2 /*return*/];
            });
        });
    };
    CartLocal.prototype.removeFromCart = function (rows) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storeCart(undefined, undefined)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CartLocal.prototype.clear = function () {
        localStorage.removeItem(LOCALCARTNAME);
    };
    return CartLocal;
}(CartStore));
//# sourceMappingURL=Cart.js.map