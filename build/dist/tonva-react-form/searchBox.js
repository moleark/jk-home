import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { observable } from 'mobx';
/*
export interface SearchBoxState {
    disabled: boolean;
}*/
var SearchBox = /** @class */ (function (_super) {
    tslib_1.__extends(SearchBox, _super);
    function SearchBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = null;
        /*
        constructor(props: SearchBoxProps) {
            super(props);
            this.state = {
                disabled: false,
            }
        }*/
        _this.onChange = function (evt) {
            _this.key = evt.target.value;
            if (_this.key !== undefined) {
                _this.key = _this.key.trim();
                if (_this.key === '')
                    _this.key = undefined;
            }
            if (_this.props.allowEmptySearch !== true) {
                _this.disabled = !_this.key;
            }
        };
        /*
        ref = (input: HTMLInputElement) => {
            this.input = input;
            this.key = this.props.initKey || '';
            if (input === null) return;
            input.value = this.key;
        }*/
        _this.onSubmit = function (evt) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        evt.preventDefault();
                        if (this.key === null)
                            this.key = this.props.initKey || '';
                        if (this.props.allowEmptySearch !== true) {
                            if (!this.key)
                                return [2 /*return*/];
                            if (this.input)
                                this.input.disabled = true;
                        }
                        return [4 /*yield*/, this.props.onSearch(this.key)];
                    case 1:
                        _a.sent();
                        if (this.input)
                            this.input.disabled = false;
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    SearchBox.prototype.render = function () {
        var _a = this.props, className = _a.className, inputClassName = _a.inputClassName, label = _a.label, placeholder = _a.placeholder, buttonText = _a.buttonText, maxLength = _a.maxLength, size = _a.size;
        var inputSize;
        switch (size) {
            default:
            case 'sm':
                inputSize = 'input-group-sm';
                break;
            case 'md':
                inputSize = 'input-group-md';
                break;
            case 'lg':
                inputSize = 'input-group-lg';
                break;
        }
        var lab;
        if (label !== undefined)
            lab = React.createElement("label", { className: "input-group-addon" }, label);
        return React.createElement("form", { className: className, onSubmit: this.onSubmit },
            React.createElement("div", { className: classNames("input-group", inputSize) },
                lab,
                React.createElement("input", { onChange: this.onChange, type: "text", name: "key", 
                    //ref={this.ref}
                    className: classNames('form-control', inputClassName || 'border-primary'), placeholder: placeholder, defaultValue: this.props.initKey, maxLength: maxLength }),
                React.createElement("div", { className: "input-group-append" },
                    React.createElement("button", { className: "btn btn-primary", type: "submit", disabled: this.disabled },
                        React.createElement("i", { className: 'fa fa-search' }),
                        React.createElement("i", { className: "fa" }),
                        buttonText))));
    };
    tslib_1.__decorate([
        observable
    ], SearchBox.prototype, "disabled", void 0);
    return SearchBox;
}(React.Component));
export { SearchBox };
//# sourceMappingURL=searchBox.js.map