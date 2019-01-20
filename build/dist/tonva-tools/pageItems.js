import * as tslib_1 from "tslib";
import { observable, computed } from 'mobx';
import { uid } from './uid';
var PageItems = /** @class */ (function () {
    function PageItems(itemObservable) {
        if (itemObservable === void 0) { itemObservable = false; }
        this.isFirst = true;
        this.loading = false;
        this.beforeLoad = true;
        this.loaded = false;
        this.allLoaded = false;
        this.firstSize = 100;
        this.pageStart = undefined;
        this.pageSize = 30;
        this.appendPosition = 'tail';
        this._items = observable.array([], { deep: itemObservable });
    }
    Object.defineProperty(PageItems.prototype, "items", {
        get: function () {
            if (this.beforeLoad === true)
                return null;
            if (this.loaded === false)
                return undefined;
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    PageItems.prototype.scrollToTop = function () {
        this.topDiv = '$$' + uid();
    };
    PageItems.prototype.scrollToBottom = function () {
        this.bottomDiv = '$$' + uid();
    };
    PageItems.prototype.reset = function () {
        this.isFirst = true;
        this.beforeLoad = true;
        this.loaded = false;
        this.param = undefined;
        this.allLoaded = false;
        this._items.clear();
        this.setPageStart(undefined);
    };
    PageItems.prototype.append = function (item) {
        if (this.appendPosition === 'tail')
            this._items.unshift(item);
        else
            this._items.push(item);
    };
    PageItems.prototype.first = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.reset();
                        this.beforeLoad = false;
                        this.param = param;
                        return [4 /*yield*/, this.more()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PageItems.prototype.more = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, pageSize, ret, len;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.allLoaded === true)
                            return [2 /*return*/];
                        if (this.loading === true)
                            return [2 /*return*/];
                        this.loading = true;
                        pageSize = this.pageSize + 1;
                        if (this.isFirst === true) {
                            if (this.firstSize > this.pageSize)
                                pageSize = this.firstSize + 1;
                        }
                        return [4 /*yield*/, this.load(this.param, this.pageStart, pageSize)];
                    case 1:
                        ret = _c.sent();
                        this.loading = false;
                        this.loaded = true;
                        len = ret.length;
                        if (this.isFirst === true && len > this.firstSize ||
                            this.isFirst === false && len > this.pageSize) {
                            this.allLoaded = false;
                            --len;
                            ret.splice(len, 1);
                        }
                        else {
                            this.allLoaded = true;
                        }
                        if (len === 0) {
                            this._items.clear();
                            return [2 /*return*/];
                        }
                        this.setPageStart(ret[len - 1]);
                        if (this.appendPosition === 'tail')
                            (_a = this._items).push.apply(_a, ret);
                        else
                            (_b = this._items).unshift.apply(_b, ret.reverse());
                        this.isFirst = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], PageItems.prototype, "loading", void 0);
    tslib_1.__decorate([
        observable
    ], PageItems.prototype, "beforeLoad", void 0);
    tslib_1.__decorate([
        observable
    ], PageItems.prototype, "loaded", void 0);
    tslib_1.__decorate([
        observable
    ], PageItems.prototype, "allLoaded", void 0);
    tslib_1.__decorate([
        computed
    ], PageItems.prototype, "items", null);
    tslib_1.__decorate([
        observable
    ], PageItems.prototype, "topDiv", void 0);
    tslib_1.__decorate([
        observable
    ], PageItems.prototype, "bottomDiv", void 0);
    return PageItems;
}());
export { PageItems };
//# sourceMappingURL=pageItems.js.map