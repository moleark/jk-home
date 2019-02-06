import * as tslib_1 from "tslib";
import { Entity } from './entity';
var Map = /** @class */ (function (_super) {
    tslib_1.__extends(Map, _super);
    function Map() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actions = {};
        _this.queries = {};
        return _this;
    }
    Object.defineProperty(Map.prototype, "typeName", {
        get: function () { return 'map'; },
        enumerable: true,
        configurable: true
    });
    Map.prototype.setSchema = function (schema) {
        _super.prototype.setSchema.call(this, schema);
        this.schemaFrom = this.schema.from;
        var actions = schema.actions, queries = schema.queries, keys = schema.keys;
        this.entities.buildFieldTuid(this.keys = keys);
        //let t = this.schemaStringify();
        for (var i in actions) {
            var schema_1 = actions[i];
            var name_1 = schema_1.name;
            var action = this.entities.newAction(name_1, undefined);
            action.setSchema(schema_1);
            this.actions[i] = action;
        }
        for (var i in queries) {
            var schema_2 = queries[i];
            var name_2 = schema_2.name;
            var query = this.entities.newQuery(name_2, undefined);
            query.setSchema(schema_2);
            this.queries[i] = query;
        }
    };
    Map.prototype.add = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.actions.add.submit(param)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Map.prototype.del = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.actions.del.submit(param)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Map.prototype.all = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.queries.all.query({})];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Map.prototype.page = function (param, pageStart, pageSize) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.queries.page.page(param, pageStart, pageSize)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Map.prototype.query = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.queries.query.query(param)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Map.prototype.table = function (params) {
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
    Map.prototype.obj = function (params) {
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
    Map.prototype.scalar = function (params) {
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
    return Map;
}(Entity));
export { Map };
//# sourceMappingURL=map.js.map