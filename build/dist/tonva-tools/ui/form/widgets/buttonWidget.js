import * as tslib_1 from "tslib";
import * as React from 'react';
import { Unknown } from './unknown';
import { Widget } from './widget';
import { observer } from 'mobx-react';
var ButtonWidget = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonWidget, _super);
    function ButtonWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, name, type, onButtonClick, ret;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.clearError();
                        this.clearContextError();
                        _a = this.itemSchema, name = _a.name, type = _a.type;
                        if (type === 'submit') {
                            this.context.checkRules();
                            if (this.context.hasError === true) {
                                return [2 /*return*/];
                            }
                        }
                        onButtonClick = this.context.form.props.onButtonClick;
                        if (onButtonClick === undefined) {
                            alert("button " + name + " clicked. you should define form onButtonClick");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, onButtonClick(name, this.context)];
                    case 1:
                        ret = _b.sent();
                        if (ret === undefined)
                            return [2 /*return*/];
                        this.context.setError(name, ret);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.observerRender = observer(function () {
            var _a = _this.itemSchema, name = _a.name, type = _a.type;
            var Templet, cn, label;
            if (_this.ui !== undefined) {
                var widgetType = _this.ui.widget;
                if (widgetType !== 'button')
                    return Unknown(type, widgetType, ['button']);
                Templet = _this.ui.Templet;
                cn = _this.ui.className;
                label = _this.ui.label;
            }
            var _b = _this.context, form = _b.form, hasError = _b.hasError;
            var context = _this.context;
            var disabled = type === 'submit' && hasError;
            var content;
            if (_this.children !== undefined)
                content = _this.children;
            else if (typeof Templet === 'function')
                content = Templet();
            else if (Templet !== undefined)
                content = Templet;
            else
                content = label;
            var button = React.createElement("button", { className: cn, type: "button", disabled: disabled, onClick: _this.onClick }, content || name);
            if (context.inNode === true)
                return React.createElement(React.Fragment, null,
                    button,
                    _this.renderErrors());
            return React.createElement("div", { className: form.ButtonClass },
                React.createElement("div", null, _this.renderErrors()),
                button);
        });
        return _this;
    }
    ButtonWidget.prototype.render = function () {
        return React.createElement(this.observerRender, null);
    };
    ButtonWidget.prototype.renderContainer = function () {
        if (this.visible === false)
            return null;
        var _a = this.context, form = _a.form, inNode = _a.inNode;
        if (inNode === true)
            return this.render();
        return form.FieldContainer(null, this.render());
    };
    return ButtonWidget;
}(Widget));
export { ButtonWidget };
//# sourceMappingURL=buttonWidget.js.map