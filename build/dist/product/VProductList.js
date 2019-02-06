import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { productRow } from './CProduct';
import { List } from 'tonva-react-form';
import { observer } from 'mobx-react';
//import { cCartApp } from 'ui/CCartApp';
var VProductList = /** @class */ (function (_super) {
    tslib_1.__extends(VProductList, _super);
    function VProductList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onProductClick = function (product) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.controller.showProductDetail(product.id);
                return [2 /*return*/];
            });
        }); };
        _this.onScrollBottom = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.pageProducts.more()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function () {
            var _a = _this.controller, pageProducts = _a.pageProducts, cApp = _a.cApp;
            var header = cApp.cHome.renderSearchHeader();
            var cart = cApp.cCart.renderCartLabel();
            return React.createElement(Page, { header: header, right: cart, onScrollBottom: _this.onScrollBottom },
                React.createElement(List, { before: '', items: pageProducts, item: { render: productRow, onClick: _this.onProductClick } }));
        });
        return _this;
    }
    VProductList.prototype.showEntry = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var key;
            return tslib_1.__generator(this, function (_a) {
                key = param;
                this.controller.pageProducts.first({ key: key });
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    return VProductList;
}(VPage));
export { VProductList };
//# sourceMappingURL=VProductList.js.map