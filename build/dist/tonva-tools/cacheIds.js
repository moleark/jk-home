import * as tslib_1 from "tslib";
import { observable } from 'mobx';
var CacheIds = /** @class */ (function () {
    function CacheIds(maxCount) {
        if (maxCount === void 0) { maxCount = 100; }
        this.arr = [];
        this.dict = new Map();
        this.maxCount = maxCount;
    }
    CacheIds.prototype.loadIds = function (ids) {
        var arr = [];
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var id = ids_1[_i];
            if (id === null)
                continue;
            var item = this.dict.get(id);
            if (item === undefined) {
                arr.push(id);
                item = { id: id };
                this.dict.set(id, item);
            }
        }
        this.loadId(arr);
    };
    CacheIds.prototype.get = function (id) {
        if (id === undefined || id === null)
            return null;
        var item = this.dict.get(id);
        if (item === undefined) {
            this.dict.set(id, { id: id });
            this.loadId([id]);
            item = this.dict.get(id);
        }
        return item;
    };
    CacheIds.prototype.setItem = function (id, item) {
        if (item === undefined) {
            this.dict.set(id, null);
            this.arr.push({ id: id });
        }
        else {
            this.dict.set(id, item);
            this.arr.push(item);
        }
        if (this.arr.length > this.maxCount) {
            item = this.arr.shift();
            this.dict.delete(item.id);
        }
    };
    CacheIds.prototype.loadId = function (ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var items, _i, ids_2, id, item, _loop_1, this_1, _a, ids_3, id;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._loadIds(ids)];
                    case 1:
                        items = _b.sent();
                        if (!(items === undefined)) return [3 /*break*/, 6];
                        _i = 0, ids_2 = ids;
                        _b.label = 2;
                    case 2:
                        if (!(_i < ids_2.length)) return [3 /*break*/, 5];
                        id = ids_2[_i];
                        if (id === null)
                            return [3 /*break*/, 4];
                        return [4 /*yield*/, this._loadId(id)];
                    case 3:
                        item = _b.sent();
                        this.setItem(id, item);
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        _loop_1 = function (id) {
                            var item = items.find(function (v) { return v.id === id; });
                            this_1.setItem(id, item);
                        };
                        this_1 = this;
                        for (_a = 0, ids_3 = ids; _a < ids_3.length; _a++) {
                            id = ids_3[_a];
                            _loop_1(id);
                        }
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], CacheIds.prototype, "dict", void 0);
    return CacheIds;
}());
export { CacheIds };
//# sourceMappingURL=cacheIds.js.map