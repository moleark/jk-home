import * as tslib_1 from "tslib";
import * as React from 'react';
import { CApp } from './controllers';
export * from './entities';
export * from './controllers';
export * from './centerApi';
export * from './tools';
function convertUIKeyToLowercase(obj) {
    for (var i in obj) {
        var v = obj[i];
        obj[i.toLowerCase()] = v;
        if (typeof v !== 'object')
            continue;
        if (React.isValidElement(v))
            continue;
        if (Array.isArray(v) !== true) {
            convertUIKeyToLowercase(v);
            continue;
        }
        for (var _i = 0, _a = v; _i < _a.length; _i++) {
            var i_1 = _a[_i];
            convertUIKeyToLowercase(i_1);
        }
    }
}
// const appName = 'JKDev/jkOrder';
export function startApp(appName, ui) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cApp;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    convertUIKeyToLowercase(ui);
                    cApp = new (ui && ui.CApp || CApp)(appName, ui || { usqs: {} });
                    return [4 /*yield*/, cApp.start()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map