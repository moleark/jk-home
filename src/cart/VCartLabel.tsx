import * as React from 'react';
import { View } from 'tonva-tools';
import { CCart } from './CCart';

export class VCartLabel extends View<CCart> {

    render(param: any): JSX.Element {
        return <div>
            <button className="btn btn-info" onClick={this.controller.navigateToCart}>
                Cart: <span className="badge badge-light">{this.controller.count}</span>
            </button>
        </div>
    };
}