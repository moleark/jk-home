import * as tslib_1 from "tslib";
var Product = /** @class */ (function () {
    function Product(cApp) {
        var _this = this;
        this.getInventoryAllocations = function (productId, packId, salesRegionId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var allocation;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInventoryAllocationQuery.table({ product: productId, pack: packId, salesRegion: salesRegionId })];
                    case 1:
                        allocation = _a.sent();
                        return [2 /*return*/, allocation];
                }
            });
        }); };
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
        var cUsqProduct = cApp.cUsqProduct, cUsqCustomerDiscount = cApp.cUsqCustomerDiscount, cUsqWarehouse = cApp.cUsqWarehouse;
        this.productTuid = cUsqProduct.tuid('productx');
        this.packTuid = this.productTuid.divs['packx'];
        this.productChemicalMap = cUsqProduct.map('productChemical');
        this.priceMap = cUsqProduct.map('pricex');
        this.getCustomerDiscount = cUsqCustomerDiscount.query("getdiscount");
        this.getInventoryAllocationQuery = cUsqWarehouse.query("getInventoryAllocation");
        this.getFutureDeliveryTime = cUsqProduct.query("getFutureDeliveryTime");
    }
    Product.prototype.load = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, currentSalesRegion, currentUser, promises, results, p, packx, prices, discount, discountSetting, fd, index, element, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.id = this.productTuid.boxId(id);
                        _a = this.cApp, currentSalesRegion = _a.currentSalesRegion, currentUser = _a.currentUser;
                        promises = [];
                        promises.push(this.productTuid.load(id));
                        promises.push(this.productChemicalMap.obj({ product: id }));
                        promises.push(this.priceMap.table({ product: id, salesRegion: currentSalesRegion.id }));
                        promises.push(this.getFutureDeliveryTimeDescription(id, currentSalesRegion.id));
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        results = _c.sent();
                        p = 0;
                        this.product = results[p++];
                        packx = this.product.packx;
                        this.packRows = packx.map(function (v) { return v; });
                        this.productChemical = results[p++];
                        if (this.productChemical) {
                            this.product.chemical = this.productChemical.chemical;
                            this.product.purity = this.productChemical.purity;
                        }
                        prices = results[p++];
                        discount = 0;
                        if (!currentUser.hasCustomer) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getCustomerDiscount.obj({ brand: this.product.brand, customer: currentUser.currentCustomer })];
                    case 2:
                        discountSetting = _c.sent();
                        discount = discountSetting && discountSetting.discount;
                        _c.label = 3;
                    case 3:
                        prices.forEach(function (element) {
                            element.vipprice = element.price * (1 - discount);
                            element.currency = currentSalesRegion.currency;
                        });
                        fd = results[p++];
                        index = 0;
                        _c.label = 4;
                    case 4:
                        if (!(index < packx.length)) return [3 /*break*/, 7];
                        element = this.product.packx[index];
                        element.futureDeliveryTimeDescription = fd;
                        _b = element;
                        return [4 /*yield*/, this.getInventoryAllocations(this.product.id, element, currentSalesRegion)];
                    case 5:
                        _b.inventoryAllocation = _c.sent();
                        _c.label = 6;
                    case 6:
                        index++;
                        return [3 /*break*/, 4];
                    case 7:
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