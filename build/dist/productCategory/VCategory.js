import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { FA } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { titleTitle, renderThirdCategory } from './VRootCategory';
var VCategory = /** @class */ (function (_super) {
    tslib_1.__extends(VCategory, _super);
    function VCategory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderChild = function (childWapper) {
            return React.createElement("div", { className: "py-2" },
                React.createElement(FA, { name: "hand-o-right mr-2" }),
                childWapper.name);
        };
        _this.categoryClick = function (childWapper, parent) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.openMainPage(childWapper, parent)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.breadCrumb = function (item, parent) {
            return React.createElement("nav", { "arial-babel": "breadcrumb" },
                React.createElement("ol", { className: "breadcrumb" }, tv(item, _this.breadCrumbItem)));
        };
        _this.breadCrumbItem = function (values, parent) {
            if (values === undefined || values.productCategory === undefined)
                return React.createElement(React.Fragment, null);
            return React.createElement(React.Fragment, null,
                tv(values.productCategory.parent, _this.breadCrumbItem),
                React.createElement("li", { className: "breadcrumb-item", onClick: function () { return _this.categoryClick(values, undefined); } }, values.name));
        };
        _this.renderRootCategory = function (item, parent) {
            var productCategory = item.productCategory, name = item.name, children = item.children;
            return React.createElement("div", { className: "bg-white mb-3", key: name },
                React.createElement("div", { className: "py-2 px-3 cursor-pointer", onClick: function () { return _this.categoryClick(item, parent); } },
                    React.createElement("b", null, name)),
                React.createElement("div", { className: "", style: { paddingRight: '1px' } },
                    React.createElement("div", { className: "row no-gutters" }, children.map(function (v) { return _this.renderSubCategory(v, item); }))));
        };
        _this.renderSubCategory = function (item, parent) {
            var name = item.name, children = item.children;
            return React.createElement("div", { key: name, className: "col-6 col-md-4 col-lg-3 cursor-pointer", 
                //style={{borderRight:'1px solid gray', borderBottom:'1px solid gray'}}
                onClick: function () { return _this.categoryClick(item, parent); } },
                React.createElement("div", { className: "pt-1 pb-1 px-2", style: { border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' } },
                    React.createElement("div", { style: titleTitle },
                        React.createElement("span", { className: "ml-1 align-middle" },
                            React.createElement(FA, { name: "chevron-right", className: "text-info small" }),
                            "\u00A0 ",
                            name)),
                    renderThirdCategory(children)));
            // <img src={consts.appIcon} alt="structure" style={imgStyle} />
        };
        _this.page = function (categoryWaper) {
            var cHome = _this.controller.cApp.cHome;
            var header = cHome.renderSearchHeader();
            var cartLabel = _this.controller.cApp.cCart.renderCartLabel();
            var item = categoryWaper.categoryWaper, parent = categoryWaper.parent;
            return React.createElement(Page, { header: header, right: cartLabel }, _this.renderRootCategory(item, parent));
        };
        return _this;
    }
    VCategory.prototype.open = function (categoryWaper) {
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