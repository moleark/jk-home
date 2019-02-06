import * as tslib_1 from "tslib";
import { observable } from 'mobx';
import { Entity } from './entity';
var Query = /** @class */ (function (_super) {
    tslib_1.__extends(Query, _super);
    function Query() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Query.prototype, "typeName", {
        get: function () { return 'query'; },
        enumerable: true,
        configurable: true
    });
    Query.prototype.setSchema = function (schema) {
        _super.prototype.setSchema.call(this, schema);
        var returns = schema.returns;
        this.returns = returns;
        this.isPaged = returns.find(function (v) { return v.name === '$page'; }) !== undefined;
    };
    Query.prototype.resetPage = function (size, params) {
        this.pageStart = undefined;
        this.pageSize = size;
        this.params = params;
        this.more = false;
        this.list = undefined;
    };
    Object.defineProperty(Query.prototype, "hasMore", {
        get: function () { return this.more; },
        enumerable: true,
        configurable: true
    });
    Query.prototype.loadPage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, pageStart, page, ret;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.pageSize === undefined) {
                            throw 'call resetPage(size:number, params:any) first';
                        }
                        if (this.pageStart !== undefined) {
                            switch (this.startField.type) {
                                default:
                                    pageStart = this.pageStart;
                                    break;
                                case 'date':
                                case 'time':
                                case 'datetime':
                                    pageStart = this.pageStart.getTime();
                                    break;
                            }
                        }
                        return [4 /*yield*/, this.page(this.params, pageStart, this.pageSize + 1)];
                    case 1:
                        page = _b.sent();
                        /*
                        await this.loadSchema();
                        let res = await this.tvApi.page(this.name, pageStart, this.pageSize+1, this.params);
                        let data = await this.unpackReturns(res);
                        let page = data['$page'] as any[];
                        */
                        this.list = observable.array([], { deep: false });
                        if (page !== undefined) {
                            if (page.length > this.pageSize) {
                                this.more = true;
                                page.pop();
                                ret = this.returns.find(function (r) { return r.name === '$page'; });
                                this.startField = ret.fields[0];
                                this.pageStart = page[page.length - 1][this.startField.name];
                            }
                            else {
                                this.more = false;
                            }
                            (_a = this.list).push.apply(_a, page);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Query.prototype.page = function (params, pageStart, pageSize) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tvApi.page(this.name, pageStart, pageSize + 1, this.buildParams(params))];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, this.unpackReturns(res)];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, data.$page]; // as any[];
                }
            });
        });
    };
    Query.prototype.query = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tvApi.query(this.name, this.buildParams(params))];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, this.unpackReturns(res)];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Query.prototype.table = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret, i;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query(params)];
                    case 1:
                        ret = _a.sent();
                        for (i in ret) {
                            return [2 /*return*/, ret[i]];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Query.prototype.obj = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.table(params)];
                    case 1:
                        ret = _a.sent();
                        if (ret.length > 0)
                            return [2 /*return*/, ret[0]];
                        return [2 /*return*/];
                }
            });
        });
    };
    Query.prototype.scalar = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret, i;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.obj(params)];
                    case 1:
                        ret = _a.sent();
                        for (i in ret)
                            return [2 /*return*/, ret[i]];
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], Query.prototype, "list", void 0);
    return Query;
}(Entity));
export { Query };
//# sourceMappingURL=query.js.map