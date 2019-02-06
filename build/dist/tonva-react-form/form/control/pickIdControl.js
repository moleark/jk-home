import * as tslib_1 from "tslib";
import * as React from 'react';
import { observable } from 'mobx';
import { Control } from './control';
var PickIdControl = /** @class */ (function (_super) {
    tslib_1.__extends(PickIdControl, _super);
    function PickIdControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, pick, fromPicked, item, _b, id, caption;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.face, pick = _a.pick, fromPicked = _a.fromPicked;
                        return [4 /*yield*/, pick(this.face, this.formView.props, this.formView.readValues())];
                    case 1:
                        item = _c.sent();
                        if (item === undefined) {
                            this.value = undefined;
                            return [2 /*return*/];
                        }
                        if (fromPicked === undefined) {
                            this.value = item.id;
                            return [2 /*return*/];
                        }
                        _b = fromPicked(item), id = _b.id, caption = _b.caption;
                        this.value = id;
                        this.caption = caption;
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onPicked = function (value) {
            _this.value = value.id;
        };
        return _this;
    }
    PickIdControl.prototype.setInitValues = function (values) {
        var v = values[this.field.name];
        this.value = v;
    };
    PickIdControl.prototype.controlContent = function () {
        var _a = this.face, itemFromId = _a.itemFromId, fromPicked = _a.fromPicked, initCaption = _a.initCaption;
        if (this.value === undefined) {
            return initCaption || '请选择Id';
        }
        if (this.caption !== undefined) {
            return this.caption;
        }
        if (itemFromId !== undefined) {
            if (fromPicked !== undefined) {
                var item = itemFromId(this.value);
                if (item) {
                    var ret = fromPicked(item);
                    if (ret !== undefined)
                        return ret.caption;
                }
            }
        }
        return String(this.value);
    };
    /*
    private buildContent():string|JSX.Element {
        let {tuid, input} = this.face;
        if (input === undefined) {
            //return <div>no input on idpick</div>;
            return <div onClick={this.onClick}>{this.controlContent()}</div>;
        }
        return <input.component id={this.value}
            tuid={tuid}
            input={input}
            entitiesUI={this.formView.props.context}
            params={this.formView.readValues()}
            onPicked={this.onPicked} />;
    }*/
    PickIdControl.prototype.renderControl = function () {
        var _a = this.face, tuid = _a.tuid, input = _a.input;
        if (input === undefined) {
            //return <div>no input on idpick</div>;
            return React.createElement("div", { className: "form-control-plaintext px-2 border text-primary rounded cursor-pointer", onClick: this.onClick }, this.controlContent());
        }
        return React.createElement("div", { className: "form-control-static " },
            React.createElement(input.component, { id: this.value, ui: tuid }));
    };
    tslib_1.__decorate([
        observable
    ], PickIdControl.prototype, "caption", void 0);
    return PickIdControl;
}(Control));
export { PickIdControl };
//# sourceMappingURL=pickIdControl.js.map