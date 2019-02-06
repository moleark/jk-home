import * as React from 'react';
import { productUI } from 'ui/common';
var address = {
    content: function (values) {
        var description = values.description;
        return React.createElement("div", null, description);
    }
};
var contact = {
    content: function (values) {
        return React.createElement("div", null, "gee");
    }
};
export default {
    product: productUI,
    productx: productUI,
    address: address,
    contact: contact,
};
//# sourceMappingURL=index.js.map