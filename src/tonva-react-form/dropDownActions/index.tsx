import * as React from 'react';
import * as classNames from 'classnames';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Row, Col, Button, Dropdown, UncontrolledDropdown, UncontrolledButtonDropdown} from 'reactstrap';

export interface Action {
    icon?: string;
    caption?: string;
    action?: () => void;
}

export interface DropdownActionsProps {
    icon?: string;
    actions: Action[];
    isRight?: boolean;
}

export interface DropdownActionsState {
    dropdownOpen: boolean;
}

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
