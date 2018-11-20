import * as React from 'react';

import { CApp, CUsq } from 'tonva-react-usql';
import { CCart } from 'cart/CCart';
import { CProduct } from 'product';
import { VHome } from './VHome';

const usqCartName = '百灵威系统工程部/cart';

export class CCartApp extends CApp {

    cUsq: CUsq;
    cCart: CCart;
    cProduct: CProduct

    protected async internalStart() {

        this.cUsq = this.getCUsq(usqCartName);
        this.cCart = new CCart(this, this.cUsq, undefined);
        await  this.cCart.start();
        this.cProduct = new CProduct(this, this.cUsq, undefined);
        this.showVPage(VHome);
    }
}
