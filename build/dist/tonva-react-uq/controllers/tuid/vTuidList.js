import * as tslib_1 from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import { SearchBox, List } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { jsonStringify } from '../../tools';
import { VEntity } from '../CVEntity';
import { RowContent } from '../form/viewModel';
var VTuidMainListBase = /** @class */ (function (_super) {
    tslib_1.__extends(VTuidMainListBase, _super);
    function VTuidMainListBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSearch = function (key) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.searchMain(key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.renderRow = function (item, index) { return React.createElement(_this.rowContent, tslib_1.__assign({}, item)); };
        _this.clickRow = function (item) {
            _this.callOnSelected(item);
        };
        _this.rowKey = function (item) {
            var id = item.id;
            return id;
        };
        _this.view = observer(function () {
            var header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: _this.onSearch, placeholder: '搜索' + _this.label });
            var owner = _this.entity.owner;
            var ownerTop;
            if (owner !== undefined) {
                var ownerObj = owner.valueFromId(_this.ownerId);
                ownerTop = React.createElement("div", null,
                    "owner: ",
                    jsonStringify(ownerObj));
            }
            return React.createElement(Page, { header: header },
                ownerTop,
                React.createElement(List, { items: _this.controller.PageItems.items, item: { render: _this.renderRow, onClick: _this.clickRow, key: _this.rowKey }, before: '搜索' + _this.label + '资料' }));
        });
        return _this;
    }
    VTuidMainListBase.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.rowContent = this.ui.rowContent || RowContent;
                        if (this.entity.owner !== undefined)
                            this.ownerId = Number(param);
                        // 初始查询, key是空的
                        //await this.onSearch('');
                        return [4 /*yield*/, this.controller.searchMain('')];
                    case 1:
                        // 初始查询, key是空的
                        //await this.onSearch('');
                        _a.sent();
                        this.openPage(this.view);
                        return [2 /*return*/];
                }
            });
        });
    };
    VTuidMainListBase.prototype.callOnSelected = function (item) {
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
    };
    return VTuidMainListBase;
}(VEntity));
export { VTuidMainListBase };
var VTuidMainList = /** @class */ (function (_super) {
    tslib_1.__extends(VTuidMainList, _super);
    function VTuidMainList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VTuidMainList.prototype.onSelected = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.controller.isFrom === false)
                    this.event('edit', item.id);
                else
                    this.event('info', item.id);
                return [2 /*return*/];
            });
        });
    };
    return VTuidMainList;
}(VTuidMainListBase));
export { VTuidMainList };
var VTuidDivListBase = /** @class */ (function (_super) {
    tslib_1.__extends(VTuidDivListBase, _super);
    function VTuidDivListBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSearch = function (key) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.searchMain(key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.renderRow = function (item, index) {
            return React.createElement("div", { className: "px-3 py-2" }, jsonStringify(item));
        };
        _this.clickRow = function (item) {
            _this.callOnSelected(item);
        };
        _this.view = observer(function () {
            var header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: _this.onSearch, placeholder: '搜索' + _this.label });
            var owner = _this.entity.owner;
            var ownerTop;
            if (owner !== undefined) {
                var ownerObj = owner.valueFromId(_this.ownerId);
                ownerTop = React.createElement("div", null,
                    "owner: ",
                    jsonStringify(ownerObj));
            }
            return React.createElement(Page, { header: header },
                ownerTop,
                React.createElement(List, { items: _this.controller.PageItems.items, item: { render: _this.renderRow, onClick: _this.clickRow }, before: '搜索' + _this.label + '资料' }));
        });
        return _this;
    }
    VTuidDivListBase.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //this.PageItems = new TuidPageItems(this.entity);
                        if (this.entity.owner !== undefined)
                            this.ownerId = Number(param);
                        // 初始查询, key是空的
                        //await this.onSearch('');
                        return [4 /*yield*/, this.controller.searchMain('')];
                    case 1:
                        // 初始查询, key是空的
                        //await this.onSearch('');
                        _a.sent();
                        this.openPage(this.view);
                        return [2 /*return*/];
                }
            });
        });
    };
    VTuidDivListBase.prototype.callOnSelected = function (item) {
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
    };
    return VTuidDivListBase;
}(VEntity));
export { VTuidDivListBase };
var VTuidDivList = /** @class */ (function (_super) {
    tslib_1.__extends(VTuidDivList, _super);
    function VTuidDivList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VTuidDivList.prototype.onSelected = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.event('edit', item.id);
                return [2 /*return*/];
            });
        });
    };
    return VTuidDivList;
}(VTuidDivListBase));
export { VTuidDivList };
//# sourceMappingURL=vTuidList.js.map