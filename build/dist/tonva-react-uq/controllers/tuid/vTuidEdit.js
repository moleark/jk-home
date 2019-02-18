import * as tslib_1 from "tslib";
import * as React from 'react';
import { FA } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { VEntity } from '../CVEntity';
var VTuidEdit = /** @class */ (function (_super) {
    tslib_1.__extends(VTuidEdit, _super);
    function VTuidEdit() {
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
            _this.event('edit-end');
        };
        _this.onSubmit = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var values, ret, id, unique, _i, unique_1, u;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = this.vForm.getValues();
                        return [4 /*yield*/, this.controller.entity.save(this.id, values)];
                    case 1:
                        ret = _a.sent();
                        id = ret.id;
                        if (id < 0) {
                            unique = this.controller.entity.unique;
                            if (unique !== undefined) {
                                for (_i = 0, unique_1 = unique; _i < unique_1.length; _i++) {
                                    u = unique_1[_i];
                                    this.vForm.setError(u, '不能重复');
                                }
                            }
                            return [2 /*return*/];
                        }
                        if (this.controller.isCalling) {
                            this.returnCall(id);
                            this.closePage();
                            return [2 /*return*/];
                        }
                        this.openPageElement(React.createElement(Page, { header: this.label + '提交成功', back: "none" },
                            React.createElement("div", { className: 'm-3' },
                                React.createElement("span", { className: "text-success" },
                                    React.createElement(FA, { name: 'check-circle', size: 'lg' }),
                                    " \u6210\u529F\u63D0\u4EA4\uFF01"),
                                React.createElement("div", { className: 'mt-5' },
                                    React.createElement("button", { className: "btn btn-primary mr-3", onClick: this.next }, "\u7EE7\u7EED\u5F55\u5165"),
                                    React.createElement("button", { className: "btn btn-outline-primary", onClick: this.finish }, "\u4E0D\u7EE7\u7EED")))));
                        this.event('item-changed', { id: this.id, values: values });
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
        //protected view = TuidNewPage;
    }
    VTuidEdit.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.vForm = this.createForm(this.onSubmit, param);
                if (param !== undefined) {
                    this.id = param.id;
                }
                this.openPage(this.editView);
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(VTuidEdit.prototype, "editView", {
        get: function () {
            var _this = this;
            return function () { return React.createElement(Page, { header: (_this.id === undefined ? '新增' : '编辑') + ' - ' + _this.label }, _this.vForm.render('py-3')); };
        },
        enumerable: true,
        configurable: true
    });
    VTuidEdit.prototype.resetForm = function () {
        this.vForm.reset();
    };
    return VTuidEdit;
}(VEntity));
export { VTuidEdit };
/*
const TuidNewPage = observer(({vm}:{vm:VmTuidEdit}) => {
    let {label, id, vmForm} = vm;
    return <Page header={(id===undefined? '新增':'编辑') + ' - ' + label}>
        {vmForm.render('mx-3 my-2')}
    </Page>;
});
*/ 
//# sourceMappingURL=vTuidEdit.js.map