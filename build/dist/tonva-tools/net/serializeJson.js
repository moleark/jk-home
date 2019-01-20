export function serializeJson(obj) {
    var source = [];
    var result = [];
    function serialize(obj) {
        var p = source.findIndex(function (v) { return v === obj; });
        if (p <= 0) {
            p = result.length;
            source.push(obj);
            if (Array.isArray(obj) === true) {
                var retObj = [];
                result.push(retObj);
                serializeArr(obj, retObj);
            }
            else {
                var retObj = {};
                result.push(retObj);
                serializeObj(obj, retObj);
            }
        }
        return '___' + p;
    }
    function serializeArr(obj, retObj) {
        var len = obj.length;
        for (var i = 0; i < len; i++) {
            retObj[i] = serial(obj[i]);
        }
    }
    function serializeObj(obj, retObj) {
        for (var i in obj) {
            //if (i === '_tuid') continue;
            //if (i === 'waitingIds') debugger;
            retObj[i] = serial(obj[i]);
        }
    }
    function serial(obj) {
        switch (typeof obj) {
            default: return obj;
            case 'object': return serialize(obj);
            case 'function': break;
        }
    }
    serialize(obj);
    try {
        var ret = JSON.stringify(result);
        return ret;
    }
    catch (err) {
        debugger;
    }
}
export function deserializeJson(str) {
    var arr = JSON.parse(str);
    var obj = arr[0];
    deserialize(obj);
    return obj;
    function deserialize(obj) {
        if (Array.isArray(obj) === true) {
            deserializeArr(obj);
        }
        else {
            deserializeObj(obj);
        }
    }
    function deserializeArr(obj) {
        var len = obj.length;
        for (var i = 0; i < len; i++) {
            obj[i] = deserial(obj[i]);
        }
    }
    function deserializeObj(obj) {
        for (var i in obj) {
            obj[i] = deserial(obj[i]);
        }
    }
    function deserial(obj) {
        if (typeof obj === 'string') {
            if (obj.startsWith('___') === true) {
                var p = Number(obj.substr(3));
                var ret = arr[p];
                deserialize(ret);
                return ret;
            }
        }
        return obj;
    }
}
//# sourceMappingURL=serializeJson.js.map