import * as React from 'react';
import { View } from 'tonva-tools';
import { CCart } from './CCart';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';

export class VCartLabel extends View<CCart> {

    private showCart = async () => {
        await this.controller.start();
    }

    render(param: any): JSX.Element {
        return <this.content />
    };

    private content = observer(()=>{
        let { cart } = this.controller;
        let count:any = cart.count.get();
        let badge;
        if (count > 0) badge=<u>{count}</u>;
        else if (count > 99) badge =<u>99+</u>;
        return <div className="jk-cart cursor-pointer ml-2 mr-3" onClick={this.showCart}>
            <div>
                {badge}
                <FA className="text-info" name="shopping-cart" size="2x" />
            </div>
        </div>
    });
}