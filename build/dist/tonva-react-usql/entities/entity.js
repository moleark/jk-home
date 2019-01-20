import * as tslib_1 from "tslib";
var tab = '\t';
var ln = '\n';
var Entity = /** @class */ (function () {
    function Entity(entities, name, typeId) {
        this.fieldMaps = {};
        this.entities = entities;
        this.name = name;
        this.typeId = typeId;
        this.sys = this.name.indexOf('$') >= 0;
    }
    Object.defineProperty(Entity.prototype, "sName", {
        get: function () { return this.jName || this.name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "tvApi", {
        get: function () { return this.entities.usqApi; },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.getApiFrom = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, this.entities.usqApi];
        }); });
    };
    Entity.prototype.fieldMap = function (arr) {
        if (arr === undefined)
            arr = '$';
        var ret = this.fieldMaps[arr];
        if (ret === undefined) {
            var fields = void 0;
            if (arr === '$')
                fields = this.fields;
            else if (this.arrFields !== undefined) {
                var arrFields = this.arrFields.find(function (v) { return v.name === arr; });
                if (arrFields !== undefined)
                    fields = arrFields.fields;
            }
            else if (this.returns !== undefined) {
                var arrFields = this.returns.find(function (v) { return v.name === arr; });
                if (arrFields !== undefined)
                    fields = arrFields.fields;
            }
            if (fields === undefined)
                return {};
            ret = {};
            for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                var f = fields_1[_i];
                ret[f.name] = f;
            }
            this.fieldMaps[arr] = ret;
        }
        return ret;
    };
    Entity.prototype.loadSchema = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var schema;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.schema !== undefined)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.entities.usqApi.schema(this.name)];
                    case 1:
                        schema = _a.sent();
                        this.setSchema(schema);
                        return [2 /*return*/];
                }
            });
        });
    };
    Entity.prototype.setSchema = function (schema) {
        if (schema === undefined)
            return;
        if (this.schema !== undefined)
            return;
        this.schema = schema;
        var name = schema.name, fields = schema.fields, arrs = schema.arrs, returns = schema.returns;
        if (name !== this.name)
            this.jName = name;
        this.entities.buildFieldTuid(this.fields = fields);
        this.entities.buildArrFieldsTuid(this.arrFields = arrs, fields);
        this.entities.buildArrFieldsTuid(this.returns = returns, fields);
        //this.newMain = this.buildCreater(fields);
        //this.newArr = this.buildArrCreater(arrs);
        //this.newRet = this.buildArrCreater(returns);
    };
    Entity.prototype.schemaStringify = function () {
        return JSON.stringify(this.schema, function (key, value) {
            if (key === '_tuid')
                return undefined;
            return value;
        }, 4);
    };
    Entity.prototype.tuidFromField = function (field) {
        var _tuid = field._tuid, tuid = field.tuid;
        if (tuid === undefined)
            return;
        if (_tuid !== undefined)
            return _tuid;
        return field._tuid = this.entities.getTuid(tuid, undefined);
    };
    Entity.prototype.tuidFromName = function (fieldName, arrName) {
        if (this.schema === undefined)
            return;
        var _a = this.schema, fields = _a.fields, arrs = _a.arrs;
        var entities = this.entities;
        function getTuid(fn, fieldArr) {
            if (fieldArr === undefined)
                return;
            var f = fieldArr.find(function (v) { return v.name === fn; });
            if (f === undefined)
                return;
            return entities.getTuid(f.tuid, undefined);
        }
        var fn = fieldName.toLowerCase();
        if (arrName === undefined)
            return getTuid(fn, fields);
        if (arrs === undefined)
            return;
        var an = arrName.toLowerCase();
        var arr = arrs.find(function (v) { return v.name === an; });
        if (arr === undefined)
            return;
        return getTuid(fn, arr.fields);
    };
    Entity.prototype.buildParams = function (params) {
        var result = {};
        var fields = this.fields;
        if (fields !== undefined)
            this.buildFieldsParams(result, fields, params);
        var arrs = this.arrFields;
        if (arrs !== undefined) {
            for (var _i = 0, arrs_1 = arrs; _i < arrs_1.length; _i++) {
                var arr = arrs_1[_i];
                var name_1 = arr.name, fields_2 = arr.fields;
                var paramsArr = params[name_1];
                if (paramsArr === undefined)
                    continue;
                var arrResult = [];
                result[name_1] = arrResult;
                for (var _a = 0, params_1 = params; _a < params_1.length; _a++) {
                    var pa = params_1[_a];
                    var rowResult = {};
                    this.buildFieldsParams(rowResult, fields_2, pa);
                    arrResult.push(rowResult);
                }
            }
        }
        return result;
    };
    Entity.prototype.buildFieldsParams = function (result, fields, params) {
        for (var _i = 0, fields_3 = fields; _i < fields_3.length; _i++) {
            var field = fields_3[_i];
            var name_2 = field.name;
            var d = params[name_2];
            var val = void 0;
            switch (typeof d) {
                default:
                    val = d;
                    break;
                case 'object':
                    var tuid = field._tuid;
                    if (tuid === undefined)
                        val = d.id;
                    else
                        val = tuid.getIdFromObj(d);
                    break;
            }
            result[name_2] = val;
        }
    };
    Entity.prototype.pack = function (data) {
        var ret = [];
        var fields = this.fields;
        if (fields !== undefined)
            this.packRow(ret, fields, data);
        var arrs = this.arrFields; //schema['arrs'];
        if (arrs !== undefined) {
            for (var _i = 0, arrs_2 = arrs; _i < arrs_2.length; _i++) {
                var arr = arrs_2[_i];
                this.packArr(ret, arr.fields, data[arr.name]);
            }
        }
        return ret.join('');
    };
    Entity.prototype.escape = function (row, field) {
        var d = row[field.name];
        switch (typeof d) {
            default: return d;
            case 'object':
                var tuid = field._tuid;
                if (tuid === undefined)
                    return d.id;
                return tuid.getIdFromObj(d);
            case 'string':
                var len = d.length;
                var r = '', p = 0;
                for (var i = 0; i < len; i++) {
                    var c = d.charCodeAt(i);
                    switch (c) {
                        case 9:
                            r += d.substring(p, i) + '\\t';
                            p = i + 1;
                            break;
                        case 10:
                            r += d.substring(p, i) + '\\n';
                            p = i + 1;
                            break;
                    }
                }
                return r + d.substring(p);
            case 'undefined': return '';
        }
    };
    Entity.prototype.packRow = function (result, fields, data) {
        var len = fields.length;
        if (len === 0)
            return;
        var ret = '';
        ret += this.escape(data, fields[0]);
        for (var i = 1; i < len; i++) {
            var f = fields[i];
            ret += tab + this.escape(data, f);
        }
        result.push(ret + ln);
    };
    Entity.prototype.packArr = function (result, fields, data) {
        if (data !== undefined) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var row = data_1[_i];
                this.packRow(result, fields, row);
            }
        }
        result.push(ln);
    };
    Entity.prototype.unpackSheet = function (data) {
        var ret = {}; //new this.newMain();
        //if (schema === undefined || data === undefined) return;
        var fields = this.fields;
        var p = 0;
        if (fields !== undefined)
            p = this.unpackRow(ret, fields, data, p);
        var arrs = this.arrFields; //schema['arrs'];
        if (arrs !== undefined) {
            for (var _i = 0, arrs_3 = arrs; _i < arrs_3.length; _i++) {
                var arr = arrs_3[_i];
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    };
    Entity.prototype.unpackReturns = function (data) {
        var ret = {};
        //if (schema === undefined || data === undefined) return;
        //let fields = schema.fields;
        var p = 0;
        //if (fields !== undefined) p = unpackRow(ret, schema.fields, data, p);
        var arrs = this.returns; //schema['returns'];
        if (arrs !== undefined) {
            for (var _i = 0, arrs_4 = arrs; _i < arrs_4.length; _i++) {
                var arr = arrs_4[_i];
                //let creater = this.newRet[arr.name];
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    };
    Entity.prototype.unpackRow = function (ret, fields, data, p) {
        var ch0 = 0, ch = 0, c = p, i = 0, len = data.length, fLen = fields.length;
        for (; p < len; p++) {
            ch0 = ch;
            ch = data.charCodeAt(p);
            if (ch === 9) {
                var f = fields[i];
                if (ch0 !== 8) {
                    if (p > c) {
                        var v = data.substring(c, p);
                        ret[f.name] = this.to(ret, v, f);
                    }
                }
                else {
                    ret[f.name] = null;
                }
                c = p + 1;
                ++i;
                if (i >= fLen)
                    break;
            }
            else if (ch === 10) {
                var f = fields[i];
                if (ch0 !== 8) {
                    if (p > c) {
                        var v = data.substring(c, p);
                        ret[f.name] = this.to(ret, v, f);
                    }
                }
                else {
                    ret[f.name] = null;
                }
                ++p;
                ++i;
                break;
            }
        }
        return p;
    };
    Entity.prototype.to = function (ret, v, f) {
        switch (f.type) {
            default: return v;
            case 'datetime':
            case 'date':
            case 'time':
                var date = new Date(Number(v));
                return date;
            case 'tinyint':
            case 'smallint':
            case 'int':
            case 'dec': return Number(v);
            case 'bigint':
                var id = Number(v);
                var _tuid = f._tuid;
                if (_tuid === undefined)
                    return id;
                console.log(this.name, 'bigint', v, 'tuid', _tuid.name);
                _tuid.useId(id, true);
                //let val = _tuid.valueFromId(id);
                //return val.obj || val;
                return _tuid.boxId(id);
            /*
            if (tuidKey !== undefined) {
                let tuid = f._tuid;
                if (tuid === undefined) {
                    // 在jsonStringify中间不会出现
                    Object.defineProperty(f, '_tuid', {value:'_tuid', writable: true});
                    f._tuid = tuid = this.getTuid(tuidKey, tuidUrl);
                }
                tuid.useId(Number(v), true);
            }*/
            //return Number(v);
        }
    };
    Entity.prototype.unpackArr = function (ret, arr, data, p) {
        var vals = [], len = data.length;
        var name = arr.name, fields = arr.fields;
        while (p < len) {
            var ch = data.charCodeAt(p);
            if (ch === 10) {
                ++p;
                break;
            }
            var val = {}; //new creater();
            vals.push(val);
            p = this.unpackRow(val, fields, data, p);
        }
        ret[name] = vals;
        return p;
    };
    return Entity;
}());
export { Entity };
//# sourceMappingURL=entity.js.map