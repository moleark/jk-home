import { CAppBase, Controller, IConstructor, CUq, User, nav } from "tonva";
import { UQs } from "./uqs";
import { Cart } from "./cart/Cart";
import { WebUser } from "./CurrentUser";
import { CHome } from "./home";
import { CCart } from "./cart";
import { CProduct } from "./product";
import { COrder } from "./order/COrder";
import { CProductCategory } from "./productCategory/CProductCategory";
import { CMember } from "./member";
import { CMe } from "./me/CMe";
import { GLOABLE } from "../ui";
import { VMain } from "./ui/main";
import { CBase } from "./CBase";

export class CApp extends CAppBase {
    readonly uqs: UQs;

    cart: Cart;
    topKey: any;

    currentSalesRegion: any;
    currentLanguage: any;
    currentUser: WebUser;

    /*
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
    */

    cHome: CHome;
    cCart: CCart;
    cProduct: CProduct;
    cOrder: COrder;
    //cSelectContact: CSelectContact;
    cProductCategory: CProductCategory;
    cMember: CMember;
    cMe: CMe;

    protected newC<T extends CBase>(type: IConstructor<T>):T {
        return new type(this);
    }

    protected async internalStart() {
        /*
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
        */

        //let salesRegionTuid = this.uqs.common.salesregion; //.cUqCommon.tuid('salesregion');
        this.currentSalesRegion = await this.uqs.common.SalesRegion.load(GLOABLE.SALESREGION_CN);

        //let languageTuid = this.cUqCommon.tuid('language');
        this.currentLanguage = await this.uqs.common.Language.load(GLOABLE.CHINESE);

        this.currentUser = new WebUser(this.uqs); //this.cUqWebUser, this.cUqCustomer);
        if (this.isLogined) {
            this.currentUser.setUser(this.user);
        }

        this.cart = new Cart(this);
        await this.cart.init();

        this.cProductCategory = this.newC(CProductCategory); // new CProductCategory(this, undefined);
        this.cCart = this.newC(CCart); // new CCart(this, undefined);
        this.cHome = this.newC(CHome); // new CHome(this, undefined);
        this.cProduct = this.newC(CProduct); // new CProduct(this, undefined);
        this.cOrder = this.newC(COrder); // new COrder(this, undefined);
        //this.cSelectContact = new CSelectContact(this, undefined);
        this.cMember = this.newC(CMember); // new CMember(this, undefined);
        this.cMe = this.newC(CMe); // new CMe(this, undefined);

        let promises: PromiseLike<void>[] = [];
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);
        this.showMain();
        this.topKey = nav.topKey();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
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
