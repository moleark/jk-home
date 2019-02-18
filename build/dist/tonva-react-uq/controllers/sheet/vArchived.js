import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page } from 'tonva-tools';
import { VSheetView } from './vSheetView';
var VArchived = /** @class */ (function (_super) {
    tslib_1.__extends(VArchived, _super);
    function VArchived() {
        //protected controller: CSheet;
        //brief: any;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = function () {
            var brief = _this.sheetData.brief;
            return React.createElement(Page, { header: _this.label + ':' + '-' + brief.no },
                React.createElement(_this.sheetView, null));
        };
        return _this;
    }
    VArchived.prototype.open = function (sheetData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.sheetData = sheetData;
                /*
                let {brief, data, flows} = await this.controller.getArchived(inBrief.id);
                this.brief = brief;
                this.data = data;
                this.flows = flows;
                */
                this.vForm = this.createForm(undefined, this.sheetData.data);
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    return VArchived;
}(VSheetView));
export { VArchived };
//# sourceMappingURL=vArchived.js.map