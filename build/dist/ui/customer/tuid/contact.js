import * as React from 'react';
export var contactUI = {
    content: function (values) {
        var name = values.name, mobile = values.mobile, organizationName = values.organizationName, addressString = values.addressString;
        return React.createElement("div", { className: "flex-grow-1" },
            React.createElement("b", null, name),
            "\u00A0 ",
            mobile,
            " \u00A0 ",
            organizationName,
            React.createElement("br", null),
            addressString);
    }
};
//# sourceMappingURL=contact.js.map