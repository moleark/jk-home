import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
var Link = /** @class */ (function () {
    function Link() {
    }
    return Link;
}());
export { Link };
var CLink = /** @class */ (function (_super) {
    tslib_1.__extends(CLink, _super);
    function CLink(controller) {
        var _this = _super.call(this) || this;
        _this.onClick = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.start()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.controller = controller;
        _this.icon = controller.icon;
        _this.label = controller.label;
        return _this;
    }
    CLink.prototype.render = function (className) {
        return React.createElement("div", { className: classNames('px-3', 'py-2', 'align-items-center', 'cursor-pointer', className), onClick: this.onClick },
            this.icon,
            " \u00A0 ",
            this.label);
        //return React.createElement(this.view, className);
    };
    return CLink;
}(Link));
export { CLink };
//# sourceMappingURL=cLink.js.map