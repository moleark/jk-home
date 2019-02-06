import * as tslib_1 from "tslib";
import { Entity } from './entity';
import { PageItems } from 'tonva-tools';
var Sheet = /** @class */ (function (_super) {
    tslib_1.__extends(Sheet, _super);
    function Sheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Sheet.prototype, "typeName", {
        get: function () { return 'sheet'; },
        enumerable: true,
        configurable: true
    });
    /*
    setStates(states: SheetState[]) {
        for (let state of states) {
            this.setStateAccess(this.states.find(s=>s.name==state.name), state);
        }
    }*/
    Sheet.prototype.setSchema = function (schema) {
        _super.prototype.setSchema.call(this, schema);
        this.states = schema.states;
    };
    Sheet.prototype.build = function (obj) {
        this.states = [];
        for (var _i = 0, _a = obj.ops; _i < _a.length; _i++) {
            var op = _a[_i];
            this.states.push({ name: op, actions: undefined });
        }
        /*
        for (let p in obj) {
            switch(p) {
                case '#':
                case '$': continue;
                default: this.states.push(this.createSheetState(p, obj[p])); break;
            }
        }*/
    };
    Sheet.prototype.createSheetState = function (name, obj) {
        var ret = { name: name, actions: [] };
        var actions = ret.actions;
        for (var p in obj) {
            var action = { name: p };
            actions.push(action);
        }
        return ret;
    };
    /*
    private setStateAccess(s:SheetState, s1:SheetState) {
        if (s === undefined) return;
        for (let action of s1.actions) {
            let acn = action.name;
            let ac = s.actions.find(a=>a.name === acn);
            if (ac === undefined) continue;
            s.actions.push(action);
        }
    }*/
    Sheet.prototype.save = function (discription, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var appId, text, ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        appId = this.entities.appId;
                        text = this.pack(data);
                        return [4 /*yield*/, this.tvApi.sheetSave(this.name, { app: appId, discription: discription, data: text })];
                    case 2:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    Sheet.prototype.action = function (id, flow, state, action) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tvApi.sheetAction(this.name, { id: id, flow: flow, state: state, action: action })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Sheet.prototype.unpack = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret, brief, sheetData, flows;
            return tslib_1.__generator(this, function (_a) {
                ret = data[0];
                brief = ret[0];
                sheetData = this.unpackSheet(brief.data);
                flows = data[1];
                return [2 /*return*/, {
                        brief: brief,
                        data: sheetData,
                        flows: flows,
                    }];
            });
        });
    };
    Sheet.prototype.getSheet = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tvApi.getSheet(this.name, id)];
                    case 2:
                        ret = _a.sent();
                        if (!(ret[0].length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getArchive(id)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [4 /*yield*/, this.unpack(ret)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Sheet.prototype.getArchive = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tvApi.sheetArchive(this.name, id)];
                    case 2:
                        ret = _a.sent();
                        return [4 /*yield*/, this.unpack(ret)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Sheet.prototype.getArchives = function (pageStart, pageSize) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tvApi.sheetArchives(this.name, { pageStart: pageStart, pageSize: pageSize })];
                    case 2:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    Sheet.prototype.getStateSheets = function (state, pageStart, pageSize) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tvApi.stateSheets(this.name, { state: state, pageStart: pageStart, pageSize: pageSize })];
                    case 2:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    Sheet.prototype.createPageStateItems = function () { return new PageStateItems(this); };
    Sheet.prototype.stateSheetCount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSchema()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tvApi.stateSheetCount(this.name)];
                    case 2:
                        ret = _a.sent();
                        return [2 /*return*/, this.states.map(function (s) {
                                var n = s.name, count = 0;
                                var r = ret.find(function (v) { return v.state === n; });
                                if (r !== undefined)
                                    count = r.count;
                                return { state: n, count: count };
                            })];
                }
            });
        });
    };
    return Sheet;
}(Entity));
export { Sheet };
var PageStateItems = /** @class */ (function (_super) {
    tslib_1.__extends(PageStateItems, _super);
    function PageStateItems(sheet) {
        var _this = _super.call(this, true) || this;
        _this.sheet = sheet;
        _this.pageSize = 10;
        return _this;
    }
    PageStateItems.prototype.load = function (param, pageStart, pageSize) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sheet.getStateSheets(param, pageStart, pageSize)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    PageStateItems.prototype.setPageStart = function (item) {
        this.pageStart = item === undefined ? 0 : item.id;
    };
    return PageStateItems;
}(PageItems));
export { PageStateItems };
//# sourceMappingURL=sheet.js.map