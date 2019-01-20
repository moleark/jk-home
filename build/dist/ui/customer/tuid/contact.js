import * as React from 'react';
export var contactUI = {
    content: function (values) {
        var name = values.name, mobile = values.mobile, addressString = values.addressString;
        return React.createElement("div", null,
            React.createElement("b", null, name),
            "\u00A0 ",
            mobile,
            React.createElement("br", null),
            addressString);
    }
};
//# sourceMappingURL=contact.js.map