import * as tslib_1 from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import { List, FA } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { VEntity } from '../CVEntity';
import { DefaultRow } from './defaultRow';
var VQueryMain = /** @class */ (function (_super) {
    tslib_1.__extends(VQueryMain, _super);
    function VQueryMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSubmit = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var params, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = this.vForm.getValues();
                        if (!(this.entity.isPaged === true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.entity.resetPage(30, params)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.entity.loadPage()];
                    case 2:
                        _a.sent();
                        this.replacePage(this.pageResult);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.entity.query(params)];
                    case 4:
                        data = _a.sent();
                        this.replacePage(this.queryResult, data);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.again = function () {
            _this.vForm.reset();
            _this.replacePage(_this.view);
        };
        _this.renderRow = function (item, index) { return React.createElement(_this.row, tslib_1.__assign({}, item)); };
        _this.view = function () { return React.createElement(Page, { header: _this.label },
            _this.vForm.render('mx-3 my-2'),
            _this.renderExtra()); };
        _this.pageResult = function () {
            var _a = _this.entity, name = _a.name, list = _a.list;
            var rightClose = React.createElement("button", { className: "btn btn-outline-success", onClick: _this.again },
                React.createElement(FA, { name: "search" }),
                " \u518D\u67E5\u8BE2");
            return React.createElement(Page, { header: _this.label, right: rightClose },
                React.createElement(List, { items: list, item: { render: _this.renderRow } }));
        };
        _this.queryResult = observer(function (result) {
            var rightClose = React.createElement("button", { className: "btn btn-outline-success", onClick: _this.again },
                React.createElement(FA, { name: "search" }),
                " \u518D\u67E5\u8BE2");
            return React.createElement(Page, { header: _this.label, right: rightClose },
                React.createElement("pre", null, JSON.stringify(result, undefined, '\t')));
        });
        return _this;
    }
    VQueryMain.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, row, queryRow;
            return tslib_1.__generator(this, function (_b) {
                this.vForm = this.createForm(this.onSubmit, param);
                _a = this.ui, row = _a.row, queryRow = _a.queryRow;
                this.row = queryRow || row || DefaultRow;
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    VQueryMain.prototype.renderExtra = function () {
        return;
    };
    return VQueryMain;
}(VEntity));
export { VQueryMain };
//# sourceMappingURL=vQueryMain.js.map