import * as tslib_1 from "tslib";
import * as React from 'react';
import { observable } from 'mobx';
import { Control } from './control';
var PickTuidControl = /** @class */ (function (_super) {
    tslib_1.__extends(PickTuidControl, _super);
    function PickTuidControl(formView, field, face) {
        var _this = _super.call(this, formView, field, face) || this;
        _this.onIdChanged = _this.onIdChanged.bind(_this);
        return _this;
        //this.onClick = this.onClick.bind(this);
    }
    /*
    private async onClick() {
        let {pick, fromPicked} = this.face;
        let item = await pick(this.face, this.formView.props, this.formView.readValues());
        if (item === undefined) {
            this.value = undefined;
            return;
        }
        if (fromPicked === undefined) {
            this.value = item.id;
            return;
        }
        let {id, caption} = fromPicked(item);
        this.value = id;
        this.caption = caption;
    }*/
    PickTuidControl.prototype.onIdChanged = function (id) {
        this.value = id.id;
    };
    PickTuidControl.prototype.setInitValues = function (values) {
        var v = values[this.field.name];
        this.value = v;
    };
    PickTuidControl.prototype.buildContent = function () {
        var _this = this;
        //let {tuid, input} = this.face;
        return React.createElement(this.face.input.component, tslib_1.__assign({}, this.face, { id: this.value, 
            //ui={this.face.ui}
            //input={input}
            //entitiesUI={this.formView.props.context} 
            onFormValues: function () { return _this.formView.readValues(); }, onIdChanged: this.onIdChanged }));
    };
    PickTuidControl.prototype.renderControl = function () {
        return React.createElement("div", { className: "form-control-static " }, this.buildContent());
    };
    tslib_1.__decorate([
        observable
    ], PickTuidControl.prototype, "caption", void 0);
    return PickTuidControl;
}(Control));
export { PickTuidControl };
/*
<button className="form-control btn btn-outline-info"
type="button"
style={{textAlign:'left', paddingLeft:'0.75rem'}}
onClick={this.onClick}>
{this.buildContent()}
</button>
*/ 
//# sourceMappingURL=pickTuidControl.js.map