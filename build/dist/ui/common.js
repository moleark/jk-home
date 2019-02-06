import * as React from 'react';
export var productUI = {
    content: function (values) {
        var product = values;
        var left = React.createElement("div", null, "image");
        return React.createElement("div", { className: "row d-flex" },
            React.createElement("div", { className: "col-12" },
                React.createElement("div", { className: "row py-2" },
                    React.createElement("div", { className: "col-12" },
                        React.createElement("strong", null, product.description))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-3" },
                        React.createElement("img", { src: "favicon.ico", alt: "structure" })),
                    React.createElement("div", { className: "col-9" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-4 col-md-2 text-muted" }, "\u4EA7\u54C1\u7F16\u53F7:"),
                            React.createElement("div", { className: "col-8 col-md-4" }, product.origin))))));
    },
    divs: {
        packx: {
            content: function (values) {
                var radiox = values.radiox, radioy = values.radioy, unit = values.unit;
                if (radioy === 0)
                    return React.createElement(React.Fragment, null,
                        radiox,
                        " ",
                        unit);
                if (radiox !== 1)
                    return React.createElement(React.Fragment, null,
                        radiox,
                        " &#2df; ",
                        radiox,
                        unit);
                return React.createElement(React.Fragment, null,
                    radioy,
                    unit);
            }
        }
    }
};
//# sourceMappingURL=common.js.map