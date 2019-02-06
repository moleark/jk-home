import * as tslib_1 from "tslib";
import * as React from 'react';
import * as classNames from 'classnames';
import { ListBase } from './base';
import { uid } from '../uid';
var Static = /** @class */ (function (_super) {
    tslib_1.__extends(Static, _super);
    function Static() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Static.prototype.render = function (item, index) {
        var _a = this.list.props.item, className = _a.className, key = _a.key, render = _a.render;
        if (typeof item === 'string') {
            var cn = classNames('va-list-gap', 'px-3', 'pt-1');
            return React.createElement("li", { key: uid(), className: cn }, item);
        }
        return React.createElement("li", { key: key === undefined ? index : key(item), className: classNames(className) }, this.renderContent(item, index));
    };
    return Static;
}(ListBase));
export { Static };
//# sourceMappingURL=static.js.map