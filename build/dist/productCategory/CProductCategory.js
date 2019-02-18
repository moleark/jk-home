import * as tslib_1 from "tslib";
import { observable } from 'mobx';
import { VRootCategory } from './VRootCategory';
import { VCategory } from './VCategory';
import { Controller } from 'tonva-tools';
var CProductCategory = /** @class */ (function (_super) {
    tslib_1.__extends(CProductCategory, _super);
    function CProductCategory(cApp, res) {
        var _this = _super.call(this, res) || this;
        // categories: any[];
        _this.categories = [];
        _this.renderRootList = function () {
            return _this.renderView(VRootCategory);
        };
        _this.cApp = cApp;
        var cUqProduct = _this.cApp.cUqProduct;
        _this.getRootCategoryQuery = cUqProduct.query('getRootCategory');
        _this.getChildrenCategoryQuery = cUqProduct.query('getChildrenCategory');
        return _this;
    }
    CProductCategory.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, currentSalesRegion, currentLanguage, results;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.cApp, currentSalesRegion = _a.currentSalesRegion, currentLanguage = _a.currentLanguage;
                        return [4 /*yield*/, this.getRootCategoryQuery.query({ salesRegion: currentSalesRegion.id, language: currentLanguage.id })];
                    case 1:
                        results = _b.sent();
                        this.categories = results.first;
                        this.categories.forEach(function (element) {
                            _this.buildCategories(element, results.secend, results.third);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CProductCategory.prototype.getCategoryChildren = function (parentCategoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, currentSalesRegion, currentLanguage;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.cApp, currentSalesRegion = _a.currentSalesRegion, currentLanguage = _a.currentLanguage;
                        return [4 /*yield*/, this.getChildrenCategoryQuery.query({ parent: parentCategoryId, salesRegion: currentSalesRegion.id, language: currentLanguage.id })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    CProductCategory.prototype.buildCategories = function (categoryWapper, firstCategory, secendCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                firstCategory.forEach(function (element) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        element.children = secendCategory.filter(function (v) { return v.parent === element.productCategory.id; });
                        return [2 /*return*/];
                    });
                }); });
                categoryWapper.children = firstCategory.filter(function (v) { return v.parent === categoryWapper.productCategory.id; });
                return [2 /*return*/];
            });
        });
    };
    CProductCategory.prototype.openMainPage = function (categoryWaper, parent) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var productCategory, results;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productCategory = categoryWaper.productCategory;
                        if (!(productCategory.obj.isLeaf === 0)) return [3 /*break*/, 1];
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.getCategoryChildren(productCategory.id)];
                    case 2:
                        results = _a.sent();
                        this.buildCategories(categoryWaper, results.first, results.secend);
                        this.openVPage(VCategory, { categoryWaper: categoryWaper, parent: parent });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], CProductCategory.prototype, "categories", void 0);
    return CProductCategory;
}(Controller));
export { CProductCategory };
//# sourceMappingURL=CProductCategory.js.map