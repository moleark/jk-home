import * as tslib_1 from "tslib";
import { UsqApi, Controller, UnitxApi, meInFrame, resLang } from 'tonva-tools';
import { Entities } from '../../entities';
import { CLink } from '../link';
import { CBook } from '../book';
import { CSheet } from '../sheet';
import { CAction } from '../action';
import { CQuery, CQuerySelect } from '../query';
import { CTuidMain, CTuidInfo, CTuidSelect, CTuidEdit, CTuidList } from '../tuid';
import { CMap } from '../map';
import { PureJSONContent } from '../form/viewModel';
import { VUsq } from './vUsq';
import { CHistory } from '../history';
import { CPending } from '../pending';
function lowerPropertyName(entities) {
    if (entities === undefined)
        return;
    for (var i in entities)
        entities[i.toLowerCase()] = entities[i];
}
var CUsq = /** @class */ (function (_super) {
    tslib_1.__extends(CUsq, _super); /* implements Usq*/
    function CUsq(cApp, usq, appId, usqId, access, ui) {
        var _this = _super.call(this, resLang(ui.res)) || this;
        _this.schemaLoaded = false;
        _this.isSysVisible = false;
        _this.cApp = cApp;
        _this.usq = usq;
        _this.id = usqId;
        // 每一个ui都转换成小写的key的版本
        lowerPropertyName(ui.tuid);
        lowerPropertyName(ui.sheet);
        lowerPropertyName(ui.map);
        lowerPropertyName(ui.query);
        lowerPropertyName(ui.action);
        lowerPropertyName(ui.book);
        lowerPropertyName(ui.history);
        lowerPropertyName(ui.pending);
        _this.ui = ui;
        _this.CTuidMain = ui.CTuidMain || CTuidMain;
        _this.CTuidEdit = ui.CTuidEdit || CTuidEdit;
        _this.CTuidList = ui.CTuidList || CTuidList;
        _this.CTuidSelect = ui.CTuidSelect || CTuidSelect;
        _this.CTuidInfo = ui.CTuidInfo || CTuidInfo;
        _this.CQuery = ui.CQuery || CQuery;
        _this.CQuerySelect = ui.CQuerySelect || CQuerySelect;
        _this.CMap = ui.CMap || CMap;
        _this.CAction = ui.CAction || CAction;
        _this.CSheet = ui.CSheet || CSheet;
        _this.CBook = ui.CBook || CBook;
        _this.CHistory = ui.CHistory || CHistory;
        _this.CPending = ui.CPending || CPending;
        var token = undefined;
        var usqOwner, usqName;
        var p = usq.split('/');
        switch (p.length) {
            case 1:
                usqOwner = '$$$';
                usqName = p[0];
                break;
            case 2:
                usqOwner = p[0];
                usqName = p[1];
                break;
            default:
                console.log('usq must be usqOwner/usqName format');
                return;
        }
        var hash = document.location.hash;
        var baseUrl = hash === undefined || hash === '' ?
            'debug/' : 'tv/';
        var acc;
        if (access === null || access === undefined || access === '*') {
            acc = [];
        }
        else {
            acc = access.split(';').map(function (v) { return v.trim(); }).filter(function (v) { return v.length > 0; });
        }
        var usqApi;
        if (usq === '$$$/$unitx') {
            // 这里假定，点击home link之后，已经设置unit了
            // 调用 UnitxApi会自动搜索绑定 unitx service
            usqApi = new UnitxApi(meInFrame.unit);
        }
        else {
            usqApi = new UsqApi(baseUrl, usqOwner, usqName, acc, true);
        }
        _this.entities = new Entities(_this, usqApi, appId);
        return _this;
    }
    CUsq.prototype.internalStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    CUsq.prototype.loadEntites = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entities.loadAccess()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CUsq.prototype.loadSchema = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var i, g, caption, collection, j, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.schemaLoaded === true)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.loadEntites()];
                    case 1:
                        _a.sent();
                        if (this.id === undefined)
                            this.id = this.entities.usqId;
                        for (i in this.ui) {
                            g = this.ui[i];
                            if (g === undefined)
                                continue;
                            caption = g.caption, collection = g.collection;
                            if (collection === undefined)
                                continue;
                            for (j in collection) {
                                if (this.entities[i](j) === undefined) {
                                    console.warn(i + ':' + '\'' + j + '\' is not usql entity');
                                }
                            }
                        }
                        this.schemaLoaded = true;
                        return [2 /*return*/];
                    case 2:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [2 /*return*/, this.error = err_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CUsq.prototype.getQuerySearch = function (name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, returns;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.entities.query(name);
                        if (!(query === undefined)) return [3 /*break*/, 1];
                        alert("QUERY " + name + " \u6CA1\u6709\u5B9A\u4E49!");
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, query.loadSchema()];
                    case 2:
                        _a.sent();
                        returns = query.returns;
                        if (returns.length > 1) {
                            alert("QUERY " + name + " \u8FD4\u56DE\u591A\u5F20\u8868, \u65E0\u6CD5\u505AQuerySearch");
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, query];
                }
            });
        });
    };
    CUsq.prototype.getTuidPlaceHolder = function (tuid) {
        var _a = this.res, tuidPlaceHolder = _a.tuidPlaceHolder, entity = _a.entity;
        var name = tuid.name;
        var type;
        if (entity !== undefined) {
            var en = entity[name];
            if (en !== undefined) {
                type = en.label;
            }
        }
        return (tuidPlaceHolder || 'Select');
    };
    CUsq.prototype.getNone = function () {
        var none = this.res.none;
        return none || 'none';
    };
    CUsq.prototype.isVisible = function (entity) {
        return entity.sys !== true || this.isSysVisible;
    };
    CUsq.prototype.navSheet = function (sheetTypeId, sheetId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sheet, cSheet;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sheet = this.entities.sheetFromTypeId(sheetTypeId);
                        if (sheet === undefined) {
                            alert('sheetTypeId ' + sheetTypeId + ' is not exists!');
                            return [2 /*return*/];
                        }
                        cSheet = this.cSheet(sheet);
                        return [4 /*yield*/, cSheet.startSheet(sheetId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CUsq.prototype.sheet = function (entityName) { return this.entities.sheet(entityName); };
    CUsq.prototype.action = function (entityName) { return this.entities.action(entityName); };
    CUsq.prototype.query = function (entityName) { return this.entities.query(entityName); };
    CUsq.prototype.book = function (entityName) { return this.entities.book(entityName); };
    CUsq.prototype.map = function (entityName) { return this.entities.map(entityName); };
    CUsq.prototype.history = function (entityName) { return this.entities.history(entityName); };
    CUsq.prototype.pending = function (entityName) { return this.entities.pending(entityName); };
    CUsq.prototype.tuid = function (entityName) { return this.entities.tuid(entityName); };
    CUsq.prototype.tuidDiv = function (entityName, divName) {
        var tuid = this.entities.tuid(entityName);
        if (tuid === undefined)
            return;
        var divs = tuid.divs;
        if (divs === undefined)
            return;
        return divs[divName];
    };
    CUsq.prototype.cSheetFromName = function (entityName) {
        var entity = this.entities.sheet(entityName);
        if (entity !== undefined)
            return this.cSheet(entity);
    };
    CUsq.prototype.cActionFromName = function (entityName) {
        var entity = this.entities.action(entityName);
        if (entity !== undefined)
            return this.cAction(entity);
    };
    CUsq.prototype.cQueryFromName = function (entityName) {
        var entity = this.entities.query(entityName);
        if (entity !== undefined)
            return this.cQuery(entity);
    };
    CUsq.prototype.cBookFromName = function (entityName) {
        var entity = this.entities.book(entityName);
        if (entity !== undefined)
            return this.cBook(entity);
    };
    CUsq.prototype.cMapFromName = function (entityName) {
        var entity = this.entities.map(entityName);
        if (entity !== undefined)
            return this.cMap(entity);
    };
    CUsq.prototype.cHistoryFromName = function (entityName) {
        var entity = this.entities.history(entityName);
        if (entity !== undefined)
            return this.cHistory(entity);
    };
    CUsq.prototype.cPendingFromName = function (entityName) {
        var entity = this.entities.pending(entityName);
        if (entity !== undefined)
            return this.cPending(entity);
    };
    CUsq.prototype.cTuidMainFromName = function (entityName) {
        var entity = this.entities.tuid(entityName);
        if (entity !== undefined)
            return this.cTuidMain(entity);
    };
    CUsq.prototype.cTuidEditFromName = function (entityName) {
        var entity = this.entities.tuid(entityName);
        if (entity !== undefined)
            return this.cTuidEdit(entity);
    };
    CUsq.prototype.cTuidInfoFromName = function (entityName) {
        var entity = this.entities.tuid(entityName);
        if (entity !== undefined)
            return this.cTuidInfo(entity);
    };
    CUsq.prototype.cTuidSelectFromName = function (entityName) {
        var entity = this.entities.tuid(entityName);
        if (entity !== undefined)
            return this.cTuidSelect(entity);
    };
    CUsq.prototype.cFromName = function (entityType, entityName) {
        switch (entityType) {
            case 'sheet':
                var sheet = this.entities.sheet(entityName);
                if (sheet === undefined)
                    return;
                return this.cSheet(sheet);
            case 'action':
                var action = this.entities.action(entityName);
                if (action === undefined)
                    return;
                return this.cAction(action);
            case 'tuid':
                var tuid = this.entities.tuid(entityName);
                if (tuid === undefined)
                    return;
                return this.cTuidMain(tuid);
            case 'query':
                var query = this.entities.query(entityName);
                if (query === undefined)
                    return;
                return this.cQuery(query);
            case 'book':
                var book = this.entities.book(entityName);
                if (book === undefined)
                    return;
                return this.cBook(book);
            case 'map':
                var map = this.entities.map(entityName);
                if (map === undefined)
                    return;
                return this.cMap(map);
            case 'history':
                var history_1 = this.entities.history(entityName);
                if (history_1 === undefined)
                    return;
                return this.cHistory(history_1);
            case 'pending':
                var pending_1 = this.entities.pending(entityName);
                if (pending_1 === undefined)
                    return;
                return this.cPending(pending_1);
        }
    };
    CUsq.prototype.linkFromName = function (entityType, entityName) {
        return this.link(this.cFromName(entityType, entityName));
    };
    CUsq.prototype.getUI = function (t) {
        var ui, res;
        var name = t.name, typeName = t.typeName;
        if (this.ui !== undefined) {
            var tUI = this.ui[typeName];
            if (tUI !== undefined) {
                ui = tUI[name];
            }
        }
        var entity = this.res.entity;
        if (entity !== undefined) {
            res = entity[name];
        }
        return { ui: ui || {}, res: res || {} };
    };
    CUsq.prototype.link = function (cEntity) {
        return new CLink(cEntity);
    };
    Object.defineProperty(CUsq.prototype, "tuidLinks", {
        get: function () {
            var _this = this;
            return this.entities.tuidArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) { return _this.link(_this.cTuidMain(v)); });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cTuidMain = function (tuid) {
        var _a = this.getUI(tuid), ui = _a.ui, res = _a.res;
        return new (ui && ui.CTuidMain || this.CTuidMain)(this, tuid, ui, res);
    };
    CUsq.prototype.cTuidEdit = function (tuid) {
        var _a = this.getUI(tuid), ui = _a.ui, res = _a.res;
        return new (ui && ui.CTuidEdit || this.CTuidEdit)(this, tuid, ui, res);
    };
    CUsq.prototype.cTuidList = function (tuid) {
        var _a = this.getUI(tuid), ui = _a.ui, res = _a.res;
        return new (ui && ui.CTuidList || this.CTuidList)(this, tuid, ui, res);
    };
    CUsq.prototype.cTuidSelect = function (tuid) {
        var _a = this.getUI(tuid.owner || tuid), ui = _a.ui, res = _a.res;
        return new (ui && ui.CTuidSelect || this.CTuidSelect)(this, tuid, ui, res);
    };
    CUsq.prototype.cTuidInfo = function (tuid) {
        var _a = this.getUI(tuid), ui = _a.ui, res = _a.res;
        return new (ui && ui.CTuidInfo || this.CTuidInfo)(this, tuid, ui, res);
    };
    CUsq.prototype.cSheet = function (sheet /*, sheetUI?:SheetUI, sheetRes?:any*/) {
        var _a = this.getUI(sheet), ui = _a.ui, res = _a.res;
        //if (sheetUI !== undefined) ui = sheetUI;
        //if (sheetRes !== undefined) res = sheetRes;
        //return new (ui && ui.CSheet || this.CSheet)(this, sheet, sheetUI, sheetRes);
        return new (ui && ui.CSheet || this.CSheet)(this, sheet, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "sheetLinks", {
        get: function () {
            var _this = this;
            return this.entities.sheetArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cSheet(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cAction = function (action) {
        var _a = this.getUI(action), ui = _a.ui, res = _a.res;
        return new (ui && ui.CAction || this.CAction)(this, action, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "actionLinks", {
        get: function () {
            var _this = this;
            return this.entities.actionArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cAction(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cQuery = function (query) {
        var _a = this.getUI(query), ui = _a.ui, res = _a.res;
        return new (ui && ui.CQuery || this.CQuery)(this, query, ui, res);
    };
    CUsq.prototype.cQuerySelect = function (queryName) {
        var query = this.entities.query(queryName);
        if (query === undefined)
            return;
        var _a = this.getUI(query), ui = _a.ui, res = _a.res;
        return new (ui && ui.CQuerySelect || this.CQuerySelect)(this, query, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "queryLinks", {
        get: function () {
            var _this = this;
            return this.entities.queryArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cQuery(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cBook = function (book) {
        var _a = this.getUI(book), ui = _a.ui, res = _a.res;
        return new (ui && ui.CBook || this.CBook)(this, book, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "bookLinks", {
        get: function () {
            var _this = this;
            return this.entities.bookArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cBook(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cHistory = function (history) {
        var _a = this.getUI(history), ui = _a.ui, res = _a.res;
        return new (ui && ui.CHistory || this.CHistory)(this, history, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "historyLinks", {
        get: function () {
            var _this = this;
            return this.entities.historyArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cHistory(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cPending = function (pending) {
        var _a = this.getUI(pending), ui = _a.ui, res = _a.res;
        return new (ui && ui.CPending || this.CPending)(this, pending, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "pendingLinks", {
        get: function () {
            var _this = this;
            return this.entities.pendingArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cPending(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.cMap = function (map) {
        var _a = this.getUI(map), ui = _a.ui, res = _a.res;
        return new (ui && ui.CMap || this.CMap)(this, map, ui, res);
    };
    Object.defineProperty(CUsq.prototype, "mapLinks", {
        get: function () {
            var _this = this;
            return this.entities.mapArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cMap(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.getTuidContent = function (tuid) {
        var owner = tuid.owner;
        if (owner === undefined) {
            var ui = this.getUI(tuid).ui;
            return (ui && ui.content) || PureJSONContent;
        }
        else {
            var ui = this.getUI(owner).ui;
            return (ui && ui.divs && ui.divs[tuid.name].content) || PureJSONContent;
        }
    };
    CUsq.prototype.showTuid = function (tuid, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var owner, c;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        owner = tuid.owner;
                        c = this.cTuidInfo(owner || tuid);
                        return [4 /*yield*/, c.start(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CUsq.prototype, "VUsq", {
        get: function () { return VUsq; },
        enumerable: true,
        configurable: true
    });
    CUsq.prototype.render = function () {
        var v = new (this.VUsq)(this);
        return v.render();
    };
    return CUsq;
}(Controller /* implements Usq*/));
export { CUsq };
//# sourceMappingURL=cUsq.js.map