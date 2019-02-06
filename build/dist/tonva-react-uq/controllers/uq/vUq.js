import * as tslib_1 from "tslib";
import React from "react";
import { View } from "tonva-tools";
import { List, Muted } from "tonva-react-form";
import { CLink } from "../link";
var VUq = /** @class */ (function (_super) {
    tslib_1.__extends(VUq, _super);
    function VUq(cUq) {
        var _this = _super.call(this, cUq) || this;
        _this.isSysVisible = false;
        _this.view = function () {
            var _a = _this.controller, res = _a.res, uq = _a.uq, error = _a.error;
            var linkItem = {
                render: function (cLink, index) { return cLink.render(); },
                onClick: undefined,
            };
            var lists = [
                {
                    header: res.tuid || 'TUID',
                    items: _this.tuidLinks,
                },
                {
                    cn: 'my-2',
                    header: res.map || 'MAP',
                    items: _this.mapLinks,
                },
                {
                    cn: 'my-2',
                    header: res.sheet || 'SHEET',
                    items: _this.sheetLinks
                },
                {
                    cn: 'my-2',
                    header: res.action || 'ACTION',
                    items: _this.actionLinks
                },
                {
                    cn: 'my-2',
                    header: res.query || 'QUERY',
                    items: _this.queryLinks
                },
                {
                    cn: 'mt-2 mb-4',
                    header: res.book || 'BOOK',
                    items: _this.bookLinks
                },
                {
                    cn: 'mt-2 mb-4',
                    header: res.history || 'HISTORY',
                    items: _this.historyLinks
                },
                {
                    cn: 'mt-2 mb-4',
                    header: res.pending || 'PENDING',
                    items: _this.pendingLinks
                }
            ];
            var content;
            if (error !== undefined) {
                content = React.createElement("div", { className: "p-3 text-danger" },
                    "\u8FDE\u63A5\u9519\u8BEF: ",
                    error);
            }
            else {
                content = lists.map(function (_a, index) {
                    var cn = _a.cn, header = _a.header, items = _a.items;
                    return items.length > 0 && React.createElement(List, { key: index, className: cn, header: React.createElement("div", { className: "px-3 py-1 bg-light" },
                            React.createElement(Muted, null, header)), items: items, item: linkItem });
                });
            }
            return React.createElement(React.Fragment, null,
                React.createElement("div", { className: "px-3 py-1 small" }, res.uq || uq),
                content);
        };
        var _a = cUq.entities, tuidArr = _a.tuidArr, mapArr = _a.mapArr, sheetArr = _a.sheetArr, actionArr = _a.actionArr, queryArr = _a.queryArr, bookArr = _a.bookArr, historyArr = _a.historyArr, pendingArr = _a.pendingArr;
        _this.tuidLinks = tuidArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) { return new CLink(_this.controller.cTuidMain(v)); });
        _this.mapLinks = mapArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) { return new CLink(_this.controller.cMap(v)); });
        _this.sheetLinks = sheetArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) { return new CLink(_this.controller.cSheet(v)); });
        _this.actionLinks = actionArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) { return new CLink(_this.controller.cAction(v)); });
        _this.queryLinks = queryArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) { return new CLink(_this.controller.cQuery(v)); });
        _this.bookLinks = bookArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) { return new CLink(_this.controller.cBook(v)); });
        _this.historyLinks = historyArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) { return new CLink(_this.controller.cHistory(v)); });
        _this.pendingLinks = pendingArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) { return new CLink(_this.controller.cPending(v)); });
        return _this;
    }
    VUq.prototype.isVisible = function (entity) {
        return entity.sys !== true || this.isSysVisible;
    };
    VUq.prototype.render = function (param) {
        if (this.view === undefined)
            return React.createElement("div", null, "??? viewModel \u5FC5\u987B\u5B9A\u4E49 view ???");
        return React.createElement(this.view);
    };
    return VUq;
}(View));
export { VUq };
//# sourceMappingURL=vUq.js.map