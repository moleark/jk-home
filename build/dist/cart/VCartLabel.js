import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { View } from 'tonva-tools';
import { observer } from 'mobx-react';
var VCartLabel = /** @class */ (function (_super) {
    tslib_1.__extends(VCartLabel, _super);
    function VCartLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showCart = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var cApp;
            return tslib_1.__generator(this, function (_a) {
                cApp = this.controller.cApp;
                cApp.showMain('cart');
                return [2 /*return*/];
            });
        }); };
        _this.content = observer(function () {
            var cart = _this.controller.cart;
            var count = cart.count.get();
            var badge, onClick, pointer;
            if (count > 0) {
                onClick = _this.showCart;
                pointer = 'cursor-pointer';
                if (count < 100)
                    badge = React.createElement("u", null, count);
                else
                    badge = React.createElement("u", null, "99+");
            }
            return React.createElement("div", { className: classNames('jk-cart ml-1 mr-2', pointer), onClick: onClick },
                React.createElement("div", null,
                    React.createElement("span", { className: "fa-stack" },
                        React.createElement("i", { className: "fa fa-square fa-stack-2x text-white" }),
                        React.createElement("i", { className: "fa fa-shopping-cart fa-stack-1x text-info" })),
                    badge));
        });
        return _this;
    }
    VCartLabel.prototype.render = function (param) {
        return React.createElement(this.content, null);
    };
    ;
    return VCartLabel;
}(View));
export { VCartLabel };
//# sourceMappingURL=VCartLabel.js.map