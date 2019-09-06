//import * as React from 'react';
import { User, nav } from 'tonva';
import { CApp, CUq } from 'tonva';
import { CCart } from 'cart/CCart';
import { CProduct } from 'product';
import { COrder } from 'order/COrder';
import { CHome } from './home/CHome';
import { CProductCategory } from 'productCategory/CProductCategory';
//import { CSelectContact } from 'customer/CSelectContact';
import { CMember } from 'member/CMember';
import { WebUser } from 'CurrentUser';
import { consts } from './home/consts';
import { CMe } from 'me/CMe';
import { Cart } from 'cart/Cart';
import { GLOABLE } from 'ui';

export class CCartApp extends CApp {
    cart: Cart;
    topKey: any;

    currentSalesRegion: any;
    currentLanguage: any;
    currentUser: WebUser;

    cUqOrder: CUq;
    cUqProduct: CUq;
    cUqCommon: CUq;
    cUqWebUser: CUq;
    cUqCustomer: CUq;
    cUqCustomerDiscount: CUq;
    cUqPromotion: CUq;
    cUqWarehouse: CUq;
    cUqSalesTask: CUq;
    cUqMember: CUq;

    cHome: CHome;
    cCart: CCart;
    cProduct: CProduct;
    cOrder: COrder;
    //cSelectContact: CSelectContact;
    cProductCategory: CProductCategory;
    cMember: CMember;
    cMe: CMe;

    protected async internalStart() {
        this.cUqOrder = this.getCUq(consts.uqOrder);
        this.cUqProduct = this.getCUq(consts.uqProduct);
        this.cUqCommon = this.getCUq(consts.uqCommon);
        this.cUqWebUser = this.getCUq(consts.uqWebUser);
        this.cUqCustomer = this.getCUq(consts.uqCustomer);
        this.cUqCustomerDiscount = this.getCUq(consts.uqCustomerDiscount);
        this.cUqPromotion = this.getCUq(consts.uqPromotion);
        this.cUqWarehouse = this.getCUq(consts.uqWarehouse);
        this.cUqSalesTask = this.getCUq(consts.uqSalesTask);
        this.cUqMember = this.getCUq(consts.uqMember);

        let salesRegionTuid = this.cUqCommon.tuid('salesregion');
        this.currentSalesRegion = await salesRegionTuid.load(GLOABLE.SALESREGION_CN);

        let languageTuid = this.cUqCommon.tuid('language');
        this.currentLanguage = await languageTuid.load(GLOABLE.CHINESE);

        this.currentUser = new WebUser(this.cUqWebUser, this.cUqCustomer);
        if (this.isLogined) {
            this.currentUser.setUser(this.user);
        }

        this.cart = new Cart(this);
        await this.cart.init();

        this.cProductCategory = new CProductCategory(this, undefined);
        this.cCart = new CCart(this, undefined);
        this.cHome = new CHome(this, undefined);
        this.cProduct = new CProduct(this, undefined);
        this.cOrder = new COrder(this, undefined);
        //this.cSelectContact = new CSelectContact(this, undefined);
        this.cMember = new CMember(this, undefined);
        this.cMe = new CMe(this, undefined);

        let promises: PromiseLike<void>[] = [];
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);
        this.showMain();
        this.topKey = nav.topKey();
    }

    showMain(initTabName?: string) {
        this.openVPage(this.VAppMain, initTabName);
    }

    async loginCallBack(user: User) {
        /*
        if (this.cartService.isLocal) {
            let cartLocal = { ...this.cartViewModel } as CartViewModel;
            // this.cartService.clear(this.cartViewModel);
            this.cartService = CartServiceFactory.getCartService(this);
            this.cartViewModel = await this.cartService.load();
            // this.cartViewModel = await this.cartService.merge(cartLocal);
        }
        */
    }

    protected onDispose() {
        this.cart.dispose();
    }
}
