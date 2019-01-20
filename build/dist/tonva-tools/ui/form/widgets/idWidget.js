import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
import { observable } from 'mobx';
var IdWidget = /** @class */ (function (_super) {
    tslib_1.__extends(IdWidget, _super);
    function IdWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var pickId, id;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pickId = this.ui && this.ui.pickId;
                        if (pickId === undefined) {
                            alert('no pickId defined!');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, pickId(this.context, this.name, this.value)];
                    case 1:
                        id = _a.sent();
                        this.setDataValue(id);
                        this.clearError();
                        this.clearContextError();
                        this.checkRules();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    IdWidget.prototype.setReadOnly = function (value) { this.readOnly = value; };
    IdWidget.prototype.setDisabled = function (value) { this.disabled = value; };
    IdWidget.prototype.render = function () {
        var placeholder, Templet;
        if (this.ui !== undefined) {
            placeholder = this.ui.placeholder;
            Templet = this.ui.Templet;
        }
        var cn = {
            'form-control': true,
            'required-item': this.itemSchema.required === true,
            'cursor-pointer': true,
            'is-invalid': this.hasError,
        };
        var content;
        if (this.value === undefined || this.value === null) {
            content = placeholder || 'placeholder';
            cn['text-muted'] = true;
        }
        else if (Templet === undefined) {
            content = React.createElement(React.Fragment, null, this.value);
        }
        else if (typeof Templet === 'function') {
            content = Templet(this.value);
        }
        else {
            content = Templet;
        }
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: classNames(cn), onClick: this.onClick }, content),
            this.renderErrors());
    };
    tslib_1.__decorate([
        observable
    ], IdWidget.prototype, "value", void 0);
    return IdWidget;
}(Widget));
export { IdWidget };
//# sourceMappingURL=idWidget.js.map