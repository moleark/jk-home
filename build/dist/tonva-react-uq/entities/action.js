import * as tslib_1 from "tslib";
import { Entity } from './entity';
var Action = /** @class */ (function (_super) {
    tslib_1.__extends(Action, _super);
    function Action() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Action.prototype, "typeName", {
        get: function () { return 'action'; },
        enumerable: true,
        configurable: true
    });
    Action.prototype.submit = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var text;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        text = this.pack(data);
                        return [4 /*yield*/, this.tvApi.action(this.name, { data: text })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Action;
}(Entity));
export { Action };
//# sourceMappingURL=action.js.map