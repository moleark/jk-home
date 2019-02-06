import * as tslib_1 from "tslib";
import * as React from 'react';
var VBand = /** @class */ (function () {
    function VBand(label) {
        this.view = function () { return React.createElement("div", null); };
        this.label = label;
    }
    VBand.prototype.render = function () {
        //text-sm-right
        return React.createElement("div", { key: this.key, className: "px-3" },
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "col-sm-2 col-form-label" }, this.label),
                React.createElement("div", { className: "col-sm-10" }, this.renderContent())));
    };
    VBand.prototype.setAddRow = function (addRow) { };
    Object.defineProperty(VBand.prototype, "key", {
        get: function () { return this.label; },
        enumerable: true,
        configurable: true
    });
    VBand.prototype.getVFields = function () { return; };
    VBand.prototype.getVArr = function () { return; };
    VBand.prototype.getVSubmit = function () { return; };
    VBand.prototype.renderContent = function () {
        return React.createElement("div", { className: "form-control form-control-plaintext bg-white border border-info rounded " }, "content");
    };
    return VBand;
}());
export { VBand };
var VFieldBand = /** @class */ (function (_super) {
    tslib_1.__extends(VFieldBand, _super);
    function VFieldBand(label, vField) {
        var _this = _super.call(this, label) || this;
        _this.vField = vField;
        return _this;
    }
    Object.defineProperty(VFieldBand.prototype, "key", {
        get: function () { return this.vField.name; },
        enumerable: true,
        configurable: true
    });
    VFieldBand.prototype.getVFields = function () { return [this.vField]; };
    VFieldBand.prototype.renderContent = function () {
        return this.vField.render();
        /*
        <div className="form-control form-control-plaintext bg-white border border-info rounded ">
            {this.vField.render()}
        </div>;*/
    };
    return VFieldBand;
}(VBand));
export { VFieldBand };
var VArrBand = /** @class */ (function (_super) {
    tslib_1.__extends(VArrBand, _super);
    function VArrBand(label, vArr) {
        var _this = _super.call(this, label) || this;
        _this.vArr = vArr;
        return _this;
    }
    VArrBand.prototype.setAddRow = function (addRow) { this.vArr.setAddRow(addRow); };
    Object.defineProperty(VArrBand.prototype, "key", {
        get: function () { return this.vArr.name; },
        enumerable: true,
        configurable: true
    });
    VArrBand.prototype.getVArr = function () { return this.vArr; };
    VArrBand.prototype.render = function () {
        return React.createElement(React.Fragment, { key: this.key }, this.vArr && this.vArr.render());
    };
    return VArrBand;
}(VBand));
export { VArrBand };
var VFieldsBand = /** @class */ (function (_super) {
    tslib_1.__extends(VFieldsBand, _super);
    function VFieldsBand(label, vFields) {
        var _this = _super.call(this, label) || this;
        _this.vFields = vFields;
        return _this;
    }
    Object.defineProperty(VFieldsBand.prototype, "key", {
        get: function () { return this.vFields[0].name; },
        enumerable: true,
        configurable: true
    });
    VFieldsBand.prototype.getVFields = function () { return this.vFields; };
    VFieldsBand.prototype.renderContent = function () {
        return React.createElement("div", { className: "form-control form-control-plaintext bg-white border border-info rounded " }, "fields");
    };
    return VFieldsBand;
}(VBand));
export { VFieldsBand };
var VSubmitBand = /** @class */ (function (_super) {
    tslib_1.__extends(VSubmitBand, _super);
    function VSubmitBand(vSubmit) {
        var _this = _super.call(this, undefined) || this;
        _this.vSubmit = vSubmit;
        return _this;
    }
    Object.defineProperty(VSubmitBand.prototype, "key", {
        get: function () { return '$submit'; },
        enumerable: true,
        configurable: true
    });
    VSubmitBand.prototype.getVSubmit = function () { return this.vSubmit; };
    VSubmitBand.prototype.render = function () {
        return React.createElement("div", { key: "$submit", className: "px-3" },
            React.createElement("div", { className: "form-group row" },
                React.createElement("div", { className: "offset-sm-2 col-sm-10" }, this.vSubmit.render())));
    };
    return VSubmitBand;
}(VBand));
export { VSubmitBand };
//# sourceMappingURL=vBand.js.map