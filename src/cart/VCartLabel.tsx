import * as React from 'react';
import { View } from 'tonva-tools';
import { CCart } from './CCart';
import { observer } from 'mobx-react';

export class VCartLabel extends View<CCart> {
    private showCart = async () => {
        await this.controller.start();
    }

    render(param: any): JSX.Element {
        return <this.content />
    };

    private content = observer(()=>{
        return <div>
            <button className="btn btn-info btn-sm" onClick={this.showCart}>
                Cart: <span className="badge badge-light">{this.controller.cart.count.get()}</span>
            </button>
        </div>
    });
}