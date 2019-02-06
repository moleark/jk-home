import * as tslib_1 from "tslib";
import * as React from 'react';
import { computed } from 'mobx';
import * as classNames from 'classnames';
import { ListBase } from './base';
import { uid } from '../uid';
var Selectable = /** @class */ (function (_super) {
    tslib_1.__extends(Selectable, _super);
    function Selectable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Selectable.prototype.buildItems = function () {
        console.log('buildItems in selectable.tsx');
        var _a = this.list.props, items = _a.items, selectedItems = _a.selectedItems, compare = _a.compare;
        var itemsArray;
        if (items === undefined) {
            return this._items = undefined;
        }
        if (items === null) {
            return this._items = null;
        }
        if (Array.isArray(items) === true) {
            itemsArray = items;
        }
        else {
            itemsArray = items.items;
        }
        //let items = this.items;
        this._selectedItems = selectedItems;
        if (selectedItems === undefined) {
            return this._items = itemsArray.map(function (v) {
                return {
                    selected: false,
                    item: v,
                    labelId: uid()
                };
            });
        }
        if (compare === undefined) {
            return this._items = itemsArray.map(function (v) {
                return {
                    selected: selectedItems.find(function (si) { return si === v; }) !== undefined,
                    item: v,
                    labelId: uid()
                };
            });
        }
        return this._items = itemsArray.map(function (v) {
            return {
                selected: selectedItems.find(function (si) { return compare(v, si); }) !== undefined,
                item: v,
                labelId: uid()
            };
        });
    };
    Object.defineProperty(Selectable.prototype, "items", {
        get: function () {
            //if (this._items === undefined) 
            this.buildItems();
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Selectable.prototype.updateProps = function (nextProps) {
        if (nextProps.selectedItems === this._selectedItems)
            return;
        this.buildItems();
    };
    Selectable.prototype.onSelect = function (item, selected) {
        item.selected = selected;
        var anySelected = this._items.some(function (v) { return v.selected; });
        this.list.props.item.onSelect(item.item, selected, anySelected);
    };
    Object.defineProperty(Selectable.prototype, "selectedItems", {
        get: function () {
            return this._items.filter(function (v) { return v.selected === true; }).map(function (v) { return v.item; });
        },
        enumerable: true,
        configurable: true
    });
    /*
    set selectedItems(value: any[]) {
        if (value === undefined) return;
        if (this._items === undefined) return;
        let sLen = this._items.length;
        let list = value.slice();
        for (let n=0; n<sLen; n++) {
            let sItem = this._items[n];
            let len = list.length;
            if (len === 0) break;
            let item = sItem.item;
            for (let i=0; i<len; i++) {
                let v = list[i];
                if (item === v) {
                    sItem.selected = true;
                    value.splice(i, 1);
                    break;
                }
            }
        };
    }
    */
    //w-100 mb-0 pl-3
    //m-0 w-100
    Selectable.prototype.render = function (item, index) {
        var _this = this;
        var _a = this.list.props.item, className = _a.className, key = _a.key, render = _a.render, onSelect = _a.onSelect;
        var labelId = item.labelId, selected = item.selected;
        return React.createElement("li", { key: key === undefined ? index : key(item), className: classNames(className) },
            React.createElement("div", { className: "d-flex align-items-center px-3" },
                React.createElement("input", { ref: function (input) {
                        if (!input)
                            return;
                        _this.input = input;
                        input.checked = selected;
                    }, className: "", type: "checkbox", value: "", id: labelId, defaultChecked: selected, onChange: function (e) {
                        _this.onSelect(item, e.target.checked);
                    } }),
                React.createElement("label", { className: "", style: { flex: 1, marginBottom: 0 }, htmlFor: labelId }, this.renderContent(item.item, index))));
    };
    tslib_1.__decorate([
        computed
    ], Selectable.prototype, "items", null);
    return Selectable;
}(ListBase));
export { Selectable };
/*
<label>
<label className="custom-control custom-checkbox">
    <input type='checkbox' className="custom-control-input"
        //checked={selected}
        onChange={(e)=>this.onSelect(item, e.target.checked)} />
    <span className="custom-control-indicator" />
</label>
{this.renderContent(item.item, index)}
</label>
*/
//# sourceMappingURL=selectable.js.map