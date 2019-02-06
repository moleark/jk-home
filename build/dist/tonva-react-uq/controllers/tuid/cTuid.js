import * as tslib_1 from "tslib";
import _ from 'lodash';
import { CEntity } from "../CVEntity";
import { VTuidMain } from './vTuidMain';
import { VTuidEdit } from './vTuidEdit';
import { VTuidSelect } from './vTuidSelect';
import { VTuidInfo } from "./vTuidInfo";
import { TuidPageItems } from "./pageItems";
import { VTuidMainList } from './vTuidList';
var CTuid = /** @class */ (function (_super) {
    tslib_1.__extends(CTuid, _super);
    function CTuid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuid.prototype.buildPageItems = function () {
        return new TuidPageItems(this.entity.owner || this.entity);
    };
    CTuid.prototype.searchMain = function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.PageItems === undefined) {
                            this.PageItems = this.buildPageItems();
                        }
                        if (!(key !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.PageItems.first(key)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CTuid.prototype.getDivItems = function (ownerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.searchArr(ownerId, undefined, 0, 1000)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    return CTuid;
}(CEntity));
export { CTuid };
var CTuidMain = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidMain, _super);
    function CTuidMain(cUq, entity, ui, res) {
        var _this = _super.call(this, cUq, entity, ui, res) || this;
        var tuid = _this.entity;
        _this.proxies = tuid.proxies;
        if (_this.proxies !== undefined) {
            _this.proxyLinks = [];
            for (var i in _this.proxies) {
                var link = _this.cUq.linkFromName('tuid', i);
                _this.proxyLinks.push(link);
            }
        }
        return _this;
    }
    CTuidMain.prototype.from = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.cFrom()];
                    case 1:
                        ret = _a.sent();
                        if (ret === undefined)
                            return [2 /*return*/, this];
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    CTuidMain.prototype.cUqFrom = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.cUqFrom()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CTuidMain.prototype.cEditFrom = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cUq;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.cUqFrom()];
                    case 1:
                        cUq = _a.sent();
                        return [4 /*yield*/, cUq.cTuidEditFromName(this.entity.name)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CTuidMain.prototype.cInfoFrom = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cUq;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.cUqFrom()];
                    case 1:
                        cUq = _a.sent();
                        return [4 /*yield*/, cUq.cTuidInfoFromName(this.entity.name)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CTuidMain.prototype.cSelectFrom = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cUq;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.cUqFrom()];
                    case 1:
                        cUq = _a.sent();
                        return [4 /*yield*/, cUq.cTuidSelectFromName(this.entity.name)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CTuidMain.prototype.getLable = function (tuid) {
        if (tuid === this.entity)
            return this.label;
        var name = tuid.name;
        var arrs = this.res.arrs;
        if (arrs !== undefined) {
            var arr = arrs[name];
            if (arr !== undefined) {
                var label = arr.label;
                if (label !== undefined)
                    return label;
            }
        }
        return name;
    };
    Object.defineProperty(CTuidMain.prototype, "VTuidMain", {
        get: function () { return VTuidMain; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CTuidMain.prototype, "VTuidEdit", {
        get: function () { return VTuidEdit; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CTuidMain.prototype, "VTuidList", {
        get: function () { return VTuidMainList; },
        enumerable: true,
        configurable: true
    });
    CTuidMain.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isFrom = this.entity.schemaFrom !== undefined;
                        return [4 /*yield*/, this.showVPage(this.VTuidMain)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CTuidMain.prototype.onEvent = function (type, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var v, _a, cTuidInfo;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = type;
                        switch (_a) {
                            case 'new': return [3 /*break*/, 2];
                            case 'list': return [3 /*break*/, 3];
                            case 'edit': return [3 /*break*/, 4];
                            case 'item-changed': return [3 /*break*/, 6];
                            case 'info': return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 1];
                    case 1: return [2 /*return*/];
                    case 2:
                        v = this.VTuidEdit;
                        return [3 /*break*/, 9];
                    case 3:
                        v = this.VTuidList;
                        return [3 /*break*/, 9];
                    case 4: return [4 /*yield*/, this.edit(value)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                    case 6:
                        this.itemChanged(value);
                        return [2 /*return*/];
                    case 7:
                        cTuidInfo = new CTuidInfo(this.cUq, this.entity, this.ui, this.res);
                        return [4 /*yield*/, cTuidInfo.start(value)];
                    case 8:
                        _b.sent();
                        return [2 /*return*/];
                    case 9: return [4 /*yield*/, this.showVPage(v, value)];
                    case 10:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CTuidMain.prototype.edit = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var values, v;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = undefined;
                        if (!(id !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.entity.load(id)];
                    case 1:
                        values = _a.sent();
                        _a.label = 2;
                    case 2:
                        v = this.VTuidEdit;
                        return [4 /*yield*/, this.showVPage(v, values)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CTuidMain.prototype.itemChanged = function (_a) {
        var id = _a.id, values = _a.values;
        if (this.PageItems === undefined)
            return;
        var items = this.PageItems.items;
        var item = items.find(function (v) { return v.id === id; });
        if (item !== undefined) {
            _.merge(item, values);
        }
    };
    return CTuidMain;
}(CTuid));
export { CTuidMain };
var CTuidEdit = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidEdit, _super);
    function CTuidEdit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidEdit.prototype.internalStart = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.edit(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CTuidEdit;
}(CTuidMain));
export { CTuidEdit };
var CTuidList = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidList, _super);
    function CTuidList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidList.prototype.internalStart = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.showVPage(this.VTuidList)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CTuidList;
}(CTuidMain));
export { CTuidList };
var CTuidDiv = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidDiv, _super);
    function CTuidDiv() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidDiv.prototype.internalStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                alert('tuid div: ' + this.entity.name);
                return [2 /*return*/];
            });
        });
    };
    return CTuidDiv;
}(CTuid));
export { CTuidDiv };
var CTuidSelect = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidSelect, _super);
    function CTuidSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidSelect.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.showVPage(this.VTuidSelect, param)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CTuidSelect.prototype.beforeStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //if (await super.beforeStart() === false) return false;
                    return [4 /*yield*/, this.entity.loadSchema()];
                    case 1:
                        //if (await super.beforeStart() === false) return false;
                        _a.sent();
                        if (this.PageItems !== undefined)
                            this.PageItems.reset();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Object.defineProperty(CTuidSelect.prototype, "VTuidSelect", {
        get: function () { return VTuidSelect; },
        enumerable: true,
        configurable: true
    });
    CTuidSelect.prototype.idFromItem = function (item) {
        return item.id;
    };
    return CTuidSelect;
}(CTuid));
export { CTuidSelect };
var CTuidInfo = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidInfo, _super);
    function CTuidInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidInfo.prototype.internalStart = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.load(id)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.showVPage(this.VTuidInfo, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CTuidInfo.prototype, "VTuidInfo", {
        get: function () { return VTuidInfo; },
        enumerable: true,
        configurable: true
    });
    return CTuidInfo;
}(CTuid));
export { CTuidInfo };
//# sourceMappingURL=cTuid.js.map