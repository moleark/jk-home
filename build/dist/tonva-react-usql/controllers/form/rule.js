import * as tslib_1 from "tslib";
var Rule = /** @class */ (function () {
    function Rule() {
    }
    return Rule;
}());
export { Rule };
var RuleRequired = /** @class */ (function (_super) {
    tslib_1.__extends(RuleRequired, _super);
    function RuleRequired() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RuleRequired.prototype.check = function (defy, value) {
        switch (typeof value) {
            default:
            case 'boolean': return;
            case 'object':
                if (value !== null)
                    return;
                break;
            case 'string':
                if (value.trim().length > 0)
                    return;
                break;
            case 'number':
                if (value !== NaN)
                    return;
                break;
            case 'undefined':
                break;
        }
        defy.push('不能为空');
    };
    return RuleRequired;
}(Rule));
export { RuleRequired };
var RuleNum = /** @class */ (function (_super) {
    tslib_1.__extends(RuleNum, _super);
    function RuleNum() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RuleNum.prototype.check = function (defy, value) {
        if (value === undefined || value === null)
            return;
        var n = Number(value);
        if (n === NaN)
            defy.push('必须是数字');
    };
    return RuleNum;
}(Rule));
export { RuleNum };
var RuleInt = /** @class */ (function (_super) {
    tslib_1.__extends(RuleInt, _super);
    function RuleInt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RuleInt.prototype.check = function (defy, value) {
        if (value === undefined || value === null)
            return;
        var n = Number(value);
        if (Number.isNaN(n) === true || Number.isInteger(n) === false) {
            defy.push('必须是整数');
        }
    };
    return RuleInt;
}(Rule));
export { RuleInt };
var RuleMin = /** @class */ (function (_super) {
    tslib_1.__extends(RuleMin, _super);
    function RuleMin(min) {
        var _this = _super.call(this) || this;
        _this.min = min;
        return _this;
    }
    RuleMin.prototype.check = function (defy, value) {
        _super.prototype.check.call(this, defy, value);
        if (Number(value) < this.min)
            defy.push('不能小于' + this.min);
    };
    return RuleMin;
}(RuleNum));
export { RuleMin };
var RuleMax = /** @class */ (function (_super) {
    tslib_1.__extends(RuleMax, _super);
    function RuleMax(max) {
        var _this = _super.call(this) || this;
        _this.max = max;
        return _this;
    }
    RuleMax.prototype.check = function (defy, value) {
        _super.prototype.check.call(this, defy, value);
        if (Number(value) > this.max)
            defy.push('不能小于' + this.max);
    };
    return RuleMax;
}(RuleNum));
export { RuleMax };
//# sourceMappingURL=rule.js.map