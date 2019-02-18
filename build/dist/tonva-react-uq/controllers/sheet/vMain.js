import * as tslib_1 from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import { Page } from 'tonva-tools';
import { List, Muted, LMR } from 'tonva-react-form';
import { VEntity } from '../CVEntity';
var VSheetMain = /** @class */ (function (_super) {
    tslib_1.__extends(VSheetMain, _super);
    function VSheetMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.newClick = function () { return _this.event('new'); };
        _this.schemaClick = function () { return _this.event('schema'); };
        _this.archivesClick = function () { return _this.event('archives'); };
        _this.sheetStateClick = function (state) { return _this.event('state', state); };
        _this.renderState = function (item, index) {
            var state = item.state, count = item.count;
            if (count === 0)
                return null;
            var badge = React.createElement("span", { className: "badge badge-success ml-5 align-self-end" }, count);
            return React.createElement(LMR, { className: "px-3 py-2", left: _this.controller.getStateLabel(state), right: badge });
        };
        _this.view = observer(function () {
            var list = _this.controller.statesCount.filter(function (row) { return row.count; });
            var right = React.createElement("button", { className: "btn btn-outline-primary", onClick: _this.archivesClick }, "\u5DF2\u5F52\u6863");
            var templet;
            if (_this.isDev === true) {
                templet = React.createElement("button", { className: "btn btn-primary mr-2", color: "primary", onClick: _this.schemaClick }, "\u6A21\u677F");
            }
            return React.createElement(Page, { header: _this.label },
                React.createElement(LMR, { className: "mx-3 my-2", right: right },
                    React.createElement("button", { className: "btn btn-primary mr-2", color: "primary", onClick: _this.newClick }, "\u65B0\u5EFA"),
                    templet),
                React.createElement(List, { className: "my-2", header: React.createElement(Muted, { className: "mx-3 my-1" },
                        "\u5F85\u5904\u7406",
                        _this.label), none: "[ \u65E0 ]", items: list, item: { render: _this.renderState, onClick: _this.sheetStateClick } }));
        });
        return _this;
    }
    VSheetMain.prototype.open = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    return VSheetMain;
}(VEntity));
export { VSheetMain };
//# sourceMappingURL=vMain.js.map