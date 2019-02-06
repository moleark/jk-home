import * as tslib_1 from "tslib";
import _ from 'lodash';
var Rule = /** @class */ (function () {
    function Rule() {
    }
    return Rule;
}());
export { Rule };
var RuleCustom = /** @class */ (function (_super) {
    tslib_1.__extends(RuleCustom, _super);
    function RuleCustom(func) {
        var _this = _super.call(this) || this;
        _this.func = func;
        return _this;
    }
    RuleCustom.prototype.check = function (defy, value) {
        var ret = this.func(value);
        if (ret === undefined)
            return;
        switch (typeof ret) {
            case 'undefined': return;
            case 'string':
                defy.push(ret);
                return;
            default:
                defy.push.apply(defy, ret);
                return;
        }
    };
    return RuleCustom;
}(Rule));
export { RuleCustom };
var RulePredefined = /** @class */ (function (_super) {
    tslib_1.__extends(RulePredefined, _super);
    function RulePredefined(res) {
        var _this = _super.call(this) || this;
        _this.res = res;
        return _this;
    }
    return RulePredefined;
}(Rule));
export { RulePredefined };
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
        defy.push(this.res.required);
    };
    return RuleRequired;
}(RulePredefined));
export { RuleRequired };
var RuleNum = /** @class */ (function (_super) {
    tslib_1.__extends(RuleNum, _super);
    function RuleNum(res, min, max) {
        var _this = _super.call(this, res) || this;
        _this.minMsg = _.template(res.min);
        _this.maxMsg = _.template(res.max);
        _this.min = min;
        _this.max = max;
        return _this;
    }
    RuleNum.prototype.check = function (defy, value) {
        if (value === undefined || value === null)
            return;
        var n = Number(value);
        if (n === NaN) {
            defy.push(this.res.number);
        }
        else {
            this.checkMore(defy, n);
        }
    };
    RuleNum.prototype.checkMore = function (defy, value) {
        if (this.min !== undefined && Number(value) < this.min) {
            defy.push(this.minMsg({ min: this.min }));
        }
        if (this.max !== undefined && Number(value) > this.max) {
            defy.push(this.maxMsg({ max: this.max }));
        }
    };
    return RuleNum;
}(RulePredefined));
export { RuleNum };
var RuleInt = /** @class */ (function (_super) {
    tslib_1.__extends(RuleInt, _super);
    function RuleInt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RuleInt.prototype.checkMore = function (defy, n) {
        _super.prototype.checkMore.call(this, defy, n);
        if (Number.isInteger(n) === false) {
            defy.push(this.res.integer);
        }
    };
    return RuleInt;
}(RuleNum));
export { RuleInt };
//# sourceMappingURL=index.js.map