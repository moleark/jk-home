import * as tslib_1 from "tslib";
import { observable } from 'mobx';
import { VRootCategory } from './VRootCategory';
import { VCategory } from './VCategory';
import { Controller } from 'tonva-tools';
var CProductCategory = /** @class */ (function (_super) {
    tslib_1.__extends(CProductCategory, _super);
    function CProductCategory(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.rootCategories = [];
        _this.renderRootList = function () {
            return _this.renderView(VRootCategory);
        };
        _this.cApp = cApp;
        var cUsqProduct = _this.cApp.cUsqProduct;
        _this.getRootCategoryQuery = cUsqProduct.query('getRootCategory');
        _this.getChildrenCategoryQuery = cUsqProduct.query('getChildrenCategory');
        return _this;
    }
    CProductCategory.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, currentSalesRegion, currentLanguage, results, subCategory;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.cApp, currentSalesRegion = _a.currentSalesRegion, currentLanguage = _a.currentLanguage;
                        return [4 /*yield*/, this.getRootCategoryQuery.query({ salesRegion: currentSalesRegion.id, language: currentLanguage.id })];
                    case 1:
                        results = _b.sent();
                        this.rootCategories = results.ret;
                        subCategory = results.sub;
                        this.rootCategories.forEach(function (element) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                element.children = subCategory.filter(function (v) { return v.parent === element.productCategory.id; });
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    CProductCategory.prototype.getCategoryChildren = function (parentCategoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getChildrenCategoryQuery.table({ parent: parentCategoryId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CProductCategory.prototype.openMainPage = function (categoryWaper) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var productCategory, children, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        productCategory = categoryWaper.productCategory, children = categoryWaper.children;
                        if (!productCategory.obj.isleaf) return [3 /*break*/, 1];
                        return [3 /*break*/, 4];
                    case 1:
                        if (!!children) return [3 /*break*/, 3];
                        _a = categoryWaper;
                        return [4 /*yield*/, this.getCategoryChildren(categoryWaper.id)];
                    case 2:
                        _a.children = _b.sent();
                        _b.label = 3;
                    case 3:
                        this.showVPage(VCategory, categoryWaper);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], CProductCategory.prototype, "rootCategories", void 0);
    return CProductCategory;
}(Controller));
export { CProductCategory };
//# sourceMappingURL=CProductCategory.js.map