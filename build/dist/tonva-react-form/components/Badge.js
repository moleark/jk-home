import * as tslib_1 from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import '../css/va-badge.css';
var Badge = /** @class */ (function (_super) {
    tslib_1.__extends(Badge, _super);
    function Badge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Badge.prototype.render = function () {
        var _a = this.props, className = _a.className, badge = _a.badge, size = _a.size, color = _a.color, badgeAlign = _a.badgeAlign, badgeVertical = _a.badgeVertical, children = _a.children;
        var cn = classNames(className, 'va-badge', size && 'va-badge-' + size, 'va-badge-' + (color || 'secondary'), badgeAlign && 'va-badg-' + badgeAlign, badgeVertical && 'va-badg-' + badgeVertical);
        var b;
        if (badge)
            b = React.createElement("b", null, badge);
        return React.createElement("div", { className: cn },
            children,
            b);
    };
    Badge = tslib_1.__decorate([
        observer
    ], Badge);
    return Badge;
}(React.Component));
export { Badge };
//# sourceMappingURL=Badge.js.map