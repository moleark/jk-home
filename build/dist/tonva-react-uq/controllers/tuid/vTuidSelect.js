import * as tslib_1 from "tslib";
import { Page } from 'tonva-tools';
import { VEntity } from '../CVEntity';
import { SearchBox, List } from 'tonva-react-form';
import React from 'react';
import { RowContent } from '../form/viewModel';
import { observer } from 'mobx-react';
var VTuidSelect = /** @class */ (function (_super) {
    tslib_1.__extends(VTuidSelect, _super);
    function VTuidSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mainView = observer(function () {
            var header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: _this.onSearchMain, placeholder: '搜索' + _this.label });
            return React.createElement(Page, { header: header, back: "close" },
                React.createElement(List, { items: _this.controller.PageItems.items, item: { render: _this.renderMainRow, onClick: _this.clickMainRow }, before: '搜索' + _this.label + '资料' }));
        });
        _this.onSearchMain = function (key) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.searchMain(key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.renderMainRow = function (item, index) { return React.createElement(_this.mainRowContent, tslib_1.__assign({}, item)); };
        _this.clickMainRow = function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ceasePage();
                        if (this.controller.entity.owner === undefined) {
                            this.returnCall(item);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.showDiv(this.entity.getIdFromObj(item))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.divView = function (param) {
            return React.createElement(Page, { header: "\u9009\u62E9Div" },
                React.createElement(List, { items: param.items, item: { render: _this.renderDivRow, onClick: _this.clickDivRow } }));
        };
        _this.renderDivRow = function (item, index) { return React.createElement(_this.divRowContent, tslib_1.__assign({}, item)); };
        _this.clickDivRow = function (item) {
            _this.ceasePage();
            _this.returnCall(item);
        };
        return _this;
    }
    VTuidSelect.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(param === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.showMain(param)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.showDiv(param)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VTuidSelect.prototype.showMain = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mainRowContent = this.ui.rowContent || RowContent;
                        return [4 /*yield*/, this.controller.searchMain(param)];
                    case 1:
                        _a.sent();
                        this.openPage(this.mainView);
                        return [2 /*return*/];
                }
            });
        });
    };
    VTuidSelect.prototype.showDiv = function (ownerValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var divs, divItems;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        divs = this.ui.divs;
                        if (divs !== undefined) {
                            this.divRowContent = divs[this.entity.name].rowContent;
                        }
                        if (this.divRowContent === undefined) {
                            this.divRowContent = RowContent;
                        }
                        return [4 /*yield*/, this.controller.getDivItems(ownerValue)];
                    case 1:
                        divItems = _a.sent();
                        this.openPage(this.divView, { items: divItems });
                        return [2 /*return*/];
                }
            });
        });
    };
    return VTuidSelect;
}(VEntity));
export { VTuidSelect };
//# sourceMappingURL=vTuidSelect.js.map