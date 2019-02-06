import * as tslib_1 from "tslib";
import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { ListRow } from './listRow';
var ListView = /** @class */ (function (_super) {
    tslib_1.__extends(ListView, _super);
    function ListView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListView.prototype.render = function () {
        var _this = this;
        var _a = this.props, header = _a.header, items = _a.items, beforeLoad = _a.beforeLoad, none = _a.none, renderRow = _a.renderRow, className = _a.className, footer = _a.footer, itemClick = _a.itemClick, converter = _a.converter;
        var cn = classNames(className, 'va-list');
        var content, elHeader;
        if (items === undefined)
            content = beforeLoad === null ? null : React.createElement("li", { className: 'empty' }, beforeLoad || '...');
        else if (items.length === 0) {
            content = (React.createElement("li", { className: 'empty' }, none || '[none]'));
        }
        else if (renderRow !== undefined) {
            content = items.map(function (item, index) { return renderRow(item, index, _this.props.ex); });
        }
        else {
            content = items.map(function (item, index) {
                var onClick = item.onClick;
                if (onClick === undefined && itemClick !== undefined)
                    onClick = function () { return itemClick(item); };
                var listItem;
                if (converter !== undefined) {
                    listItem = converter(item);
                    if (listItem === undefined)
                        return null;
                }
                else {
                    listItem = tslib_1.__assign({}, item);
                }
                if (listItem.key === undefined)
                    listItem.key = listItem.main;
                return React.createElement(ListRow, tslib_1.__assign({ onClick: onClick }, listItem));
            });
        }
        if (header !== undefined) {
            if (typeof header === 'string') {
                elHeader = React.createElement("div", { className: 'va-list-header' }, header);
            }
            else {
                elHeader = header;
            }
        }
        return (React.createElement("div", { className: cn },
            elHeader,
            React.createElement("ul", null, content),
            footer));
    };
    ListView = tslib_1.__decorate([
        observer
    ], ListView);
    return ListView;
}(React.Component));
export { ListView };
//# sourceMappingURL=listView.js.map