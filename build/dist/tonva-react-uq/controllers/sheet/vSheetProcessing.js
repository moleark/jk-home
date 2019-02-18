import * as tslib_1 from "tslib";
import React from 'react';
import { Page } from 'tonva-tools';
import { VSheetView } from './vSheetView';
var VSheetProcessing = /** @class */ (function (_super) {
    tslib_1.__extends(VSheetProcessing, _super);
    function VSheetProcessing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = function () {
            var brief = _this.sheetData.brief;
            var state = brief.state, no = brief.no;
            var stateLabel = _this.controller.getStateLabel(state);
            return React.createElement(Page, { header: _this.label + ':' + stateLabel + '-' + no },
                React.createElement("div", { className: "mb-2" },
                    React.createElement("div", { className: "d-flex px-3 py-2 border-bottom bg-light" }, "\u6B63\u5728\u5904\u7406\u4E2D..."),
                    React.createElement(_this.sheetView, null)));
        };
        return _this;
    }
    VSheetProcessing.prototype.open = function (sheetData) {
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
    return VSheetProcessing;
}(VSheetView));
export { VSheetProcessing };
//# sourceMappingURL=vSheetProcessing.js.map