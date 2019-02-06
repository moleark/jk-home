import * as tslib_1 from "tslib";
import * as React from 'react';
import { Controller, Loading } from 'tonva-tools';
import { VMember } from './VMember';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
var CMember = /** @class */ (function (_super) {
    tslib_1.__extends(CMember, _super);
    function CMember(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.render = observer(function () {
            if (_this.isLogined) {
                return _this.member === undefined ? React.createElement(Loading, null) : _this.renderView(VMember);
            }
            else {
                return React.createElement("div", null, "\u8BF7\u767B\u5F55");
            }
        });
        _this.tab = function () {
            _this.start();
            return React.createElement(_this.render, null);
        };
        _this.cApp = cApp;
        return _this;
    }
    CMember.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var memberAction, ma;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        memberAction = this.cApp.cUqMember.action('MemberAction');
                        if (!this.isLogined) return [3 /*break*/, 2];
                        return [4 /*yield*/, memberAction.submit({})];
                    case 1:
                        ma = _a.sent();
                        this.member = { recommendationCode: ma.code, point: ma.point };
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], CMember.prototype, "member", void 0);
    return CMember;
}(Controller));
export { CMember };
//# sourceMappingURL=CMember.js.map