import * as React from 'react';

import { CApp, CUsq, startApp } from 'tonva-react-usql';
import { CCart } from 'cart/CCart';
import { CProduct } from 'product';
import { COrder } from 'order/COrder';
import { CHome } from './CHome';
import { CProductCategory } from 'productCategory/CProductCategory';
import { CUser } from 'customer/CPerson';
import { CMember } from 'member/CMember';
import { consts } from './consts';

export class CCartApp extends CApp {

    cUsqCart: CUsq;
    cUsqOrder: CUsq;
    cUsqProduct: CUsq;
    cUsqCommon: CUsq;
    cUsqCustomer: CUsq;
    cUsqCustomerDiscount: CUsq;
    cUsqWarehouse: CUsq;
    cUsqMember: CUsq;

    cHome: CHome;
    cCart: CCart;
    cProduct: CProduct;
    cOrder: COrder;
    cUser: CUser;
    cProductCategory: CProductCategory;
    cMember: CMember;

    protected async internalStart() {

        this.cUsqCart = this.getCUsq(consts.usqOrder);
        this.cUsqOrder = this.getCUsq(consts.usqOrder);
        this.cUsqProduct = this.getCUsq(consts.usqProduct);
        this.cUsqCommon = this.getCUsq(consts.usqCommon);
        this.cUsqCustomer = this.getCUsq(consts.usqCustomer);
        this.cUsqCustomerDiscount = this.getCUsq(consts.usqCustomerDiscount);
        this.cUsqWarehouse = this.getCUsq(consts.usqWarehouse);
        this.cUsqMember = this.getCUsq(consts.usqMember);

        this.cProductCategory = new CProductCategory(this, undefined);
        this.cCart = new CCart(this, undefined);
        this.cHome = new CHome(this, undefined);
        this.cProduct = new CProduct(this, undefined);
        this.cOrder = new COrder(this, undefined);
        this.cUser = new CUser(this, undefined);
        this.cMember = new CMember(this, undefined);

        // this.clearPrevPages();
        // await this.cHome.start();
        // this.showVPage(VHome);
        await this.cCart.load();
        cCartApp = this;
    }
}

export var cCartApp: CCartApp;