import * as tslib_1 from "tslib";
var Product = /** @class */ (function () {
    function Product(cApp) {
        var _this = this;
        this.getFutureDeliveryTimeDescription = function (productId, salesRegionId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var futureDeliveryTime;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFutureDeliveryTime.table({ product: productId, salesRegion: salesRegionId })];
                    case 1:
                        futureDeliveryTime = _a.sent();
                        if (futureDeliveryTime.length > 0) {
                            return [2 /*return*/, futureDeliveryTime[0].deliveryTimeDescription];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.cApp = cApp;
        var cUqProduct = cApp.cUqProduct, cUqCustomerDiscount = cApp.cUqCustomerDiscount, cUqWarehouse = cApp.cUqWarehouse;
        this.productTuid = cUqProduct.tuid('productx');
        this.packTuid = this.productTuid.divs['packx'];
        this.productChemicalMap = cUqProduct.map('productChemical');
        this.priceMap = cUqProduct.map('pricex');
        this.getCustomerDiscount = cUqCustomerDiscount.query("getdiscount");
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
        this.getFutureDeliveryTime = cUqProduct.query("getFutureDeliveryTime");
    }
    Product.prototype.load = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, currentSalesRegion, currentUser, _b, promises, inventoryAllocationPromises, results, p, prices, fd, discount, discountSetting, allocationResults, i, element;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.id = this.productTuid.boxId(id);
                        _a = this.cApp, currentSalesRegion = _a.currentSalesRegion, currentUser = _a.currentUser;
                        _b = this;
                        return [4 /*yield*/, this.productTuid.load(id)];
                    case 1:
                        _b.product = _c.sent();
                        this.packRows = this.product.packx.map(function (v) {
                            return {
                                pack: v,
                                quantity: _this.cApp.cart.getQuantity(id, v.id),
                            };
                        });
                        promises = [];
                        promises.push(this.productChemicalMap.obj({ product: id }));
                        promises.push(this.priceMap.table({ product: id, salesRegion: currentSalesRegion.id }));
                        promises.push(this.getFutureDeliveryTimeDescription(id, currentSalesRegion.id));
                        if (currentUser.hasCustomer) {
                            promises.push(this.getCustomerDiscount.obj({ brand: this.product.brand, customer: currentUser.currentCustomer }));
                        }
                        inventoryAllocationPromises = this.packRows.map(function (v) {
                            return _this.getInventoryAllocationQuery.table({ product: _this.product, pack: v.pack, salesRegion: currentSalesRegion });
                        });
                        promises.push(Promise.all(inventoryAllocationPromises));
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        results = _c.sent();
                        p = 0;
                        this.productChemical = results[p++];
                        if (this.productChemical) {
                            this.product.chemical = this.productChemical.chemical;
                            this.product.purity = this.productChemical.purity;
                        }
                        prices = results[p++];
                        prices.forEach(function (element) {
                            element.vipprice = element.price * (1 - discount);
                            element.currency = currentSalesRegion.currency;
                        });
                        fd = results[p++];
                        discount = 0;
                        if (currentUser.hasCustomer) {
                            discountSetting = results[p++];
                            discount = discountSetting && discountSetting.discount;
                        }
                        allocationResults = results[p++];
                        for (i = 0; i < allocationResults.length; i++) {
                            element = this.packRows[i];
                            element.futureDeliveryTimeDescription = fd;
                            element.inventoryAllocation = allocationResults[i];
                        }
                        ;
                        this.packRows.forEach(function (v) {
                            var price = prices.find(function (x) { return x.pack.id === v.pack.id; });
                            if (price) {
                                var retail = price.retail, vipPrice = price.vipPrice;
                                v.retail = retail;
                                v.vipPrice = vipPrice;
                            }
                            v.currency = currentSalesRegion.currency;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Product;
}());
export { Product };
//# sourceMappingURL=Product.js.map