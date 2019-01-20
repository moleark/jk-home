import * as tslib_1 from "tslib";
import { TextWidget } from './textWidget';
var DateWidget = /** @class */ (function (_super) {
    tslib_1.__extends(DateWidget, _super);
    function DateWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'date';
        return _this;
    }
    return DateWidget;
}(TextWidget));
export { DateWidget };
var DateTimeWidget = /** @class */ (function (_super) {
    tslib_1.__extends(DateTimeWidget, _super);
    function DateTimeWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'datetime';
        return _this;
    }
    return DateTimeWidget;
}(TextWidget));
export { DateTimeWidget };
var TimeWidget = /** @class */ (function (_super) {
    tslib_1.__extends(TimeWidget, _super);
    function TimeWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'time';
        return _this;
    }
    return TimeWidget;
}(TextWidget));
export { TimeWidget };
var MonthWidget = /** @class */ (function (_super) {
    tslib_1.__extends(MonthWidget, _super);
    function MonthWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'month';
        return _this;
    }
    return MonthWidget;
}(TextWidget));
export { MonthWidget };
//# sourceMappingURL=dateWidget.js.map