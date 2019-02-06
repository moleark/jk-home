import * as tslib_1 from "tslib";
import * as _ from 'lodash';
import { CharsControl } from './charsControl';
var StringControl = /** @class */ (function (_super) {
    tslib_1.__extends(StringControl, _super);
    function StringControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringControl.prototype.setProps = function () {
        var p = _super.prototype.setProps.call(this);
        _.assign(p, {
            type: 'text',
            maxLength: this.field.maxLength,
        });
        return p;
    };
    ;
    StringControl.prototype.parseValue = function (value) {
        if (value === undefined)
            return undefined;
        if (value.trim().length === 0)
            return undefined;
        return value;
    };
    return StringControl;
}(CharsControl));
export { StringControl };
var PasswordControl = /** @class */ (function (_super) {
    tslib_1.__extends(PasswordControl, _super);
    function PasswordControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasswordControl.prototype.setProps = function () {
        var p = _super.prototype.setProps.call(this);
        _.assign(p, {
            type: 'password',
            maxLength: this.field.maxLength,
        });
        return p;
    };
    ;
    return PasswordControl;
}(StringControl));
export { PasswordControl };
//# sourceMappingURL=stringControl.js.map