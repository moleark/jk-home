import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { observable } from 'mobx';
import { Widget } from './widget';
var SelectWidget = /** @class */ (function (_super) {
    tslib_1.__extends(SelectWidget, _super);
    function SelectWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInputChange = function (evt) {
            _this.setDataValue(evt.target.value);
        };
        return _this;
    }
    SelectWidget.prototype.setElementValue = function (value) { this.select.value = value; };
    SelectWidget.prototype.setReadOnly = function (value) { this.select.disabled = this.readOnly = !value; };
    SelectWidget.prototype.setDisabled = function (value) { this.select.disabled = this.disabled = value; };
    SelectWidget.prototype.render = function () {
        var _this = this;
        if (this.readOnly === true) {
            var option = this.ui.list.find(function (v) { return v.value === _this.value; });
            var title = (option === undefined) ? '(???)' : option.title;
            return React.createElement("span", { className: "form-control w-min-6c" }, title);
        }
        return React.createElement("select", { ref: function (select) { return _this.select = select; }, className: classNames(this.className, 'form-control'), defaultValue: this.defaultValue, onChange: this.onInputChange }, this.ui.list.map(function (v, index) {
            var title = v.title, value = v.value;
            var cn;
            //if (value === undefined || value === null) cn = 'text-light small';
            //else cn = 'text-danger';
            return React.createElement("option", { className: cn, key: index, value: value }, title || value);
        }));
    };
    tslib_1.__decorate([
        observable
    ], SelectWidget.prototype, "readOnly", void 0);
    return SelectWidget;
}(Widget));
export { SelectWidget };
//# sourceMappingURL=selectWidget.js.map