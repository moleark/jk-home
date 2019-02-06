import * as tslib_1 from "tslib";
import * as React from 'react';
import { observable } from 'mobx';
import { Control } from './control';
import { observer } from 'mobx-react';
var PickControl = /** @class */ (function (_super) {
    tslib_1.__extends(PickControl, _super);
    function PickControl() {
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
                        _b = fromPicked(item), id = _b.id, caption = _b.caption;
                        this.value = id;
                        this.caption = caption;
                        return [2 /*return*/];
                }
            });
        }); };
        _this.view = observer(function () {
            var content;
            var Content = _this.face.content;
            if (_this.value === undefined || _this.value === null) {
                content = '请选择';
            }
            /*
            else if (this.caption !== undefined) {
                content = this.caption;
            }*/
            else {
                content = React.createElement(Content, { id: _this.value });
            }
            return React.createElement("div", { className: "form-control-plaintext px-2 border text-primary rounded cursor-pointer bg-light", onClick: _this.onClick }, content);
        });
        return _this;
    }
    PickControl.prototype.setInitValues = function (values) {
        var v = values[this.field.name];
        this.value = v;
    };
    /*
    private controlContent():string|JSX.Element {
        let {content: Content} = this.face;
        if (this.value === undefined) {
            return '请选择';
        }
        
        if (this.caption !== undefined) {
            return this.caption;
        }
        return <Content id={this.value} />;
    }*/
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
    PickControl.prototype.renderControl = function () {
        return React.createElement(this.view, null);
        /*
        let {content:Content} = this.face;
        //if (this.value === undefined) {
            //return <div>no input on idpick</div>;
        //}
        //return <div className="form-control-static ">
        //    <Content />
        //</div>;
        */
    };
    tslib_1.__decorate([
        observable
    ], PickControl.prototype, "caption", void 0);
    return PickControl;
}(Control));
export { PickControl };
//# sourceMappingURL=pickControl.js.map