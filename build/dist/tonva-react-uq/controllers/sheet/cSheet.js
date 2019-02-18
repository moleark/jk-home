import * as tslib_1 from "tslib";
import { observable } from "mobx";
import { postWsToTop } from 'tonva-tools';
import { CEntity } from "../CVEntity";
import { VSheetMain } from "./vMain";
import { VSheetNew } from "./vNew";
import { VSheetEdit } from "./vEdit";
import { VSheetAction } from "./vSheetAction";
import { VSheetSchema } from "./vSchema";
import { VArchives } from "./vArchives";
import { VSheetList } from "./vList";
import { VArchived } from "./vArchived";
import { VSheetSaved } from "./vSaved";
import { VSheetProcessing } from "./vSheetProcessing";
var CSheet = /** @class */ (function (_super) {
    tslib_1.__extends(CSheet, _super);
    function CSheet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statesCount = observable.array([], { deep: true });
        _this.onSave = function (values, valuesWithBox) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveSheet(values, valuesWithBox)];
                    case 1:
                        ret = _a.sent();
                        this.ceasePage();
                        //this.openPage(this.finishedPage);
                        return [4 /*yield*/, this.showSaved(ret)];
                    case 2:
                        //this.openPage(this.finishedPage);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    CSheet.prototype.internalStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadStateSheetCount()];
                    case 1:
                        _a.sent();
                        this.pageStateItems = this.entity.createPageStateItems();
                        return [4 /*yield*/, this.openVPage(this.VSheetMain)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.onMessage = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var type, body, from, to, push;
            return tslib_1.__generator(this, function (_a) {
                type = msg.type, body = msg.body, from = msg.from, to = msg.to, push = msg.push;
                if (type === 'sheet')
                    this.onSheet(from, to, body);
                return [2 /*return*/];
            });
        });
    };
    CSheet.prototype.onSheet = function (from, to, sheetData) {
        var me = this.user.id;
        var id = sheetData.id, preState = sheetData.preState, state = sheetData.state;
        console.log({ $: 'onMessage sheet', from: from, to: to.join(','), id: id, preState: preState, state: state, me: me, sheetData: sheetData });
        if (from === me) {
            this.sheetActPreState(id, preState);
        }
        if (to.find(function (v) { return v === me; }) !== undefined) {
            this.sheetActState(id, state, sheetData);
        }
    };
    CSheet.prototype.sheetActPreState = function (id, preState) {
        this.changeStateCount(preState, -1);
        if (this.curState === undefined || this.curState !== preState)
            return;
        /*
        let index = this.stateSheets.findIndex(v => v.id === id);
        if (index>=0) {
            this.stateSheets.splice(index, 1);
        }*/
        var index = this.pageStateItems.items.findIndex(function (v) { return v.id === id; });
        if (index >= 0) {
            this.pageStateItems.items.splice(index, 1);
        }
    };
    CSheet.prototype.sheetActState = function (id, state, msg) {
        this.changeStateCount(state, 1);
        if (this.curState === undefined || this.curState !== state)
            return;
        /*
        if (this.stateSheets.findIndex(v => v.id === id) < 0) {
            this.stateSheets.push(msg);
        }
        */
        if (this.pageStateItems.items.findIndex(function (v) { return v.id === id; }) < 0) {
            this.pageStateItems.items.push(msg);
        }
    };
    CSheet.prototype.changeStateCount = function (state, delta) {
        if (state === undefined)
            return;
        var index = this.statesCount.findIndex(function (v) { return v.state === state; });
        console.log({ $: 'changeState', state: state, delta: delta, index: index });
        if (index < 0)
            return;
        var stateCount = this.statesCount[index];
        stateCount.count += delta;
        if (stateCount.count < 0)
            stateCount.count = 0;
    };
    Object.defineProperty(CSheet.prototype, "VSheetMain", {
        get: function () { return (this.ui && this.ui.main) || VSheetMain; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetNew", {
        get: function () { return this.ui.sheetNew || VSheetNew; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetSaved", {
        get: function () { return this.ui.sheetSaved || VSheetSaved; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetEdit", {
        get: function () { return this.ui.sheetEdit || VSheetEdit; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetSchema", {
        get: function () { return VSheetSchema; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VArchives", {
        get: function () { return VArchives; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VArchived", {
        get: function () { return VArchived; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetList", {
        get: function () { return VSheetList; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetAction", {
        get: function () { return this.ui.sheetAction || VSheetAction; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSheet.prototype, "VSheetProcessing", {
        get: function () { return VSheetProcessing; },
        enumerable: true,
        configurable: true
    });
    CSheet.prototype.onEvent = function (type, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var c, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = type;
                        switch (_a) {
                            case 'new': return [3 /*break*/, 2];
                            case 'schema': return [3 /*break*/, 3];
                            case 'archives': return [3 /*break*/, 4];
                            case 'state': return [3 /*break*/, 5];
                            case 'archived': return [3 /*break*/, 6];
                            case 'action': return [3 /*break*/, 8];
                            case 'processing': return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 1];
                    case 1: return [2 /*return*/];
                    case 2:
                        c = this.VSheetNew;
                        return [3 /*break*/, 12];
                    case 3:
                        c = this.VSheetSchema;
                        return [3 /*break*/, 12];
                    case 4:
                        c = this.VArchives;
                        return [3 /*break*/, 12];
                    case 5:
                        this.curState = value.state;
                        c = this.VSheetList;
                        return [3 /*break*/, 12];
                    case 6: return [4 /*yield*/, this.showArchived(value)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/];
                    case 8: return [4 /*yield*/, this.showAction(value)];
                    case 9:
                        _b.sent();
                        return [2 /*return*/];
                    case 10: return [4 /*yield*/, this.showProcessing(value)];
                    case 11:
                        _b.sent();
                        return [2 /*return*/];
                    case 12: return [4 /*yield*/, this.openVPage(c, value)];
                    case 13:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.startSheet = function (sheetId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.beforeStart()];
                    case 1:
                        if ((_a.sent()) === false)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.onEvent('action', sheetId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.showAction = function (sheetId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sheetData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSheetData(sheetId)];
                    case 1:
                        sheetData = _a.sent();
                        postWsToTop({
                            body: {
                                $type: 'msg',
                                action: '$sheet',
                                msg: {
                                    id: sheetId,
                                    uq: this.cUq.id,
                                    state: sheetData.brief.state
                                }
                            }
                        });
                        return [4 /*yield*/, this.openVPage(this.VSheetAction, sheetData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.showProcessing = function (sheetId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sheetData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSheetData(sheetId)];
                    case 1:
                        sheetData = _a.sent();
                        return [4 /*yield*/, this.openVPage(this.VSheetProcessing, sheetData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.editSheet = function (sheetData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var values;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.vCall(this.VSheetEdit, sheetData)];
                    case 1:
                        values = _a.sent();
                        return [2 /*return*/, values];
                }
            });
        });
    };
    CSheet.prototype.showArchived = function (inBrief) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sheetData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getArchived(inBrief.id)];
                    case 1:
                        sheetData = _a.sent();
                        return [4 /*yield*/, this.openVPage(this.VArchived, sheetData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.showSaved = function (sheetData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openVPage(this.VSheetSaved, sheetData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.getStateUI = function (stateName) {
        var states = this.res.states;
        if (states === undefined)
            return;
        return states[stateName];
    };
    CSheet.prototype.getStateLabel = function (stateName) {
        var state = this.getStateUI(stateName);
        var ret = (state && state.label) || stateName;
        switch (ret) {
            default: return ret;
            case '$': return '新单';
        }
    };
    CSheet.prototype.getActionLabel = function (stateName, actionName) {
        var state = this.getStateUI(stateName);
        if (state === undefined)
            return actionName;
        var actions = state.actions;
        if (actions === undefined)
            return actionName;
        var action = actions[actionName];
        return (action && action.label) || actionName;
    };
    CSheet.prototype.loadStateSheetCount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, statesCount;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.statesCount.clear();
                        return [4 /*yield*/, this.entity.stateSheetCount()];
                    case 1:
                        statesCount = _b.sent();
                        (_a = this.statesCount).splice.apply(_a, [0, 0].concat(statesCount));
                        return [2 /*return*/];
                }
            });
        });
    };
    CSheet.prototype.getSheetData = function (sheetId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.getSheet(sheetId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CSheet.prototype.getArchived = function (sheetId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.getArchive(sheetId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CSheet.prototype.saveSheet = function (values, valuesWithBox) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sheetTitle, disc, ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sheetTitle = this.ui.sheetTitle;
                        disc = sheetTitle === undefined ? this.label : sheetTitle(valuesWithBox, this.x);
                        return [4 /*yield*/, this.entity.save(disc, values)];
                    case 1:
                        ret = _a.sent();
                        //let {id, state} = ret;
                        //if (id > 0) this.changeStateCount(state, 1);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    CSheet.prototype.action = function (id, flow, state, actionName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.action(id, flow, state, actionName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CSheet;
}(CEntity));
export { CSheet };
//# sourceMappingURL=cSheet.js.map