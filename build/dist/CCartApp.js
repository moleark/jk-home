import * as tslib_1 from "tslib";
import { CApp } from 'tonva-react-uq';
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
var CCartApp = /** @class */ (function (_super) {
    tslib_1.__extends(CCartApp, _super);
    function CCartApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CCartApp.prototype.internalStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var salesRegionTuid, _a, languageTuid, _b, promises;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.cUqOrder = this.getCUq(consts.uqOrder);
                        this.cUqProduct = this.getCUq(consts.uqProduct);
                        this.cUqCommon = this.getCUq(consts.uqCommon);
                        this.cUqWebUser = this.getCUq(consts.uqWebUser);
                        this.cUqCustomer = this.getCUq(consts.uqCustomer);
                        this.cUqCustomerDiscount = this.getCUq(consts.uqCustomerDiscount);
                        this.cUqWarehouse = this.getCUq(consts.uqWarehouse);
                        this.cUqMember = this.getCUq(consts.uqMember);
                        salesRegionTuid = this.cUqCommon.tuid('salesregion');
                        _a = this;
                        return [4 /*yield*/, salesRegionTuid.load(1)];
                    case 1:
                        _a.currentSalesRegion = _c.sent();
                        languageTuid = this.cUqCommon.tuid('language');
                        _b = this;
                        return [4 /*yield*/, languageTuid.load(197)];
                    case 2:
                        _b.currentLanguage = _c.sent();
                        this.currentUser = new WebUser(this.cUqWebUser);
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
                        promises = [];
                        promises.push(this.cart.load());
                        promises.push(this.cProductCategory.start());
                        return [4 /*yield*/, Promise.all(promises)];
                    case 3:
                        _c.sent();
                        this.showMain();
                        return [2 /*return*/];
                }
            });
        });
    };
    CCartApp.prototype.showMain = function (initTabName) {
        this.showVPage(this.VAppMain, initTabName);
    };
    CCartApp.prototype.onDispose = function () {
        this.cart.dispose();
    };
    return CCartApp;
}(CApp));
export { CCartApp };
//# sourceMappingURL=CCartApp.js.map