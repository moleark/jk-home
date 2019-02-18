import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
var DropdownActions = /** @class */ (function (_super) {
    tslib_1.__extends(DropdownActions, _super);
    function DropdownActions(props) {
        var _this = _super.call(this, props) || this;
        _this.handleDocumentClick = function (evt) {
            if (_this.state.dropdownOpen === false)
                return;
            if (_this.button && _this.button.contains(evt.target))
                return;
            if (!_this.menu)
                return;
            //if (!this.menu.contains(evt.target)) 
            _this.toggle();
        };
        _this.toggle = function () {
            _this.setState({
                dropdownOpen: !_this.state.dropdownOpen
            });
        };
        _this.state = {
            dropdownOpen: false
        };
        return _this;
    }
    DropdownActions.prototype.componentWillMount = function () {
        document.addEventListener('click', this.handleDocumentClick);
        document.addEventListener('touchstart', this.handleDocumentClick);
    };
    DropdownActions.prototype.componentWillUnmount = function () {
        document.removeEventListener('click', this.handleDocumentClick);
        document.removeEventListener('touchstart', this.handleDocumentClick);
    };
    DropdownActions.prototype.render = function () {
        var _this = this;
        var _a = this.props, icon = _a.icon, actions = _a.actions, isRight = _a.isRight;
        if (isRight === undefined)
            isRight = true;
        var hasIcon = actions.some(function (v) { return v.icon !== undefined; });
        var dropdownOpen = this.state.dropdownOpen;
        //isOpen={this.state.dropdownOpen} toggle={this.toggle}
        return React.createElement("div", { className: "dropdown" },
            React.createElement("button", { ref: function (v) { return _this.button = v; }, className: "cursor-pointer dropdown-toggle btn btn-sm", "data-toggle": "dropdown", "aria-expanded": dropdownOpen, onClick: this.toggle },
                React.createElement("i", { className: classNames('fa', 'fa-' + (icon || 'ellipsis-v')) })),
            React.createElement("div", { ref: function (v) { return _this.menu = v; }, className: classNames({ "dropdown-menu": true, "dropdown-menu-right": isRight, "show": dropdownOpen }) }, actions.map(function (v, index) {
                var icon = v.icon, caption = v.caption, action = v.action;
                if (icon === undefined && caption === undefined)
                    return React.createElement("div", { className: "dropdown-divider" });
                var i;
                if (hasIcon === true) {
                    if (icon !== undefined)
                        icon = 'fa-' + icon;
                    i = React.createElement(React.Fragment, null,
                        React.createElement("i", { className: classNames('fa', icon, 'fa-fw'), "aria-hidden": true }),
                        "\u00A0 ");
                }
                if (action === undefined)
                    return React.createElement("h6", { className: "dropdown-header" },
                        i,
                        " ",
                        caption);
                return React.createElement("a", { className: "dropdown-item", key: index, href: "#", onClick: function (evt) { evt.preventDefault(); action(); } },
                    i,
                    " ",
                    caption);
            })));
    };
    return DropdownActions;
}(React.Component));
export { DropdownActions };
/*
export class DropdownActions extends React.Component<DropdownActionsProps, DropdownActionsState> {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }
    private toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    render() {
        let {icon, actions, isRight} = this.props;
        if (isRight === undefined) isRight = true;
        let hasIcon = actions.some(v => v.icon!==undefined);
        return <UncontrolledButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret={true} size="sm" className="cursor-pointer">
                <i className={classNames('fa', 'fa-'+(icon||'ellipsis-v'))} />
            </DropdownToggle>
            <DropdownMenu right={isRight}>
                {actions.map((v,index) => {
                    let {icon, caption, action} = v;
                    if (icon === undefined && caption === undefined)
                        return <div className="dropdown-divider" />;
                    let i;
                    if (hasIcon === true) {
                        if (icon !== undefined) icon = 'fa-' + icon;
                        i = <><i className={classNames('fa', icon, 'fa-fw')} aria-hidden={true}></i>&nbsp; </>;
                    }
                    if (action === undefined)
                        return <h6 className="dropdown-header">{i} {caption}</h6>;
                    return <DropdownItem key={index} onClick={action}>{i} {caption}</DropdownItem>
                })}
            </DropdownMenu>
        </UncontrolledButtonDropdown>
    }
}
*/ 
//# sourceMappingURL=index.js.map