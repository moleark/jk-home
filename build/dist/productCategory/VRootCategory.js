import * as tslib_1 from "tslib";
import * as React from 'react';
import { View } from 'tonva-tools';
import { List, LMR } from 'tonva-react-form';
var VRootCategory = /** @class */ (function (_super) {
    tslib_1.__extends(VRootCategory, _super);
    function VRootCategory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.categoryClick = function (categoryWapper) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.openMainPage(categoryWapper)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onRootCategoryRender = function (item, index) {
            var productCategory = item.productCategory, name = item.name, children = item.children;
            var left = React.createElement("div", { className: "h4" }, name);
            return React.createElement("div", { className: "row bg-light py-2" },
                React.createElement("div", { className: "col-12" },
                    React.createElement(LMR, { left: left, right: "\u66F4\u591A...", className: "px-3 cursor-pointer", onClick: function () { return _this.categoryClick(item); } })),
                React.createElement("div", { className: "col-12" },
                    React.createElement("div", { className: "row mx-3 cussor-pointer" }, children && children.map(function (childrenWapper, index) {
                        return React.createElement("div", { className: "col-12 col-md-4 py-2", onClick: function () { return _this.categoryClick(childrenWapper); }, key: index },
                            childrenWapper.name,
                            React.createElement("hr", { className: "my-1" }));
                    }))));
        };
        return _this;
    }
    VRootCategory.prototype.render = function (param) {
        var rootCategories = this.controller.rootCategories;
        return React.createElement(List, { items: rootCategories, item: { render: this.onRootCategoryRender }, className: "mx-1" });
    };
    return VRootCategory;
}(View));
export { VRootCategory };
//# sourceMappingURL=VRootCategory.js.map