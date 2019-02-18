import * as tslib_1 from "tslib";
import React from 'react';
import classNames from 'classnames';
import { Page } from 'tonva-tools';
import { FA } from 'tonva-react-form';
import { VSheetView } from './vSheetView';
var VSheetAction = /** @class */ (function (_super) {
    tslib_1.__extends(VSheetAction, _super);
    function VSheetAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionClick = function (action) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, id, flow, state, res;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.sheetData.brief, id = _a.id, flow = _a.flow, state = _a.state;
                        return [4 /*yield*/, this.controller.action(id, flow, state, action.name)];
                    case 1:
                        res = _b.sent();
                        this.ceasePage();
                        this.openPage(this.acted);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.deleteClick = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                alert('单据作废：程序正在设计中');
                return [2 /*return*/];
            });
        }); };
        _this.editClick = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var values;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.editSheet(this.sheetData)];
                    case 1:
                        values = _a.sent();
                        this.vForm.setValues(values);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = function () {
            var brief = _this.sheetData.brief;
            var state = brief.state, no = brief.no;
            var stateLabel = _this.controller.getStateLabel(state);
            var states = _this.entity.states;
            var s = states.find(function (v) { return v.name === state; });
            var actionButtons, startButtons;
            if (s === undefined) {
                var text = void 0, cn = void 0;
                switch (state) {
                    default:
                        text = '不认识的单据状态\'' + state + '\'';
                        cn = 'text-info';
                        break;
                    case '-':
                        text = '已作废';
                        cn = 'text-danger';
                        break;
                    case '#':
                        text = '已归档';
                        cn = 'text-success';
                        break;
                }
                actionButtons = React.createElement("div", { className: classNames(cn) },
                    "[",
                    text,
                    "]");
            }
            else {
                actionButtons = React.createElement("div", { className: "flex-grow-1" }, s.actions.map(function (v, index) {
                    return React.createElement("button", { key: index, className: "btn btn-primary mr-2", onClick: function () { return _this.actionClick(v); } }, _this.controller.getActionLabel(state, v.name));
                }));
                if (state === '$') {
                    startButtons = React.createElement("div", null,
                        React.createElement("button", { className: "btn btn-outline-info ml-2", onClick: _this.editClick }, "\u4FEE\u6539"),
                        React.createElement("button", { className: "btn btn-outline-danger ml-2", onClick: _this.deleteClick }, "\u4F5C\u5E9F"));
                }
            }
            ;
            return React.createElement(Page, { header: _this.label + ':' + stateLabel + '-' + no },
                React.createElement("div", { className: "mb-2" },
                    React.createElement("div", { className: "d-flex px-3 py-2 border-bottom bg-light" },
                        actionButtons,
                        startButtons),
                    React.createElement(_this.sheetView, null)));
        };
        _this.acted = function () {
            var discription = _this.sheetData.brief.discription;
            return React.createElement(Page, { header: "\u5DF2\u5904\u7406", back: "close" },
                React.createElement("div", { className: "p-3 d-flex flex-column align-items-center" },
                    React.createElement("div", { className: "p-3" }, discription),
                    React.createElement("div", { className: "text-success" },
                        React.createElement(FA, { name: "check-circle-o" }),
                        " \u5355\u636E\u5DF2\u5904\u7406\uFF01"),
                    React.createElement("div", { className: "p-3" },
                        React.createElement("button", { className: "btn btn-outline-info", onClick: function () { return _this.backPage(); } }, "\u8FD4\u56DE"))));
        };
        return _this;
    }
    VSheetAction.prototype.open = function (sheetData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.sheetData = sheetData;
                //let {brief, data, flows} = await this.controller.getSheetData(sheetId);
                //this.brief = brief;
                //this.flows = flows;
                //this.data = data;
                //this.state = this.brief.state;
                this.vForm = this.createForm(undefined, sheetData.data);
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    return VSheetAction;
}(VSheetView));
export { VSheetAction };
//# sourceMappingURL=vSheetAction.js.map