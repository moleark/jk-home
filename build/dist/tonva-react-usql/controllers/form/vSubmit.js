import * as tslib_1 from "tslib";
import * as React from 'react';
import { ViewModel } from "./viewModel";
import { observer } from 'mobx-react';
import { observable } from 'mobx';
var VSubmit = /** @class */ (function (_super) {
    tslib_1.__extends(VSubmit, _super);
    function VSubmit(vForm) {
        var _this = _super.call(this) || this;
        _this.onClickSubmit = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.vForm.submit();
                return [2 /*return*/];
            });
        }); };
        _this.view = observer(function () {
            var isOk = _this.vForm.isOk;
            return React.createElement("button", { type: "button", onClick: _this.onClickSubmit, className: _this.className, disabled: isOk === false }, _this.caption);
        });
        _this.vForm = vForm;
        _this.caption = _this.vForm.submitCaption;
        _this.className = 'btn btn-primary w-25';
        return _this;
    }
    tslib_1.__decorate([
        observable
    ], VSubmit.prototype, "caption", void 0);
    tslib_1.__decorate([
        observable
    ], VSubmit.prototype, "className", void 0);
    return VSubmit;
}(ViewModel));
export { VSubmit };
//# sourceMappingURL=vSubmit.js.map