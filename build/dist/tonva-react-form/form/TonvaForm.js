import * as tslib_1 from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import { FormView } from './formView';
export function tonvaDebug() {
    var a = 0;
}
var TonvaForm = /** @class */ (function (_super) {
    tslib_1.__extends(TonvaForm, _super);
    function TonvaForm(props) {
        var _this = _super.call(this, props) || this;
        _this.formView = new FormView(_this.props);
        return _this;
    }
    TonvaForm.prototype.componentWillMount = function () {
        this.formView.setInitValues(this.props.initValues);
    };
    TonvaForm.prototype.debug = function () {
        var s = null;
    };
    TonvaForm.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children, initValues = _a.initValues;
        return React.createElement("div", { className: className }, children === undefined ?
            this.formView.render() :
            React.createElement("form", { onSubmit: this.formView.onSubmit }, children));
    };
    TonvaForm = tslib_1.__decorate([
        observer
    ], TonvaForm);
    return TonvaForm;
}(React.Component));
export { TonvaForm };
//# sourceMappingURL=TonvaForm.js.map