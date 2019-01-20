import * as tslib_1 from "tslib";
import * as React from 'react';
import { tv } from 'tonva-react-usql';
import { VProduct } from './VProduct';
import { PageItems, Controller } from 'tonva-tools';
import { VProductList } from './VProductList';
import { Product } from './Product';
var PageProducts = /** @class */ (function (_super) {
    tslib_1.__extends(PageProducts, _super);
    function PageProducts(searchProductQuery) {
        var _this = _super.call(this) || this;
        _this.firstSize = _this.pageSize = 3;
        _this.searchProductQuery = searchProductQuery;
        return _this;
    }
    PageProducts.prototype.load = function (param, pageStart, pageSize) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var key, ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = param.key;
                        if (pageStart === undefined)
                            pageStart = 0;
                        return [4 /*yield*/, this.searchProductQuery.page({ key: key }, pageStart, pageSize)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    PageProducts.prototype.setPageStart = function (item) {
        if (item === undefined)
            return 0;
        return item.id;
    };
    return PageProducts;
}(PageItems));
/*
export interface PackRow {
    pack: any;
    input: HTMLInputElement;
    quantity: number;
}
*/
/**
 *
 */
var CProduct = /** @class */ (function (_super) {
    tslib_1.__extends(CProduct, _super);
    //productBox: BoxId;
    //productChemical: any;
    function CProduct(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.showProductDetail = function (id) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var product;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = new Product(this.cApp);
                        return [4 /*yield*/, product.load(id)];
                    case 1:
                        _a.sent();
                        this.showVPage(VProduct, product);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.cApp = cApp;
        var cUsqProduct = cApp.cUsqProduct, cUsqCustomerDiscount = cApp.cUsqCustomerDiscount, cUsqWarehouse = cApp.cUsqWarehouse;
        var searchProductQuery = cUsqProduct.query("searchProduct");
        _this.pageProducts = new PageProducts(searchProductQuery);
        return _this;
        /*
        this.productTuid = cUsqProduct.tuid('productx');
        this.packTuid = this.productTuid.divs['packx'];
        this.productChemicalMap = cUsqProduct.map('productChemical');
        this.priceMap = cUsqProduct.map('pricex');
        this.getCustomerDiscount = cUsqCustomerDiscount.query("getdiscount");
        this.getInventoryAllocationQuery = cUsqWarehouse.query("getInventoryAllocation");
        this.getFutureDeliveryTime = cUsqProduct.query("getFutureDeliveryTime");
        */
    }
    CProduct.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.showVPage(VProductList, param);
                return [2 /*return*/];
            });
        });
    };
    CProduct.prototype.buildPackRows = function () {
        return;
        /*
        let cardProduct = this.cApp.cCart.cart.items.find(v => v.product.id === this.product.id);
        if (cardProduct === undefined) return [];
        return _.cloneDeep(cardProduct.packs);
        */
        /*
        let packRows = [];
        for (let pk of this.product.packx) {
            let packRow: PackRow = {
                pack: pk,
            } as any;
            // 如果当前产品在购物车中，设置其初始的数量
            let pr2: any = this.cApp.cCart.cart.getItem(pk.id);
            if (pr2)
                packRow.quantity = pr2.quantity;
            packRows.push(packRow);
        }
        return packRows;
        */
    };
    return CProduct;
}(Controller));
export { CProduct };
export function renderBrand(brand) {
    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: "col-4 col-md-2 text-muted" }, "\u54C1\u724C:"),
        React.createElement("div", { className: "col-8 col-md-4" }, brand.name));
}
export function productRow(product, index) {
    return React.createElement("div", { className: "row d-flex" },
        React.createElement("div", { className: "col-12" },
            React.createElement("div", { className: "row py-2" },
                React.createElement("div", { className: "col-12" },
                    React.createElement("strong", null, product.description))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-3" },
                    React.createElement("img", { src: "favicon.ico", alt: "structure" })),
                React.createElement("div", { className: "col-9" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-4 col-md-2 text-muted" }, "CAS:"),
                        React.createElement("div", { className: "col-8 col-md-4" }, product.CAS),
                        React.createElement("div", { className: "col-4 col-md-2 text-muted" }, "\u7EAF\u5EA6:"),
                        React.createElement("div", { className: "col-8 col-md-4" }, product.purity),
                        React.createElement("div", { className: "col-4 col-md-2 text-muted" }, "\u5206\u5B50\u5F0F:"),
                        React.createElement("div", { className: "col-8 col-md-4" }, product.molecularFomula),
                        React.createElement("div", { className: "col-4 col-md-2 text-muted" }, "\u5206\u5B50\u91CF:"),
                        React.createElement("div", { className: "col-8 col-md-4" }, product.molecularWeight),
                        React.createElement("div", { className: "col-4 col-md-2 text-muted" }, "\u4EA7\u54C1\u7F16\u53F7:"),
                        React.createElement("div", { className: "col-8 col-md-4" }, product.origin),
                        tv(product.brand, renderBrand))))));
}
//# sourceMappingURL=CProduct.js.map