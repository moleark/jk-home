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
<<<<<<< HEAD
import { Cart } from './cart/Cart';
import { VPage, Page, nav } from 'tonva-tools';
=======
import { CartViewModel, CartService, CartRemoteService, CartLocalService, CartServiceFactory } from 'cart/Cart2';
import { User, nav } from 'tonva-tools';
>>>>>>> 4cf2bc45588dfa0a64ab0f6b14b95e2684016c42

export class CCartApp extends CApp {
    cartService: CartService;
    cartViewModel: CartViewModel;
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
    cUqWarehouse: CUq;
    cUqMember: CUq;

    cHome: CHome;
    cCart: CCart;
    cProduct: CProduct;
    cOrder: COrder;
    cUser: CUser;
    cProductCategory: CProductCategory;
    cMember: CMember;

    protected async internalStart() {
        /*
        this.cUqOrder = this.getCUq(consts.uqOrder);
        this.cUqProduct = this.getCUq(consts.uqProduct);
        this.cUqCommon = this.getCUq(consts.uqCommon);
        this.cUqWebUser = this.getCUq(consts.uqWebUser);
        this.cUqCustomer = this.getCUq(consts.uqCustomer);
        this.cUqCustomerDiscount = this.getCUq(consts.uqCustomerDiscount);
        this.cUqWarehouse = this.getCUq(consts.uqWarehouse);
        this.cUqMember = this.getCUq(consts.uqMember);

        let salesRegionTuid = this.cUqCommon.tuid('salesregion');
        this.currentSalesRegion = await salesRegionTuid.load(1);

        let languageTuid = this.cUqCommon.tuid('language');
        this.currentLanguage = await languageTuid.load(197);

        this.currentUser = new WebUser(this.cUqWebUser, this.cUqCustomer);
        if (this.isLogined) {
            this.currentUser.setUser(this.user);
        }

        this.cartService = CartServiceFactory.getCartService(this);
        this.cartViewModel = await this.cartService.load();

        this.cProductCategory = new CProductCategory(this, undefined);
        this.cCart = new CCart(this, undefined);
        this.cHome = new CHome(this, undefined);
        this.cProduct = new CProduct(this, undefined);
        this.cOrder = new COrder(this, undefined);
        this.cUser = new CUser(this, undefined);
        this.cMember = new CMember(this, undefined);

        let promises: PromiseLike<void>[] = [];
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);
        */
        this.showMain();
        this.topKey = nav.topKey();
    }

<<<<<<< HEAD
    showMain(initTabName?: string){
        //this.openVPage(this.VAppMain, initTabName);
        this.clearPrevPages();
        this.openVPage(VMain);
=======
    showMain(initTabName?: string) {
        this.openVPage(this.VAppMain, initTabName);
>>>>>>> 4cf2bc45588dfa0a64ab0f6b14b95e2684016c42
    }

    async loginCallBack(user: User) {
        if (this.cartService.isLocal) {
            let cartLocal = this.cartViewModel;
            this.cartService = CartServiceFactory.getCartService(this);
            this.cartViewModel = await this.cartService.merge(cartLocal);
        }
    }

    protected onDispose() {
<<<<<<< HEAD
        if (this.cart !== undefined) this.cart.dispose();
=======
        this.cartViewModel.dispose();
>>>>>>> 4cf2bc45588dfa0a64ab0f6b14b95e2684016c42
    }
}

class VMain extends VPage<CCartApp> {
    async open() {
        let right = <button onClick={()=>nav.logout()}>logout</button>
        this.openPage(()=> {
            return <Page header="ddd" right={right}>
                start
            </Page>
        })
    }
}