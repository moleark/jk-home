import * as tslib_1 from "tslib";
import { Query } from './query';
var History = /** @class */ (function (_super) {
    tslib_1.__extends(History, _super);
    function History() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryApiName = 'history';
        return _this;
    }
    Object.defineProperty(History.prototype, "typeName", {
        get: function () { return 'history'; },
        enumerable: true,
        configurable: true
    });
    return History;
}(Query));
export { History };
//# sourceMappingURL=history.js.map