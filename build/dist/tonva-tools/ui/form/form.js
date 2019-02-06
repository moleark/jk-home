import * as tslib_1 from "tslib";
import * as React from 'react';
import { observable, autorun } from 'mobx';
import classNames from 'classnames';
import { factory } from './widgets';
import 'font-awesome/css/font-awesome.min.css';
import { ContextContainer, FormContext } from './context';
import { formRes } from './formRes';
import { resLang } from '../res';
var Form = /** @class */ (function (_super) {
    tslib_1.__extends(Form, _super);
    //readonly ArrContainer: (label:any, content:JSX.Element) => JSX.Element;
    //readonly RowContainer: (content:JSX.Element) => JSX.Element;
    //readonly RowSeperator: JSX.Element;
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.calcSelectOrDelete = function () {
            if (_this.formData === undefined)
                return;
            for (var _i = 0, _a = _this.schema; _i < _a.length; _i++) {
                var itemSchema = _a[_i];
                _this.arrItemOperated(itemSchema);
            }
        };
        _this.DefaultContainer = function (content) {
            return React.createElement("form", { className: classNames(_this.props.className) }, content);
        };
        /*
        protected DefaultArrFieldContainer = (itemName:string, content:JSX.Element, context:RowContext): JSX.Element => {
            return this.InnerFieldContainer(itemName, content, context);
        }*/
        _this.DefaultFieldContainer = function (label, content) {
            //return this.InnerFieldContainer(itemName, content, context);
            var fieldLabelSize = _this.props.fieldLabelSize;
            if (fieldLabelSize > 0) {
                var labelView = void 0;
                if (label === null) {
                    fieldLabelSize = 0;
                }
                else {
                    labelView = React.createElement("label", { className: classNames('col-sm-' + fieldLabelSize, 'col-form-label') }, label);
                }
                var fieldCol = 'col-sm-' + (12 - fieldLabelSize);
                return React.createElement("div", { className: "form-group row" },
                    labelView,
                    React.createElement("div", { className: fieldCol }, content));
            }
            return React.createElement("div", { className: "form-group" },
                label === null ? null : React.createElement("label", { className: "col-form-label" }, label),
                content);
        };
        _this.DefaultFieldClass = undefined;
        _this.DefaultButtonClass = 'text-center py-2';
        _this.DefaultRes = resLang(formRes);
        _this.ArrContainer = function (label, content) {
            return React.createElement("div", null,
                React.createElement("div", { className: classNames('small text-muted text-center bg-light py-1 px-3 mt-4 mb-1') }, label),
                content);
        };
        _this.RowContainer = function (content) {
            //return <div className="row">{content}</div>;
            var cn = classNames({
                'py-3': true
            });
            return React.createElement("div", { className: cn }, content);
        };
        _this.RowSeperator = React.createElement("div", { className: "border border-gray border-top" });
        var schema = props.schema, uiSchema = props.uiSchema, formData = props.formData, Container = props.Container, FieldContainer = props.FieldContainer, FieldClass = props.FieldClass, ButtonClass = props.ButtonClass, res = props.res;
        _this.Container = Container || _this.DefaultContainer;
        _this.FieldContainer = FieldContainer || _this.DefaultFieldContainer;
        _this.FieldClass = FieldClass !== undefined && FieldClass !== '' && FieldClass !== null ? FieldClass : _this.DefaultFieldClass;
        _this.res = res || _this.DefaultRes;
        _this.ButtonClass = ButtonClass || _this.DefaultButtonClass;
        //this.ArrContainer = ArrContainer || this.DefaultArrContainer;
        //this.RowContainer = RowContainer || this.DefaultRowContainer;
        //this.RowSeperator = RowSeperator || this.DefaultRowSeperator;
        _this.schema = schema;
        _this.itemSchemas = {};
        for (var _i = 0, _a = _this.schema; _i < _a.length; _i++) {
            var itemSchema = _a[_i];
            _this.itemSchemas[itemSchema.name] = itemSchema;
        }
        _this.uiSchema = uiSchema;
        _this.formData = formData;
        _this.disposer = autorun(_this.calcSelectOrDelete);
        _this.data = {};
        _this.initData(formData);
        var inNode = _this.props.children !== undefined || _this.uiSchema && _this.uiSchema.Templet !== undefined;
        //this.formContext = new FormContext(this, inNode);
        var children = _this.props.children;
        //let content:JSX.Element; //, inNode:boolean;
        //let formContext: FormContext;
        if (children !== undefined) {
            //inNode = true;
            _this.content = React.createElement(React.Fragment, null, children);
            _this.formContext = new FormContext(_this, true);
        }
        else {
            var Templet = void 0;
            if (_this.uiSchema !== undefined) {
                Templet = _this.uiSchema.Templet;
            }
            if (Templet !== undefined) {
                // inNode = true;
                _this.content = typeof (Templet) === 'function' ? Templet(_this.data) : Templet;
                _this.formContext = new FormContext(_this, true);
            }
            else {
                // inNode = false;
                _this.formContext = new FormContext(_this, false);
                _this.content = React.createElement(React.Fragment, null, _this.schema.map(function (v, index) {
                    return React.createElement(React.Fragment, { key: index }, factory(_this.formContext, v, children));
                }));
            }
        }
        return _this;
    }
    Form.prototype.initData = function (formData) {
        if (formData === undefined)
            formData = {};
        for (var _i = 0, _a = this.schema; _i < _a.length; _i++) {
            var itemSchema = _a[_i];
            this.initDataItem(itemSchema, this.data, formData);
        }
    };
    Form.prototype.initDataItem = function (itemSchema, data, formData) {
        var name = itemSchema.name, type = itemSchema.type;
        if (type === 'button')
            return;
        if (type === 'arr') {
            var arrItem = itemSchema;
            var arrItems = arrItem.arr;
            if (arrItems === undefined)
                return;
            var arrDict = arrItem.itemSchemas = {};
            for (var _i = 0, arrItems_1 = arrItems; _i < arrItems_1.length; _i++) {
                var item = arrItems_1[_i];
                arrDict[item.name] = item;
            }
            var val = formData[name];
            if (val === undefined)
                val = [];
            else if (Array.isArray(val) === false)
                val = [val];
            var arr = [];
            for (var _a = 0, val_1 = val; _a < val_1.length; _a++) {
                var row = val_1[_a];
                var $isSelected = row.$isSelected, $isDeleted = row.$isDeleted;
                var r = {
                    $source: row,
                    $isSelected: $isSelected,
                    $isDeleted: $isDeleted,
                };
                for (var _b = 0, arrItems_2 = arrItems; _b < arrItems_2.length; _b++) {
                    var item = arrItems_2[_b];
                    this.initDataItem(item, r, row);
                    /*
                    let {name:nm} = item;
                    let v = row[nm];
                    if (v === undefined) v = null;
                    r[nm] = v;
                    */
                }
                arr.push(r);
            }
            data[name] = observable(arr);
            return;
        }
        data[name] = formData[name];
    };
    Form.prototype.arrItemOperated = function (itemSchema) {
        var name = itemSchema.name, type = itemSchema.type;
        if (type !== 'arr')
            return;
        //let arrVal = this.formData[name];
        //if (arrVal === undefined) return;
        var formArrVal = this.data[name];
        var arrItems = itemSchema.arr;
        for (var _i = 0, formArrVal_1 = formArrVal; _i < formArrVal_1.length; _i++) {
            var row = formArrVal_1[_i];
            var $source = row.$source;
            if ($source === undefined)
                continue;
            var $isSelected = $source.$isSelected, $isDeleted = $source.$isDeleted;
            row.$isSelected = $isSelected;
            row.$isDeleted = $isDeleted;
            //console.log($isSelected, $isDeleted);
            for (var _a = 0, arrItems_3 = arrItems; _a < arrItems_3.length; _a++) {
                var item = arrItems_3[_a];
                this.arrItemOperated(item);
            }
        }
    };
    Form.prototype.componentDidMount = function () {
        var beforeShow = this.props.beforeShow;
        if (beforeShow !== undefined)
            beforeShow(this.formContext);
    };
    Form.prototype.componentWillUnmount = function () {
        this.disposer();
    };
    Form.prototype.render = function () {
        return React.createElement(ContextContainer.Provider, { value: this.formContext },
            React.createElement(this.formContext.renderErrors, null),
            this.Container(this.content));
    };
    tslib_1.__decorate([
        observable
    ], Form.prototype, "data", void 0);
    return Form;
}(React.Component));
export { Form };
//# sourceMappingURL=form.js.map