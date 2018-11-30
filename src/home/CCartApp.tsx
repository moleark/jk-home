import * as React from 'react';

import { CApp, CUsq } from 'tonva-react-usql';
import { CCart } from 'cart/CCart';
import { CProduct } from 'product';
import { VHome } from './VHome';
import { COrder } from 'order/COrder';
import { CHome } from './CHome';
import { CProductCategory } from 'productCategory/CProductCategory';
import { CPerson } from 'customer/CPerson';

const usqCartName = '百灵威系统工程部/cart';

export class CCartApp extends CApp {

    cUsq: CUsq;
    cHome: CHome;
    cCart: CCart;
    cProduct: CProduct;
    cOrder: COrder;
    cPerson: CPerson;
    cProductCategory: CProductCategory;

    protected async internalStart() {

        this.clearPrevPages();
        this.cUsq = this.getCUsq(usqCartName);
        this.cProductCategory = new CProductCategory(this, this.cUsq, undefined);
        this.cCart = new CCart(this, this.cUsq, undefined);
        this.cHome = new CHome(this, this.cUsq, undefined);
        this.cProduct = new CProduct(this, this.cUsq, undefined);
        this.cOrder = new COrder(this, this.cUsq, undefined);
        this.cPerson = new CPerson(this, this.cUsq, undefined);

        await this.cHome.start();
        this.showVPage(VHome);
        await this.cCart.load();
    }
}
