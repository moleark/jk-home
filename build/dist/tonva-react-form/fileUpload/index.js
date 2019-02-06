import * as tslib_1 from "tslib";
import * as React from 'react';
var FileUpload = /** @class */ (function (_super) {
    tslib_1.__extends(FileUpload, _super);
    function FileUpload(props) {
        var _this = _super.call(this, props) || this;
        _this.onSubmit = _this.onSubmit.bind(_this);
        return _this;
    }
    FileUpload.prototype.onSubmit = function () {
    };
    FileUpload.prototype.render = function () {
        return React.createElement("form", { onSubmit: this.onSubmit },
            React.createElement("input", { id: "uname", name: "uname" }),
            React.createElement("input", { id: "age", name: "age" }),
            React.createElement("input", { id: "sex", name: "sex" }),
            React.createElement("input", { type: "file", id: "photo", name: "photo" }),
            React.createElement("button", { type: "submit" }, "\u63D0\u4EA4"));
    };
    return FileUpload;
}(React.Component));
export { FileUpload };
//# sourceMappingURL=index.js.map