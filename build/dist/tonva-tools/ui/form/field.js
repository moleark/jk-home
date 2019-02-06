import * as tslib_1 from "tslib";
import * as React from 'react';
import { factory } from './widgets';
import { ContextContainer } from './context';
var Field = /** @class */ (function (_super) {
    tslib_1.__extends(Field, _super);
    function Field() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Field.prototype.render = function () {
        var _a = this.props, name = _a.name, children = _a.children;
        var context = this.context;
        if (context === undefined)
            return React.createElement("span", { className: "text-danger" }, "!only in Form!");
        var itemSchema = context.getItemSchema(name);
        var content = factory(context, itemSchema, children, this.props);
        if (content === undefined) {
            return React.createElement("span", { className: "text-danger" },
                "!!",
                name,
                " is not defined!!");
        }
        return content;
    };
    Field.contextType = ContextContainer;
    return Field;
}(React.Component));
export { Field };
//# sourceMappingURL=field.js.map