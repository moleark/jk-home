import * as React from 'react';

import { CApp, CUsq } from 'tonva-react-usql';
import { CCart } from 'cart/CCart';
import { CProduct } from 'product';
import { VHome } from './VHome';
import { COrder } from 'order/COrder';

const usqCartName = '百灵威系统工程部/cart';

export class CCartApp extends CApp {

    cUsq: CUsq;
    cCart: CCart;
    cProduct: CProduct
    cOrder: COrder

    protected async internalStart() {
        this.clearPrevPages();
        this.cUsq = this.getCUsq(usqCartName);
        this.cCart = new CCart(this, this.cUsq, undefined);
        this.cProduct = new CProduct(this, this.cUsq, undefined);
        this.cOrder = new COrder(this, this.cUsq, undefined);
        this.showVPage(VHome);
        await  this.cCart.load();
    }
}
