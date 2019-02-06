import * as tslib_1 from "tslib";
import * as React from 'react';
import * as classNames from 'classnames';
import { ListBase } from './base';
var Clickable = /** @class */ (function (_super) {
    tslib_1.__extends(Clickable, _super);
    function Clickable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Clickable.prototype.render = function (item, index) {
        var _a = this.list.props.item, className = _a.className, key = _a.key, onClick = _a.onClick;
        return React.createElement("li", { key: key === undefined ? index : key(item), className: classNames('va-row-clickable', className), onClick: function () { return onClick(item); } }, this.renderContent(item, index));
    };
    return Clickable;
}(ListBase));
export { Clickable };
//# sourceMappingURL=clickable.js.map