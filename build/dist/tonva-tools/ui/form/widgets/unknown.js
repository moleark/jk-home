import * as React from 'react';
export var Unknown = function (dataType, uiType, dataTypes) {
    return React.createElement("span", { className: "text-danger" },
        "!!data type ",
        dataType,
        " only support ",
        (dataTypes || []).join(', '),
        ", can't use ui ",
        uiType,
        "!!");
};
//# sourceMappingURL=unknown.js.map