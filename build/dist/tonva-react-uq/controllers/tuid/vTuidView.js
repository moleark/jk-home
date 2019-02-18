import * as tslib_1 from "tslib";
import * as React from 'react';
import { FA } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { jsonStringify } from '../../tools';
import { VEntity } from '../CVEntity';
var VTuidView = /** @class */ (function (_super) {
    tslib_1.__extends(VTuidView, _super);
    function VTuidView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.next = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.vForm.reset();
                this.closePage();
                return [2 /*return*/];
            });
        }); };
        _this.finish = function () {
            _this.closePage(2);
        };
        _this.onSubmit = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var values, ret;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = this.vForm.getValues();
                        return [4 /*yield*/, this.entity.save(this.id, values)];
                    case 1:
                        ret = _a.sent();
                        if (ret) {
                            alert('这里还要判断返回值，先不处理了 \n' + jsonStringify(ret));
                        }
                        this.openPage(function () { return React.createElement(Page, { header: _this.label + '提交成功', back: "none" },
                            React.createElement("div", { className: 'm-3' },
                                React.createElement("span", { className: "text-success" },
                                    React.createElement(FA, { name: 'check-circle', size: 'lg' }),
                                    " \u6210\u529F\u63D0\u4EA4\uFF01"),
                                React.createElement("div", { className: 'mt-5' },
                                    React.createElement("button", { className: "btn btn-primary mr-3", onClick: _this.next }, "\u7EE7\u7EED\u5F55\u5165"),
                                    React.createElement("button", { className: "btn btn-outline-primary", onClick: _this.finish }, "\u4E0D\u7EE7\u7EED")))); });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.view = function () { return React.createElement(Page, { header: _this.label }, _this.vForm.render('py-3')); };
        return _this;
    }
    VTuidView.prototype.buildForm = function (param) {
        this.vForm = this.createForm(undefined, param);
    };
    VTuidView.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.buildForm(param);
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    VTuidView.prototype.render = function (param) {
        this.buildForm(param);
        return this.vForm.render();
    };
    VTuidView.prototype.loadId = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.id = id;
                return [2 /*return*/];
            });
        });
    };
    VTuidView.prototype.resetForm = function () {
        this.vForm.reset();
    };
    return VTuidView;
}(VEntity));
export { VTuidView };
//# sourceMappingURL=vTuidView.js.map