import * as React from 'react';

import { CApp, CUq } from 'tonva-react-uq';
import { CCart } from 'cart/CCart';
import { CProduct } from 'product';
import { COrder } from 'order/COrder';
import { CHome } from './home/CHome';
import { CProductCategory } from 'productCategory/CProductCategory';
import { CUser } from 'customer/CPerson';
import { CMember } from 'member/CMember';
import { WebUser } from 'CurrentUser';
import { consts } from './home/consts';
import { Cart } from './cart/Cart';

export class CCartApp extends CApp {
    cart: Cart;

    currentSalesRegion: any;
    currentLanguage: any;
    currentUser: WebUser;

    cUsqOrder: CUq;
    cUsqProduct: CUq;
    cUsqCommon: CUq;
    cUsqWebUser: CUq;
    cUsqCustomer: CUq;
    cUsqCustomerDiscount: CUq;
    cUsqWarehouse: CUq;
    cUsqMember: CUq;

    cHome: CHome;
    cCart: CCart;
    cProduct: CProduct;
    cOrder: COrder;
    cUser: CUser;
    cProductCategory: CProductCategory;
    cMember: CMember;

    protected async internalStart() {
        this.cUsqOrder = this.getCUq(consts.usqOrder);
        this.cUsqProduct = this.getCUq(consts.usqProduct);
        this.cUsqCommon = this.getCUq(consts.usqCommon);
        this.cUsqWebUser = this.getCUq(consts.usqWebUser);
        this.cUsqCustomer = this.getCUq(consts.usqCustomer);
        this.cUsqCustomerDiscount = this.getCUq(consts.usqCustomerDiscount);
        this.cUsqWarehouse = this.getCUq(consts.usqWarehouse);
        this.cUsqMember = this.getCUq(consts.usqMember);

        let salesRegionTuid = this.cUsqCommon.tuid('salesregion');
        this.currentSalesRegion = await salesRegionTuid.load(1);

        let languageTuid = this.cUsqCommon.tuid('language');
        this.currentLanguage = await languageTuid.load(197);

        this.currentUser = new WebUser(this.cUsqWebUser, this.cUsqCustomer);
        if (this.isLogined)
            this.currentUser.user = this.user;

        this.cart = new Cart(this);

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
        let promises: PromiseLike<void>[] = [];
        promises.push(this.cart.load());
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);
        this.showMain();
    }

    showMain(initTabName?: string){
        this.showVPage(this.VAppMain, initTabName);
    }

    protected onDispose() {
        this.cart.dispose();
    }
}
