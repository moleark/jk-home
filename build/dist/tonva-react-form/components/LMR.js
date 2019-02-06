import * as tslib_1 from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import '../css/va-lmr.css';
var LMR = /** @class */ (function (_super) {
    tslib_1.__extends(LMR, _super);
    function LMR() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LMR.prototype.render = function () {
        var _a = this.props, className = _a.className, left = _a.left, children = _a.children, right = _a.right, onClick = _a.onClick;
        var l, r;
        if (left !== undefined)
            l = React.createElement("header", null, left);
        if (right !== undefined)
            r = React.createElement("footer", null, right);
        var cursor;
        if (onClick !== undefined)
            cursor = 'cursor-pointer';
        return React.createElement("div", { className: classNames('va-lmr', className, cursor), onClick: onClick },
            l,
            React.createElement("div", null, children),
            r);
    };
    LMR = tslib_1.__decorate([
        observer
    ], LMR);
    return LMR;
}(React.Component));
export { LMR };
//# sourceMappingURL=LMR.js.map