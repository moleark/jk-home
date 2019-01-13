import * as React from 'react';

import { CApp, CUsq } from 'tonva-react-usql';
import { CCart } from 'cart/CCart';
import { CProduct } from 'product';
import { COrder } from 'order/COrder';
import { CHome } from './home/CHome';
import { CProductCategory } from 'productCategory/CProductCategory';
import { CUser } from 'customer/CPerson';
import { CMember } from 'member/CMember';
import { consts } from './home/consts';

export class CCartApp extends CApp {

    salesRegion: any;

    cUsqOrder: CUsq;
    cUsqProduct: CUsq;
    cUsqCommon: CUsq;
    cUsqWebUser: CUsq;
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

        this.cUsqOrder = this.getCUsq(consts.usqOrder);
        this.cUsqProduct = this.getCUsq(consts.usqProduct);
        this.cUsqCommon = this.getCUsq(consts.usqCommon);
        this.cUsqWebUser = this.getCUsq(consts.usqWebUser);
        this.cUsqCustomer = this.getCUsq(consts.usqCustomer);
        this.cUsqCustomerDiscount = this.getCUsq(consts.usqCustomerDiscount);
        this.cUsqWarehouse = this.getCUsq(consts.usqWarehouse);
        this.cUsqMember = this.getCUsq(consts.usqMember);

        //cCartApp = this;
        this.cProductCategory = new CProductCategory(this, undefined);
        this.cCart = new CCart(this, undefined);
        this.cHome = new CHome(this, undefined);
        this.cProduct = new CProduct(this, undefined);
        this.cOrder = new COrder(this, undefined);
        this.cUser = new CUser(this, undefined);
        this.cMember = new CMember(this, undefined);

        let salesRegionTuid = this.cUsqCommon.tuid('salesregion');
        /*
        let sr: any = await salesRegionTuid.load(1);
        this.salesRegion = new SalesRegion(sr.id, sr.name, sr.currency);
        */
        this.salesRegion = await salesRegionTuid.load(1);

        if (this.isLogined) {

        }
        // this.clearPrevPages();
        // await this.cHome.start();
        // this.showVPage(VHome);
        await this.cCart.cart.load();
        this.showVPage(this.VAppMain);
    }
}

// export var cCartApp: CCartApp;