import * as tslib_1 from "tslib";
import { nav } from '../ui/nav';
var HttpChannelNavUI = /** @class */ (function () {
    function HttpChannelNavUI() {
    }
    HttpChannelNavUI.prototype.startWait = function () {
        nav.startWait();
    };
    HttpChannelNavUI.prototype.endWait = function () {
        nav.endWait();
    };
    HttpChannelNavUI.prototype.showError = function (error) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nav.endWait();
                        /*
                        if (error.name === 'SyntaxError') {
                            error = {
                                name: error.name,
                                message: error.message,
                            }
                        }*/
                        return [4 /*yield*/, nav.onError(error)];
                    case 1:
                        /*
                        if (error.name === 'SyntaxError') {
                            error = {
                                name: error.name,
                                message: error.message,
                            }
                        }*/
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return HttpChannelNavUI;
}());
export { HttpChannelNavUI };
//# sourceMappingURL=httpChannelUI.js.map