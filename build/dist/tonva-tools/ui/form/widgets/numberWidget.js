import * as tslib_1 from "tslib";
import { TextWidget } from './textWidget';
import { RuleNum, RuleInt } from '../rules';
var NumberWidget = /** @class */ (function (_super) {
    tslib_1.__extends(NumberWidget, _super);
    function NumberWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'number';
        return _this;
    }
    NumberWidget.prototype.buildRules = function () {
        _super.prototype.buildRules.call(this);
        var res = this.context.form.res;
        var _a = this.itemSchema, min = _a.min, max = _a.max;
        this.rules.push(this.itemSchema.type === 'integer' ?
            new RuleNum(res, min, max) :
            new RuleInt(res, min, max));
        /*
        if (this.itemSchema.type === 'integer') {
            this.rules.push(new RuleInt);
        }
        let {min, max} = this.itemSchema;
        if (min !== undefined) this.rules.push(new RuleMin(min));
        if (max !== undefined) this.rules.push(new RuleMax(max));
        */
    };
    NumberWidget.prototype.parse = function (value) {
        if (value === undefined || value === null)
            return;
        return Number(value);
    };
    return NumberWidget;
}(TextWidget));
export { NumberWidget };
//# sourceMappingURL=numberWidget.js.map