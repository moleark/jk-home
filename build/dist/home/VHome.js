import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page, View } from 'tonva-tools';
import { observer } from 'mobx-react';
var LIGUOSHENG = 5;
var VHome = /** @class */ (function (_super) {
    tslib_1.__extends(VHome, _super);
    function VHome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderSection = function (item, index) {
            return React.createElement("section", null,
                React.createElement("h4", null,
                    item.title,
                    React.createElement("small", { className: "text-muted" }, item.subtitle)),
                React.createElement("p", null, item.content));
        };
        _this.page = observer(function () {
            /*
            let { cHome, cProductCategory } = this.controller;
            let siteHeader = cHome.renderSiteHeader();
            let rootCategoryList = cProductCategory.renderRootList();
            */
            var openMetaView = _this.controller.openMetaView;
            var viewMetaButton = React.createElement(React.Fragment, null);
            if (_this.controller.isLogined && _this.controller.user.id === LIGUOSHENG) {
                viewMetaButton = React.createElement("button", { type: "button", className: "btn w-100", onClick: openMetaView }, "view");
            }
            // let { homeSections } = cHome;
            return React.createElement(Page, { header: false, footer: viewMetaButton }, _this.content());
        });
        _this.content = function () {
            var siteHeader = _this.controller.renderSiteHeader();
            return React.createElement(React.Fragment, null,
                siteHeader,
                _this.controller.renderSearchHeader(),
                _this.controller.renderCategoryRootList());
        };
        return _this;
    }
    VHome.prototype.showEntry = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    VHome.prototype.render = function (param) {
        return React.createElement(this.content, null);
    };
    return VHome;
}(View));
export { VHome };
//# sourceMappingURL=VHome.js.map