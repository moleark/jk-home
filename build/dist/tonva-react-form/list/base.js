import * as tslib_1 from "tslib";
import * as React from 'react';
import { computed } from 'mobx';
var ListBase = /** @class */ (function () {
    function ListBase(list) {
        this.list = list;
    }
    Object.defineProperty(ListBase.prototype, "isPaged", {
        get: function () {
            var items = this.list.props.items;
            return (items !== null && items !== undefined && Array.isArray(items) === false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBase.prototype, "items", {
        get: function () {
            var items = this.list.props.items;
            if (items === null)
                return null;
            if (items === undefined)
                return undefined;
            if (Array.isArray(items) === true)
                return items;
            else
                return items.items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBase.prototype, "loading", {
        get: function () {
            var items = this.list.props.items;
            if (items === null)
                return false;
            if (items === undefined)
                return true;
            var pageItems = items;
            if (pageItems.items === undefined)
                return false;
            return pageItems.loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBase.prototype, "selectedItems", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    ListBase.prototype.updateProps = function (nextProps) { };
    ListBase.prototype.renderContent = function (item, index) {
        var render = this.list.props.item.render;
        if (render === undefined)
            return React.createElement("div", { className: "px-3 py-2" }, JSON.stringify(item));
        return render(item, index);
    };
    tslib_1.__decorate([
        computed
    ], ListBase.prototype, "loading", null);
    return ListBase;
}());
export { ListBase };
//# sourceMappingURL=base.js.map