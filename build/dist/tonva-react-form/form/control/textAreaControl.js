import * as tslib_1 from "tslib";
import * as React from 'react';
import * as _ from 'lodash';
import { CharsControl } from './charsControl';
var TextAreaControl = /** @class */ (function (_super) {
    tslib_1.__extends(TextAreaControl, _super);
    function TextAreaControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAreaControl.prototype.setProps = function () {
        var p = _super.prototype.setProps.call(this);
        var maxLength = this.field.maxLength;
        var rows = this.face.rows;
        _.assign(p, {
            maxLength: maxLength,
            rows: rows,
        });
        return p;
    };
    ;
    TextAreaControl.prototype.renderInput = function () {
        var _this = this;
        return React.createElement("textarea", tslib_1.__assign({ ref: function (t) { _this.el = t; if (t !== undefined)
                t.value = ''; }, className: this.className() }, this.props));
    };
    return TextAreaControl;
}(CharsControl));
export { TextAreaControl };
//# sourceMappingURL=textAreaControl.js.map