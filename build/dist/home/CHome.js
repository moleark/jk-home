import * as tslib_1 from "tslib";
import * as React from 'react';
import { VSiteHeader } from './VSiteHeader';
import { PageItems, Controller } from 'tonva-tools';
import { VSearchHeader } from './VSearchHeader';
import { VHome } from './VHome';
var HomeSections = /** @class */ (function (_super) {
    tslib_1.__extends(HomeSections, _super);
    function HomeSections(sectionTuid) {
        var _this = _super.call(this) || this;
        _this.firstSize = _this.pageSize = 13;
        _this.sectionTuid = sectionTuid;
        return _this;
    }
    HomeSections.prototype.load = function (param, pageStart, pageSize) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (pageStart === undefined)
                            pageStart = 0;
                        return [4 /*yield*/, this.sectionTuid.search("", pageStart, pageSize)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    HomeSections.prototype.setPageStart = function (item) {
        if (item === undefined)
            return 0;
        return item.id;
    };
    return HomeSections;
}(PageItems));
var CHome = /** @class */ (function (_super) {
    tslib_1.__extends(CHome, _super);
    function CHome(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.renderSiteHeader = function () {
            return _this.renderView(VSiteHeader);
        };
        _this.renderSearchHeader = function (size) {
            return _this.renderView(VSearchHeader, size);
        };
        _this.renderCategoryRootList = function () {
            var cProductCategory = _this.cApp.cProductCategory;
            return cProductCategory.renderRootList();
        };
        _this.renderHome = function () {
            return _this.renderView(VHome);
        };
        _this.openMetaView = function () {
            _this.cApp.startDebug();
        };
        _this.tab = function () { return React.createElement(_this.renderHome, null); };
        _this.cApp = cApp;
        return _this;
    }
    CHome.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cProductCategory;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cProductCategory = this.cApp.cProductCategory;
                        return [4 /*yield*/, cProductCategory.start()];
                    case 1:
                        _a.sent();
                        this.showVPage(VHome);
                        return [2 /*return*/];
                }
            });
        });
    };
    return CHome;
}(Controller));
export { CHome };
//# sourceMappingURL=CHome.js.map