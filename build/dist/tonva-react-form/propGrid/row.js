import * as tslib_1 from "tslib";
import * as React from 'react';
import * as className from 'classnames';
var PropRow = /** @class */ (function () {
    function PropRow() {
    }
    PropRow.prototype.setValues = function (values) { };
    return PropRow;
}());
export { PropRow };
var PropBorder = /** @class */ (function (_super) {
    tslib_1.__extends(PropBorder, _super);
    function PropBorder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropBorder.prototype.render = function (key) {
        return React.createElement("div", { key: '_b_' + key, className: "" },
            React.createElement("div", { className: "col-sm-12" },
                React.createElement("div", { style: { borderTop: '1px solid #f0f0f0' } })));
    };
    return PropBorder;
}(PropRow));
export { PropBorder };
var PropGap = /** @class */ (function (_super) {
    tslib_1.__extends(PropGap, _super);
    function PropGap(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        return _this;
    }
    PropGap.prototype.render = function (key) {
        var w;
        switch (this.param) {
            default:
                w = 'py-2';
                break;
            case '=':
                w = 'py-1';
                break;
            case '-':
                w = 'pb-1';
                break;
        }
        var cn = className(w);
        return React.createElement("div", { key: '_g_' + key, className: cn, style: { backgroundColor: '#f0f0f0' } });
    };
    return PropGap;
}(PropRow));
export { PropGap };
var valueAlignStart = 'justify-content-start';
var valueAlignCenter = 'justify-content-center';
var valueAlignEnd = 'justify-content-end';
var LabeledPropRow = /** @class */ (function (_super) {
    tslib_1.__extends(LabeledPropRow, _super);
    //protected values: any;
    function LabeledPropRow(gridProps, prop) {
        var _this = _super.call(this) || this;
        _this.gridProps = gridProps;
        _this.prop = prop;
        return _this;
        //this.values = values;
    }
    LabeledPropRow.prototype.render = function (key) {
        var _a = this.prop, onClick = _a.onClick, bk = _a.bk;
        var cn = className({
            "cursor-pointer": onClick !== undefined,
            "bg-white": bk === undefined,
            "row": true
        });
        return React.createElement("div", { key: key, className: cn, onClick: onClick },
            this.renderLabel(),
            this.renderProp());
    };
    LabeledPropRow.prototype.renderLabel = function () {
        var label = this.prop.label;
        if (label === undefined)
            return null;
        return React.createElement("label", { className: "col-sm-2 col-form-label" }, label);
    };
    LabeledPropRow.prototype.renderProp = function () {
        var _a = this.prop, label = _a.label, full = _a.full;
        var align, vAlign;
        switch (this.gridProps.alignValue) {
            case 'left':
                align = valueAlignStart;
                break;
            case 'center':
                align = valueAlignCenter;
                break;
            case 'right':
                align = valueAlignEnd;
                break;
        }
        switch (this.prop.vAlign) {
            case 'top':
                vAlign = 'align-items-start';
                break;
            default:
            case 'center':
                vAlign = 'align-items-center';
                break;
            case 'bottom':
                vAlign = 'align-items-end';
                break;
            case 'stretch':
                vAlign = 'align-items-stretch';
                break;
        }
        var col;
        if (full !== true)
            col = label === undefined ? 'col-sm-12' : 'col-sm-10';
        else
            col = 'w-100';
        var cn = className(align, vAlign, col, 'd-flex');
        return React.createElement("div", { className: cn }, this.renderPropBody());
    };
    LabeledPropRow.prototype.renderPropBody = function () {
        return React.createElement("div", { className: "form-control-plaintext" }, this.renderPropContent());
    };
    LabeledPropRow.prototype.renderPropContent = function () {
        return this.content;
    };
    return LabeledPropRow;
}(PropRow));
export { LabeledPropRow };
var StringPropRow = /** @class */ (function (_super) {
    tslib_1.__extends(StringPropRow, _super);
    function StringPropRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringPropRow.prototype.setValues = function (values) {
        if (values === undefined)
            this.content = undefined;
        else
            this.content = values[this.prop.name];
    };
    return StringPropRow;
}(LabeledPropRow));
export { StringPropRow };
var NumberPropRow = /** @class */ (function (_super) {
    tslib_1.__extends(NumberPropRow, _super);
    function NumberPropRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberPropRow.prototype.setValues = function (values) {
        if (values === undefined)
            this.content = undefined;
        else
            this.content = values[this.prop.name];
    };
    return NumberPropRow;
}(LabeledPropRow));
export { NumberPropRow };
var ListPropRow = /** @class */ (function (_super) {
    tslib_1.__extends(ListPropRow, _super);
    function ListPropRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListPropRow.prototype.setValues = function (values) {
        if (values === undefined)
            this.content = undefined;
        else {
            var list = this.prop.list;
            if (typeof list === 'string')
                this.content = values[list];
            else
                this.content = undefined;
        }
    };
    ListPropRow.prototype.renderPropBody = function () {
        var _a = this.prop, list = _a.list, row = _a.row;
        var items = typeof list === 'string' ? this.content : list;
        if (items === undefined)
            return React.createElement("div", null);
        // new row(item)
        return React.createElement("div", { className: "w-100" }, items.map(function (item, index) { return React.createElement(React.Fragment, { key: index },
            index === 0 ? null : React.createElement("div", { style: { width: '100%', borderBottom: '1px solid #f0f0f0' } }),
            React.createElement(row, item)); }));
    };
    return ListPropRow;
}(LabeledPropRow));
export { ListPropRow };
var ComponentPropRow = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentPropRow, _super);
    function ComponentPropRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentPropRow.prototype.renderPropBody = function () {
        var component = this.prop.component;
        return component;
    };
    return ComponentPropRow;
}(LabeledPropRow));
export { ComponentPropRow };
var PropContainer = /** @class */ (function (_super) {
    tslib_1.__extends(PropContainer, _super);
    function PropContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropContainer.prototype.render = function (key) {
        return React.createElement("div", { className: "bg-white" },
            React.createElement("label", { className: "col-sm-2 col-form-label" }, "AAABBBCCC"),
            React.createElement("div", { className: "col-sm-10" },
                React.createElement("div", { className: "form-control-plaintext" }, "dsfasfa sdf asdf a")));
    };
    return PropContainer;
}(PropRow));
export { PropContainer };
//# sourceMappingURL=row.js.map