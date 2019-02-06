import * as React from 'react';
import { observer } from 'mobx-react';
import { jsonStringify } from '../../tools';
var ViewModel = /** @class */ (function () {
    function ViewModel() {
    }
    ViewModel.prototype.render = function (className) {
        if (this.view === undefined)
            return React.createElement("div", null, "??? viewModel \u5FC5\u987B\u5B9A\u4E49 view ???");
        return React.createElement(this.view, { vm: this, className: className });
    };
    return ViewModel;
}());
export { ViewModel };
export var PureJSONContent = function (values, x) { return React.createElement(React.Fragment, null,
    "content: ",
    jsonStringify(values)); };
export var JSONContent = observer(PureJSONContent);
export var RowContent = function (values) { return React.createElement("div", { className: "px-3 py-2" }, jsonStringify(values)); };
//# sourceMappingURL=viewModel.js.map