import * as React from 'react';
import { View } from 'tonva-tools';
import { LMR, FA } from 'tonva-react-form';
import logo from '../images/logo.png';
import { CHome } from './CHome';

export class VSiteHeader extends View<CHome> {

    render() {
        let currentSalesRegion = <FA name="globe" />
        let login = <div>
            登录
        </div>
        let left = <img className="m-1" src={logo} alt="logo" />;
        //let cart = this.controller.cApp.cCart.renderCartLabel();
        let right = <div className="d-flex flex-row mr-1 align-items-center">{currentSalesRegion} &nbsp;</div>;
        return <LMR className="align-items-end pb-1" left={left} right={right}>
            <div className="h4 px-3 mb-0">百灵威科技</div>
        </LMR>
    }
}