import * as React from 'react';
var iconStyle = function (color) {
    return {
        color: color || '#7f7fff',
        margin: '6px 0'
    };
};
export var rowIcon = function (name, color) {
    return React.createElement("i", { style: iconStyle(color), className: 'fa fa-lg fa-' + name });
};
//# sourceMappingURL=rowIcon.js.map