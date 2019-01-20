import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
//const radioStyle:React.CSSProperties = {width:'2em', height:'1.2em'};
var RadioWidget = /** @class */ (function (_super) {
    tslib_1.__extends(RadioWidget, _super);
    function RadioWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputs = {};
        return _this;
    }
    RadioWidget.prototype.setElementValue = function (value) {
        for (var i in this.inputs) {
            var input = this.inputs[i];
            input.checked = value === input.value;
        }
    };
    RadioWidget.prototype.setReadOnly = function (value) {
        this.readOnly = value;
        for (var i in this.inputs)
            this.inputs[i].readOnly = value;
    };
    RadioWidget.prototype.setDisabled = function (value) {
        this.disabled = value;
        for (var i in this.inputs)
            this.inputs[i].disabled = value;
    };
    RadioWidget.prototype.render = function () {
        var _this = this;
        var _a = this.ui, defaultValue = _a.defaultValue, list = _a.list;
        var _b = this.context, isRow = _b.isRow, inNode = _b.inNode;
        var rowKey;
        if (isRow === true) {
            rowKey = this.context.rowKey;
        }
        var cn = classNames(this.className, 'form-radio-inline');
        return React.createElement("span", { className: cn }, list.map(function (v, index) {
            var value = v.value, title = v.title;
            var name = _this.name;
            if (rowKey !== undefined)
                name += '-' + rowKey;
            return React.createElement("label", { key: index, className: "form-radio-inline" },
                React.createElement("input", { ref: function (input) { return _this.inputs[index] = input; }, type: "radio", name: name, value: value, defaultChecked: (_this.defaultValue || defaultValue) === value }),
                title || value);
            //</span>
        }));
    };
    return RadioWidget;
}(Widget));
export { RadioWidget };
/*
<div className="form-control d-flex border-0"><input
ref={(input)=>this.input = input}
className={classNames(this.className, 'align-self-center')}
type="checkbox"
style={{maxHeight:"1.2em"}}
defaultValue={this.defaultValue}
onChange={this.onChange} />
</div>
*/ 
//# sourceMappingURL=radioWidget.js.map