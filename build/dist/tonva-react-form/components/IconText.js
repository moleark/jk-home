import * as tslib_1 from "tslib";
import * as React from 'react';
import { FA } from './FA';
var IconText = /** @class */ (function (_super) {
    tslib_1.__extends(IconText, _super);
    function IconText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconText.prototype.render = function () {
        var _a = this.props, icon = _a.icon, iconClass = _a.iconClass, text = _a.text, textClass = _a.textClass;
        return React.createElement("div", { className: "py-2" },
            React.createElement(FA, { className: iconClass, name: icon, fixWidth: true }),
            React.createElement("span", { className: textClass }, text));
    };
    return IconText;
}(React.Component));
export { IconText };
//# sourceMappingURL=IconText.js.map