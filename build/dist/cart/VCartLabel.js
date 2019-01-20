import * as tslib_1 from "tslib";
import * as React from 'react';
import { View } from 'tonva-tools';
import { observer } from 'mobx-react';
var VCartLabel = /** @class */ (function (_super) {
    tslib_1.__extends(VCartLabel, _super);
    function VCartLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showCart = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.start()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.content = observer(function () {
            return React.createElement("div", null,
                React.createElement("button", { className: "btn btn-info btn-sm", onClick: _this.showCart },
                    "Cart: ",
                    React.createElement("span", { className: "badge badge-light" }, _this.controller.cart.count.get())));
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