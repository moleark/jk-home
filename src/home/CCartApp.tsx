import * as React from 'react';

import { CApp, CUsq, startApp } from 'tonva-react-usql';
import { CCart } from 'cart/CCart';
import { CProduct } from 'product';
import { VHome } from './VHome';
import { COrder } from 'order/COrder';
import { CHome } from './CHome';
import { CProductCategory } from 'productCategory/CProductCategory';
import { CPerson } from 'customer/CPerson';
import { consts } from './consts';
import ui from 'ui';


export class CCartApp extends CApp {

    cUsqCart: CUsq;
    cUsqOrder: CUsq;
    cUsqProduct: CUsq;
    cUsqCommon: CUsq;
    cUsqCustomer: CUsq;
    cUsqCustomerDiscount: CUsq;

    cHome: CHome;
    cCart: CCart;
    cProduct: CProduct;
    cOrder: COrder;
    cPerson: CPerson;
    cProductCategory: CProductCategory;

    protected async internalStart() {

        this.cUsqCart = this.getCUsq(consts.usqOrder);
        this.cUsqOrder = this.getCUsq(consts.usqOrder);
        this.cUsqProduct = this.getCUsq(consts.usqProduct);
        this.cUsqCommon = this.getCUsq(consts.usqCommon);
        this.cUsqCustomer = this.getCUsq(consts.usqCustomer);
        this.cUsqCustomerDiscount = this.getCUsq(consts.usqCustomerDiscount);

        this.cProductCategory = new CProductCategory(this, undefined);
        this.cCart = new CCart(this, undefined);
        this.cHome = new CHome(this, undefined);
        this.cProduct = new CProduct(this, undefined);
        this.cOrder = new COrder(this, undefined);
        this.cPerson = new CPerson(this, undefined);

        this.clearPrevPages();
        await this.cHome.start();
        this.showVPage(VHome);
        await this.cCart.load();
    }

    openMetaView = () => {
        this.startDebug();
    }
}