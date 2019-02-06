import * as tslib_1 from "tslib";
import * as React from 'react';
var EasyDate = /** @class */ (function (_super) {
    tslib_1.__extends(EasyDate, _super);
    function EasyDate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EasyDate.prototype.render = function () {
        var date = this.props.date;
        if (!date)
            return null;
        var d = (typeof date === 'string') ? new Date(Date.parse(date)) : date;
        var now = new Date();
        var tick = now.getTime() - d.getTime();
        var nDate = now.getDate();
        var _date = d.getDate(), hour = d.getHours(), minute = d.getMinutes(), month = d.getMonth() + 1;
        var hm = hour + ((minute < 10 ? ':0' : ':') + minute);
        if (tick < -24 * 3600 * 1000)
            return d.getFullYear() + '年' + month + '月' + _date + '日 ' + hm;
        if (tick < 24 * 3600 * 1000) {
            return _date !== nDate ?
                (tick < 0 ? '明天 ' : '昨天 ') + hm
                : hm;
        }
        if (tick < 365 * 24 * 3600 * 1000) {
            return month + '月' + _date + '日 ';
        }
        return d.getFullYear() + '年' + month + '月' + _date + '日';
    };
    return EasyDate;
}(React.Component));
export { EasyDate };
//# sourceMappingURL=index.js.map