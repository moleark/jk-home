import * as tslib_1 from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import className from 'classnames';
import { List, LMR, FA } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { tv } from '../../tools';
import { VEntity } from '../CVEntity';
import { PureJSONContent } from '../form/viewModel';
var VMapMain = /** @class */ (function (_super) {
    tslib_1.__extends(VMapMain, _super);
    function VMapMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemRender = function (item, index) {
            return React.createElement(_this.ItemRow, { item: item });
        };
        _this.ItemRow = observer(function (_a) {
            var item = _a.item;
            var tuid = item.tuid, box = item.box, children = item.children, isLeaf = item.isLeaf, keyIndex = item.keyIndex, values = item.values;
            var keyUI = _this.controller.keyUIs[keyIndex];
            var keyContent = keyUI.content, valuesContent = keyUI.valuesContent, keyNone = keyUI.none;
            var add, remove;
            if (_this.isFrom === false) {
                add = React.createElement("button", { className: "btn btn-link btn-sm", onClick: function () { return _this.controller.addClick(item); } },
                    React.createElement(FA, { name: "plus" }));
                remove = React.createElement("button", { className: "btn btn-link btn-sm", onClick: function () { return _this.controller.removeClick(item); } },
                    React.createElement(FA, { className: "text-info", name: "trash" }));
            }
            var right;
            if (isLeaf === false) {
                if (keyIndex === 0)
                    right = add;
                else
                    right = React.createElement(React.Fragment, null,
                        remove,
                        " \u00A0 ",
                        add);
            }
            else if (keyIndex > 0) {
                right = remove;
            }
            var content, border, valuesView;
            if (isLeaf === true) {
                content = undefined; //<div className="ml-5">leaf</div>;
                if (values) {
                    //valuesView = null; // 现在不显示values content了
                    valuesView = (valuesContent || PureJSONContent)(values, _this.x);
                }
            }
            else {
                border = "border-bottom";
                var none = keyNone && keyNone(_this.x);
                content = React.createElement(List, { className: "ml-4", items: children, item: { onClick: undefined, render: _this.itemRender }, none: none });
            }
            return React.createElement("div", { className: "d-flex flex-column" },
                React.createElement(LMR, { className: className('px-3', 'py-2', border), right: right },
                    React.createElement("div", { className: "py-1" }, tv(box, keyContent, _this.x)),
                    React.createElement("div", { className: "py-1 font-weight-bold" }, valuesView)),
                content);
        });
        return _this;
    }
    VMapMain.prototype.showEntry = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.isFrom = this.controller.isFrom;
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(VMapMain.prototype, "view", {
        get: function () {
            var _this = this;
            return function () { return React.createElement(Page, { header: _this.label },
                React.createElement(List, { items: _this.controller.items, item: { className: 'my-2', onClick: undefined, render: _this.itemRender } })); };
        },
        enumerable: true,
        configurable: true
    });
    ;
    return VMapMain;
}(VEntity));
export { VMapMain };
//# sourceMappingURL=vMain.js.map