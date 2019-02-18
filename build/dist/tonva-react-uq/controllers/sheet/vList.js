import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page } from 'tonva-tools';
import { List, Muted, LMR, EasyDate } from 'tonva-react-form';
import { VEntity } from '../CVEntity';
var VSheetList = /** @class */ (function (_super) {
    tslib_1.__extends(VSheetList, _super);
    function VSheetList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rowClick = function (brief) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (brief.processing === 1) {
                    this.event('processing', brief.id);
                    return [2 /*return*/];
                }
                this.event('action', brief.id);
                return [2 /*return*/];
            });
        }); };
        _this.onScrollBottom = function () {
            console.log('onScrollBottom');
            _this.controller.pageStateItems.more();
        };
        _this.rowContent = function (row) {
            var id = row.id, no = row.no, discription = row.discription, date = row.date, processing = row.processing;
            var left = React.createElement(React.Fragment, null,
                no,
                " \u00A0 ",
                React.createElement(Muted, null, discription),
                " ",
                processing === 1 ? '...' : '');
            var right = React.createElement(Muted, null,
                React.createElement(EasyDate, { date: date }));
            return React.createElement(LMR, { className: "px-3 py-2", left: left, right: right });
        };
        _this.renderRow = function (row, index) { return React.createElement(_this.row, tslib_1.__assign({}, row)); };
        _this.view = function () {
            //let sheets = this.controller.stateSheets;
            var pageStateItems = _this.controller.pageStateItems;
            return React.createElement(Page, { header: _this.label + ' - ' + _this.stateLabel, onScrollBottom: _this.onScrollBottom },
                React.createElement(List, { items: pageStateItems, item: { render: _this.renderRow, onClick: _this.rowClick } }));
        };
        return _this;
    }
    VSheetList.prototype.open = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.row = this.ui.listRow || this.rowContent;
                        this.stateName = item.state;
                        this.stateLabel = this.controller.getStateLabel(this.stateName);
                        //await this.controller.getStateSheets(this.stateName, 0, 10);
                        return [4 /*yield*/, this.controller.pageStateItems.first(this.stateName)];
                    case 1:
                        //await this.controller.getStateSheets(this.stateName, 0, 10);
                        _a.sent();
                        this.openPage(this.view);
                        return [2 /*return*/];
                }
            });
        });
    };
    return VSheetList;
}(VEntity));
export { VSheetList };
//# sourceMappingURL=vList.js.map