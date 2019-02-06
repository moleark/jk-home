import * as tslib_1 from "tslib";
import * as React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Page } from '../page';
import { ValidForm1 } from './validForm';
var FormPage1 = /** @class */ (function (_super) {
    tslib_1.__extends(FormPage1, _super);
    function FormPage1(props) {
        var _this = _super.call(this, props) || this;
        _this.toggle = _this.toggle.bind(_this);
        _this.state = {
            dropdownOpen: false
        };
        return _this;
    }
    FormPage1.prototype.toggle = function () {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };
    FormPage1.prototype.renderMenu = function (menuItems) {
        if (menuItems === undefined)
            return null;
        return React.createElement(ButtonDropdown, { isOpen: this.state.dropdownOpen, toggle: this.toggle },
            React.createElement(DropdownToggle, { caret: true, size: 'sm' }, "+"),
            React.createElement(DropdownMenu, { right: true }, menuItems.map(function (v, index) {
                return React.createElement(DropdownItem, { key: index, onClick: v.action }, v.caption);
            })));
    };
    FormPage1.prototype.render = function () {
        var _a = this.props, back = _a.back, header = _a.header, rightMenu = _a.rightMenu, footer = _a.footer, formSchema = _a.formSchema, children = _a.children;
        return React.createElement(Page, { header: header, back: back, right: this.renderMenu(rightMenu), footer: footer },
            React.createElement(ValidForm1, { formSchema: formSchema, children: children }));
    };
    return FormPage1;
}(React.Component));
export { FormPage1 };
//# sourceMappingURL=formPage.js.map