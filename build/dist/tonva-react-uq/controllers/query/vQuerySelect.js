import * as tslib_1 from "tslib";
import * as React from 'react';
import { SearchBox, List } from 'tonva-react-form';
import { Page, PageItems } from 'tonva-tools';
import { VEntity } from '../CVEntity';
import { DefaultRow } from './defaultRow';
var VQuerySelect = /** @class */ (function (_super) {
    tslib_1.__extends(VQuerySelect, _super);
    function VQuerySelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSearch = function (key) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.PageItems.first(key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.renderRow = function (item, index) { return React.createElement(_this.row, tslib_1.__assign({}, item)); };
        _this.clickRow = function (item) {
            _this.callOnSelected(item);
        };
        _this.view = function () {
            var header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: _this.onSearch, placeholder: '搜索' + _this.label });
            return React.createElement(Page, { header: header },
                React.createElement(List, { items: _this.PageItems.items, item: { render: _this.renderRow, onClick: _this.clickRow }, before: '搜索' + _this.label + '资料' }));
        };
        return _this;
    }
    VQuerySelect.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, row, selectRow;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ui, row = _a.row, selectRow = _a.selectRow;
                        this.row = selectRow || row || DefaultRow;
                        //this.entity = this.controller.entity;
                        this.PageItems = new QueryPageItems(this.entity);
                        return [4 /*yield*/, this.onSearch(param)];
                    case 1:
                        _b.sent();
                        this.openPage(this.view);
                        return [2 /*return*/];
                }
            });
        });
    };
    VQuerySelect.prototype.callOnSelected = function (item) {
        this.closePage();
        this.returnCall(item);
    };
    return VQuerySelect;
}(VEntity));
export { VQuerySelect };
var QueryPageItems = /** @class */ (function (_super) {
    tslib_1.__extends(QueryPageItems, _super);
    function QueryPageItems(query) {
        var _this = _super.call(this) || this;
        _this.query = query;
        return _this;
    }
    QueryPageItems.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query.loadSchema()];
                    case 1:
                        _a.sent();
                        if (!(this.query.isPaged === true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.query.page(this.param, this.pageStart, this.pageSize)];
                    case 2:
                        ret = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.query.query(this.param)];
                    case 4:
                        data = _a.sent();
                        //let data = await this.query.unpackReturns(res);
                        ret = data[this.query.returns[0].name];
                        _a.label = 5;
                    case 5: return [2 /*return*/, ret];
                }
            });
        });
    };
    QueryPageItems.prototype.setPageStart = function (item) {
        if (item === undefined)
            this.pageStart = 0;
    };
    return QueryPageItems;
}(PageItems));
export { QueryPageItems };
//# sourceMappingURL=vQuerySelect.js.map