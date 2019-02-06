import * as tslib_1 from "tslib";
import { NumberWidget } from './numberWidget';
var UpdownWidget = /** @class */ (function (_super) {
    tslib_1.__extends(UpdownWidget, _super);
    function UpdownWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'number';
        _this.onKeyDown = function (evt) {
            var key = evt.keyCode;
            event.returnValue = _this.isValidKey(key);
        };
        return _this;
    }
    UpdownWidget.prototype.isValidKey = function (key) {
        return key === 46 || key === 8 || key === 37 || key === 39
            || key >= 48 && key <= 57
            || key >= 96 && key <= 105
            || key === 109 || key === 189;
    };
    return UpdownWidget;
}(NumberWidget));
export { UpdownWidget };
//# sourceMappingURL=updownWidget.js.map