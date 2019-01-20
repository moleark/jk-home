import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { UpdownWidget } from 'tonva-tools/ui/form/widgets';
var keys = [107, 109, 110, 187, 189];
var MinusPlusWidget = /** @class */ (function (_super) {
    tslib_1.__extends(MinusPlusWidget, _super);
    function MinusPlusWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minusClick = function () {
            var v = _this.getValue();
            if (!v)
                v = 0;
            _this.setValue(v - 1);
        };
        _this.plusClick = function () {
            var v = _this.getValue();
            if (!v)
                v = 0;
            _this.setValue(v + 1);
        };
        _this.ref = function (input) {
            _this.input = input;
            if (_this.input === null)
                return;
            var p;
            for (p = _this.input;; p = p.parentElement) {
                if (!p)
                    break;
                if (p.tagName !== 'FIELDSET')
                    continue;
                if (p['disabled'] === true) {
                    _this.disabled = true;
                }
                break;
            }
        };
        _this.renderContent = observer(function () {
            var renderTemplet = _this.renderTemplet();
            if (renderTemplet !== undefined)
                return renderTemplet;
            var cn = {
            //'form-control': true,
            };
            if (_this.hasError === true) {
                cn['is-invalid'] = true;
            }
            else {
                cn['required-item'] = _this.itemSchema.required === true;
            }
            var hasFocus = _this.hasFocus; // document.hasFocus() && document.activeElement === this.input;
            var hasAction = _this.readOnly !== true && _this.disabled !== true;
            var hasValue = _this.value !== NaN && _this.value !== undefined && _this.value > 0;
            var cursorPointer, color, minusClick, plusClick;
            if (_this.disabled === true) {
                cursorPointer = 'cursor-pointer';
                color = 'text-light';
            }
            else {
                minusClick = _this.minusClick;
                plusClick = _this.plusClick;
                color = 'text-danger';
            }
            var minus = React.createElement("i", { className: classNames('fa', 'fa-minus-circle', 'fa-lg', color, cursorPointer, { invisible: !(hasFocus === true || hasAction === true && hasValue === true) }), onClick: minusClick });
            var input = React.createElement("input", { ref: _this.ref, className: classNames(_this.className, cn, 'mx-1 w-4c form-control', { invisible: !(hasFocus === true || hasValue === true) }), type: "text", defaultValue: _this.value, onChange: _this.onInputChange, placeholder: _this.placeholder, readOnly: _this.readOnly, disabled: _this.disabled, onKeyDown: _this.onKeyDown, onFocus: function () { return _this.onFocus(); }, onBlur: function () { return _this.onBlur(); }, maxLength: 10 });
            var plus = React.createElement("i", { className: classNames('fa fa-plus-circle fa-lg', color, cursorPointer, { invisible: !(hasAction === true) }), onClick: plusClick });
            return React.createElement("div", { className: "d-flex align-items-center" },
                minus,
                input,
                plus,
                _this.renderErrors());
        });
        return _this;
    }
    MinusPlusWidget.prototype.isValidKey = function (key) {
        if (keys.find(function (v) { return v === key; }) !== undefined)
            return false;
        return _super.prototype.isValidKey.call(this, key);
    };
    MinusPlusWidget.prototype.onBlur = function () {
        _super.prototype.onBlur.call(this);
        this.hasFocus = false;
    };
    MinusPlusWidget.prototype.onFocus = function () {
        _super.prototype.onFocus.call(this);
        this.hasFocus = true;
    };
    MinusPlusWidget.prototype.render = function () {
        return React.createElement(this.renderContent, null);
    };
    tslib_1.__decorate([
        observable
    ], MinusPlusWidget.prototype, "value", void 0);
    tslib_1.__decorate([
        observable
    ], MinusPlusWidget.prototype, "disabled", void 0);
    tslib_1.__decorate([
        observable
    ], MinusPlusWidget.prototype, "hasFocus", void 0);
    return MinusPlusWidget;
}(UpdownWidget));
export { MinusPlusWidget };
//# sourceMappingURL=minusPlusWidget.js.map