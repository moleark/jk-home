import * as React from 'react';
import { View } from 'tonva-tools';
import { LMR, FA } from 'tonva-react-form';
import logo from '../images/logo.gif';
import { CHome } from './CHome';

export class VSiteHeader extends View<CHome> {

    render() {
        let currentSalesRegion = <FA name="globe" />
        let login = <div>
            登录
        </div>
        let cart = this.controller.cApp.cCart.renderCartLabel();
        let right = <div className="d-flex flex-row mr-3 mt-3 align-items-center">{currentSalesRegion} &nbsp; {cart} &nbsp; {login}</div>;
        return <div className="bg-white pl-3 pt-1 pb-2">
            <LMR left={<img src={logo} alt="logo" />} right={right} />
        </div>
    }
}