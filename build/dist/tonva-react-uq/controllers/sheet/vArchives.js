import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page } from 'tonva-tools';
import { List, LMR, EasyDate, Muted } from 'tonva-react-form';
import { VEntity } from '../CVEntity';
var VArchives = /** @class */ (function (_super) {
    tslib_1.__extends(VArchives, _super);
    function VArchives() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.archiveClick = function (brief) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (brief.processing === 1)
                    return [2 /*return*/];
                this.event('archived', brief);
                return [2 /*return*/];
            });
        }); };
        _this.archiveRow = function (row, index) {
            var id = row.id, no = row.no, discription = row.discription, date = row.date;
            var left = React.createElement(React.Fragment, null,
                row.processing === 1 ? '... ' : '',
                row.no,
                " \u00A0 ",
                row.discription);
            var right = React.createElement(Muted, null,
                React.createElement(EasyDate, { date: date }));
            return React.createElement(LMR, { className: "px-3 py-2", left: left, right: right });
        };
        _this.view = function () {
            return React.createElement(Page, { header: '已归档' + _this.label },
                React.createElement(List, { items: _this.list, item: { render: _this.archiveRow, onClick: _this.archiveClick } }));
        };
        return _this;
    }
    VArchives.prototype.open = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.entity.getArchives(undefined, 10)];
                    case 1:
                        _a.list = _b.sent();
                        this.openPage(this.view);
                        return [2 /*return*/];
                }
            });
        });
    };
    return VArchives;
}(VEntity));
export { VArchives };
//# sourceMappingURL=vArchives.js.map