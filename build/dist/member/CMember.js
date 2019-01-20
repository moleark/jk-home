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
        _this.renderMember = function () {
            return _this.renderView(VMember);
        };
        _this.render = observer(function () {
            return _this.member === undefined ? React.createElement(Loading, null) : _this.renderMember();
        });
        _this.tab = function () { return React.createElement(_this.render, null); };
        _this.cApp = cApp;
        return _this;
    }
    CMember.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var memberTuid, member, getPointQuery, point;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        memberTuid = this.cApp.cUsqMember.tuid('member');
                        return [4 /*yield*/, memberTuid.load(this.user.id)];
                    case 1:
                        member = _a.sent();
                        getPointQuery = this.cApp.cUsqMember.query('getPoint');
                        return [4 /*yield*/, getPointQuery.obj({ member: member.id })];
                    case 2:
                        point = _a.sent();
                        member.point = point === undefined ? 0 : point.point;
                        this.member = member;
                        return [2 /*return*/];
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