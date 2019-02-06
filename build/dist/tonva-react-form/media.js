import * as tslib_1 from "tslib";
import * as React from 'react';
import * as className from 'classnames';
var imgStyle = {
    width: '4rem',
    height: '4rem',
};
var Media = /** @class */ (function (_super) {
    tslib_1.__extends(Media, _super);
    function Media() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Media.prototype.render = function () {
        var _a = this.props, icon = _a.icon, main = _a.main, discription = _a.discription, px = _a.px, py = _a.py;
        var disp;
        if (typeof discription === 'string')
            disp = React.createElement("div", null, discription);
        else
            disp = discription;
        var img = icon;
        if (typeof icon === 'string')
            img = React.createElement("img", { className: "d-flex mr-3", src: icon, alt: "img", style: imgStyle });
        var cn = className('media', px === undefined ? 'px-0' : 'px-' + px, py === undefined ? 'py-2' : 'py-' + py);
        return React.createElement("div", { className: cn },
            img,
            React.createElement("div", { className: "media-body" },
                React.createElement("h5", { className: "mt-0" }, main),
                disp));
    };
    return Media;
}(React.Component));
export { Media };
//# sourceMappingURL=media.js.map