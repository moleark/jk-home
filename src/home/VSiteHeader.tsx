import * as React from 'react';
import { View, nav } from 'tonva-tools';
import { LMR, FA, SearchBox } from 'tonva-react-form';
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
        let right = undefined;
        /*
        <div className="d-flex flex-row mr-1 align-items-center">
            {currentSalesRegion} &nbsp;
            <button onClick={()=>nav.start()}>Try</button>
        </div>;*/
        return <LMR className="align-items-end pb-2 align-items-center" left={left} right={right}>
            <div className="">
                {this.controller.renderSearchHeader('lg')}
            </div>
        </LMR>
        //<div className="h4 px-3 mb-0">百灵威科技</div>
        }
}