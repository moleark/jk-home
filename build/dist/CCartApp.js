import * as tslib_1 from "tslib";
import { CApp } from 'tonva-react-usql';
import { CCart } from 'cart/CCart';
import { CProduct } from 'product';
import { COrder } from 'order/COrder';
import { CHome } from './home/CHome';
import { CProductCategory } from 'productCategory/CProductCategory';
import { CUser } from 'customer/CPerson';
import { CMember } from 'member/CMember';
import { WebUser } from 'CurrentUser';
import { consts } from './home/consts';
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
                        console.log('CCartApp.internalStart');
                        this.cUsqOrder = this.getCUsq(consts.usqOrder);
                        this.cUsqProduct = this.getCUsq(consts.usqProduct);
                        this.cUsqCommon = this.getCUsq(consts.usqCommon);
                        this.cUsqWebUser = this.getCUsq(consts.usqWebUser);
                        this.cUsqCustomer = this.getCUsq(consts.usqCustomer);
                        this.cUsqCustomerDiscount = this.getCUsq(consts.usqCustomerDiscount);
                        this.cUsqWarehouse = this.getCUsq(consts.usqWarehouse);
                        this.cUsqMember = this.getCUsq(consts.usqMember);
                        salesRegionTuid = this.cUsqCommon.tuid('salesregion');
                        _a = this;
                        return [4 /*yield*/, salesRegionTuid.load(1)];
                    case 1:
                        _a.currentSalesRegion = _c.sent();
                        languageTuid = this.cUsqCommon.tuid('language');
                        _b = this;
                        return [4 /*yield*/, languageTuid.load(197)];
                    case 2:
                        _b.currentLanguage = _c.sent();
                        this.currentUser = new WebUser(this.cUsqWebUser);
                        if (this.isLogined)
                            this.currentUser.user = this.user;
                        this.cProductCategory = new CProductCategory(this, undefined);
                        this.cCart = new CCart(this, undefined);
                        this.cHome = new CHome(this, undefined);
                        this.cProduct = new CProduct(this, undefined);
                        this.cOrder = new COrder(this, undefined);
                        this.cUser = new CUser(this, undefined);
                        this.cMember = new CMember(this, undefined);
                        promises = [];
                        promises.push(this.cCart.cart.load());
                        promises.push(this.cProductCategory.start());
                        return [4 /*yield*/, Promise.all(promises)];
                    case 3:
                        _c.sent();
                        this.showVPage(this.VAppMain);
                        return [2 /*return*/];
                }
            });
        });
    };
    return CCartApp;
}(CApp));
export { CCartApp };
//# sourceMappingURL=CCartApp.js.map