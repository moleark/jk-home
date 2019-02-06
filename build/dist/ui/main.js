import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs } from 'tonva-tools';
import { meTab } from '../me';
export var store = {
//homeCount: observable.box<number>(-1),
//cartCount: observable.box<number>(101),
};
var color = function (selected) { return selected === true ? 'text-primary' : 'text-muted'; };
var VHome = /** @class */ (function (_super) {
    tslib_1.__extends(VHome, _super);
    function VHome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.render = function (param) {
            var _a = _this.controller, cHome = _a.cHome, cMember = _a.cMember, cCart = _a.cCart, cart = _a.cart;
            var faceTabs = [
                { name: 'home', label: '首页', icon: 'home', content: cHome.tab, notify: undefined /*store.homeCount*/ },
                { name: 'member', label: '会员', icon: 'vcard', content: cMember.tab },
                { name: 'cart', label: '购物车', icon: 'shopping-cart', content: cCart.tab, notify: cart.count },
                { name: 'me', label: '我的', icon: 'user', content: meTab }
            ].map(function (v) {
                var name = v.name, label = v.label, icon = v.icon, content = v.content, notify = v.notify;
                return {
                    name: name,
                    caption: function (selected) { return TabCaptionComponent(label, icon, color(selected)); },
                    content: content,
                    notify: notify,
                };
            });
            return React.createElement(Page, { header: false },
                React.createElement(Tabs, { tabs: faceTabs }));
        };
        return _this;
    }
    VHome.prototype.showEntry = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.render);
                return [2 /*return*/];
            });
        });
    };
    return VHome;
}(VPage));
export { VHome };
//# sourceMappingURL=main.js.map