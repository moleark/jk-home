import * as tslib_1 from "tslib";
import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
var ValidForm1 = /** @class */ (function (_super) {
    tslib_1.__extends(ValidForm1, _super);
    function ValidForm1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValidForm1.prototype.componentDidMount = function () {
        this.props.formSchema.setInputValues();
    };
    ValidForm1.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children, formSchema = _a.formSchema;
        var content;
        if (children === undefined) {
            var sep_1;
            content = [];
            formSchema.inputs.forEach(function (v, index) {
                sep_1 = formSchema.renderSeperator(v);
                if (sep_1 !== null)
                    content.push(sep_1);
                content.push(formSchema.renderField(v));
            });
            sep_1 = formSchema.renderSeperator();
            if (sep_1 !== null)
                content.push(sep_1);
            content.push(formSchema.renderButtons());
            var errors = formSchema.renderFormErrors();
            if (errors !== null)
                content.push(errors);
        }
        else
            content = children;
        return React.createElement("div", { className: classNames('container', className) },
            React.createElement("form", { onSubmit: formSchema.onSubmit }, content));
    };
    ValidForm1 = tslib_1.__decorate([
        observer
    ], ValidForm1);
    return ValidForm1;
}(React.Component));
export { ValidForm1 };
//# sourceMappingURL=validForm.js.map