import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { List, FA } from 'tonva-react-form';
var VCategory = /** @class */ (function (_super) {
    tslib_1.__extends(VCategory, _super);
    function VCategory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderChild = function (childWapper) {
            return React.createElement("div", { className: "py-2" },
                React.createElement(FA, { name: "hand-o-right mr-2" }),
                childWapper.name);
        };
        _this.catClick = function (childWapper) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.openMainPage(childWapper)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = function (categoryWaper) {
            var cHome = _this.controller.cApp.cHome;
            var header = cHome.renderSearchHeader();
            var cartLabel = _this.controller.cApp.cCart.renderCartLabel();
            var name = categoryWaper.name, children = categoryWaper.children;
            return React.createElement(Page, { header: header, right: cartLabel },
                React.createElement("h3", null, name),
                React.createElement("hr", null),
                React.createElement(List, { items: children, item: { render: _this.renderChild, onClick: _this.catClick }, className: "bg-white px-2" }));
        };
        return _this;
    }
    VCategory.prototype.showEntry = function (categoryWaper) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, categoryWaper);
                return [2 /*return*/];
            });
        });
    };
    return VCategory;
}(VPage));
export { VCategory };
//# sourceMappingURL=VCategory.js.map