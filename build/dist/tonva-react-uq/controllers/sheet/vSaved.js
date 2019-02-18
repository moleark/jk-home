import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page } from 'tonva-tools';
import { FA } from 'tonva-react-form';
import { VSheet } from "./vSheet";
var VSheetSaved = /** @class */ (function (_super) {
    tslib_1.__extends(VSheetSaved, _super);
    function VSheetSaved() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.restart = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ceasePage();
                        return [4 /*yield*/, this.event('new')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.actionClick = function (action) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, id, flow, state, res;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.ceasePage();
                        _a = this.brief, id = _a.id, flow = _a.flow, state = _a.state;
                        return [4 /*yield*/, this.controller.action(id, flow, state, action.name)];
                    case 1:
                        res = _b.sent();
                        this.openPage(this.acted);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.buttons = React.createElement(React.Fragment, null,
            React.createElement("button", { className: "btn btn-outline-primary mr-3", onClick: _this.restart }, "\u7EE7\u7EED\u5F00\u5355"),
            React.createElement("button", { className: "btn btn-outline-info", onClick: function () { return _this.backPage(); } }, "\u8FD4\u56DE"));
        _this.view = function () {
            var states = _this.entity.states;
            var state = '$';
            var s = states.find(function (v) { return v.name === state; });
            var actionButtons = React.createElement(React.Fragment, null, s.actions.map(function (v, index) {
                return React.createElement("button", { key: index, className: "btn btn-primary mr-3", onClick: function () { return _this.actionClick(v); } }, _this.controller.getActionLabel(state, v.name));
            }));
            return React.createElement(Page, { header: "\u5DF2\u4FDD\u5B58", back: "close" },
                React.createElement("div", { className: "p-3 d-flex flex-column align-items-center" },
                    React.createElement("div", { className: "text-success" },
                        React.createElement(FA, { name: "check-circle-o" }),
                        " \u5355\u636E\u5DF2\u4FDD\u5B58\uFF01\u7CFB\u7EDF\u5C1A\u672A\u5904\u7406"),
                    React.createElement("div", { className: "p-3" },
                        actionButtons,
                        _this.buttons)));
        };
        _this.acted = function () {
            return React.createElement(Page, null,
                React.createElement("div", { className: "p-3 d-flex flex-column align-items-center" },
                    React.createElement("div", { className: "text-success" },
                        React.createElement(FA, { name: "check-circle-o" }),
                        " \u5355\u636E\u5DF2\u5904\u7406\uFF01"),
                    React.createElement("div", { className: "p-3" }, _this.buttons)));
        };
        return _this;
    }
    VSheetSaved.prototype.open = function (brief) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.brief = brief;
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    return VSheetSaved;
}(VSheet));
export { VSheetSaved };
//# sourceMappingURL=vSaved.js.map