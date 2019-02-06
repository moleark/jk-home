import * as tslib_1 from "tslib";
var A = /** @class */ (function () {
    function A(a) {
        this.a = a;
    }
    Object.defineProperty(A.prototype, "A", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    A.prototype.test = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, 'A'];
        }); });
    };
    A.prototype.t = function () { return 'ta'; };
    return A;
}());
export { A };
//# sourceMappingURL=a.js.map