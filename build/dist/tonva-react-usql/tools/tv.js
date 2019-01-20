import * as React from 'react';
import { observer } from 'mobx-react';
import { PureJSONContent } from '../controllers';
function boxIdContent(bi, ui, x) {
    if (typeof bi === 'number')
        return React.createElement(React.Fragment, null, bi);
    var _a = bi, id = _a.id, _$tuid = _a._$tuid, _$com = _a._$com;
    var t = _$tuid;
    if (t === undefined) {
        if (ui !== undefined)
            return ui(bi, x);
        return PureJSONContent(bi, x);
    }
    var com = ui || _$com;
    if (com === undefined) {
        com = bi._$com = t.getTuidContent();
    }
    var val = t.valueFromId(id);
    if (typeof val === 'number')
        val = { id: val };
    if (ui !== undefined) {
        var ret = ui(val, x);
        if (ret !== undefined)
            return ret;
        return React.createElement(React.Fragment, null, id);
    }
    return React.createElement(com, val);
}
var Tv = observer(function (_a) {
    var tuidValue = _a.tuidValue, ui = _a.ui, x = _a.x, nullUI = _a.nullUI;
    var ttv = typeof tuidValue;
    switch (ttv) {
        default:
            if (ui === undefined)
                return React.createElement(React.Fragment, null,
                    ttv,
                    "-",
                    tuidValue);
            else {
                var ret = ui(tuidValue, x);
                if (ret !== undefined)
                    return ret;
                return React.createElement(React.Fragment, null, tuidValue);
            }
        case 'undefined':
            break;
        case 'object':
            if (tuidValue !== null)
                return boxIdContent(tuidValue, ui, x);
            break;
        case 'number':
            return React.createElement(React.Fragment, null,
                "id...",
                tuidValue);
    }
    if (nullUI === undefined)
        return React.createElement(React.Fragment, null, "null");
    return nullUI();
});
export var tv = function (tuidValue, ui, x, nullUI) {
    return React.createElement(Tv, { tuidValue: tuidValue, ui: ui, x: x, nullUI: nullUI });
};
//# sourceMappingURL=tv.js.map