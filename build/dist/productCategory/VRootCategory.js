import * as tslib_1 from "tslib";
import * as React from 'react';
import { View } from 'tonva-tools';
import { FA } from 'tonva-react-form';
var imgStyle = {
    height: '1.5rem', width: '1.5rem',
    marginLeft: '0.1rem',
    marginRight: '0.3rem'
};
export var titleTitle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};
export var subStyle = {
    fontSize: '0.75rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};
var VRootCategory = /** @class */ (function (_super) {
    tslib_1.__extends(VRootCategory, _super);
    function VRootCategory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.categoryClick = function (categoryWapper, parent) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.openMainPage(categoryWapper, parent)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.renderRootCategory = function (item, parent) {
            var name = item.name, children = item.children;
            return React.createElement("div", { className: "bg-white mb-3", key: name },
                React.createElement("div", { className: "py-2 px-3 cursor-pointer", onClick: function () { return _this.categoryClick(item, undefined); } },
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
                            React.createElement(FA, { name: "chevron-circle-right", className: "text-info" }),
                            "\u00A0 ",
                            name)),
                    renderThirdCategory(children)));
            // <img src={consts.appIcon} alt="structure" style={imgStyle} />
        };
        return _this;
    }
    VRootCategory.prototype.render = function (param) {
        var _this = this;
        var categories = this.controller.categories;
        return React.createElement(React.Fragment, null, categories.map(function (v) { return _this.renderRootCategory(v, undefined); }));
    };
    return VRootCategory;
}(View));
export { VRootCategory };
export function renderThirdCategory(items) {
    return React.createElement("div", { className: "py-1 text-muted small", style: subStyle }, items.length === 0 ? React.createElement(React.Fragment, null, "\u00A0") : items.map(function (v) { return v.name; }).join(' / '));
}
//# sourceMappingURL=VRootCategory.js.map