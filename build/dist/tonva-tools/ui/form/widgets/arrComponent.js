import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
//import { ArrRow } from '../arrRow';
import { RowContext, ContextContainer } from '../context';
import { Unknown } from './unknown';
import { factory } from './factory';
export var ArrComponent = observer(function (_a) {
    var parentContext = _a.parentContext, arrSchema = _a.arrSchema, children = _a.children;
    var name = arrSchema.name, arr = arrSchema.arr;
    var data = parentContext.initData[name];
    var form = parentContext.form;
    var arrRowContexts = parentContext.getArrRowContexts(name);
    var ui = parentContext.getUiItem(name);
    var arrLabel = name;
    var Templet;
    var selectable, deletable, restorable;
    var ArrContainer = form.ArrContainer, RowContainer = form.RowContainer, RowSeperator = form.RowSeperator, uiSchema = form.uiSchema;
    if (uiSchema !== undefined) {
        var formSelectable = uiSchema.selectable, formDeletable = uiSchema.deletable, formRestorable = uiSchema.restorable;
        if (selectable !== true)
            selectable = formSelectable;
        if (deletable !== true)
            deletable = formDeletable;
        if (restorable !== true)
            restorable = formRestorable;
    }
    if (ui !== undefined) {
        var widgetType = ui.widget, label = ui.label, arrSelectable = ui.selectable, arrDeletable = ui.deletable, arrRestorable = ui.restorable, ac = ui.ArrContainer, rc = ui.RowContainer, rs = ui.RowSeperator;
        if (arrSelectable !== undefined)
            selectable = arrSelectable;
        if (arrDeletable !== undefined)
            deletable = arrDeletable;
        if (arrRestorable !== undefined)
            restorable = arrRestorable;
        if (ac !== undefined)
            ArrContainer = ac;
        if (rc !== undefined)
            RowContainer = rc;
        if (rs !== undefined)
            RowSeperator = rs;
        Templet = ui.Templet;
        if (widgetType !== 'arr')
            return Unknown(arrSchema.type, widgetType, ['arr']);
        arrLabel = label || arrLabel;
    }
    var first = true;
    return ArrContainer(arrLabel, React.createElement(React.Fragment, null, data.map(function (row, index) {
        var rowContext;
        var rowContent;
        var sep = undefined;
        if (first === false)
            sep = RowSeperator;
        else
            first = false;
        if (children !== undefined) {
            rowContext = new RowContext(parentContext, arrSchema, row, true);
            rowContent = React.createElement(React.Fragment, null, children);
        }
        else {
            var typeofTemplet = typeof Templet;
            if (typeofTemplet === 'function') {
                rowContext = new RowContext(parentContext, arrSchema, row, true);
                rowContent = React.createElement(observer(Templet), row);
            }
            else if (typeofTemplet === 'object') {
                rowContext = new RowContext(parentContext, arrSchema, row, true);
                rowContent = Templet;
            }
            else {
                rowContext = new RowContext(parentContext, arrSchema, row, false);
                rowContent = React.createElement(React.Fragment, null, arr.map(function (v, index) {
                    return React.createElement(React.Fragment, { key: v.name }, factory(rowContext, v, undefined));
                }));
            }
        }
        var rowKey = rowContext.rowKey;
        arrRowContexts[rowKey] = rowContext;
        var selectCheck, deleteIcon;
        if (selectable === true) {
            var onClick = function (evt) {
                var checked = evt.target.checked;
                row.$isSelected = checked;
                var $source = row.$source;
                if ($source !== undefined)
                    $source.$isSelected = checked;
                rowContext.removeErrors();
            };
            selectCheck = React.createElement("div", { className: "form-row-checkbox" },
                React.createElement("input", { type: "checkbox", onClick: onClick, defaultChecked: row.$isSelected }));
        }
        var isDeleted = !(row.$isDeleted === undefined || row.$isDeleted === false);
        if (deletable === true) {
            var icon = isDeleted ? 'fa-undo' : 'fa-trash';
            var onDelClick = function () {
                if (restorable === true) {
                    row.$isDeleted = !isDeleted;
                    var $source = row.$source;
                    if ($source !== undefined)
                        $source.$isDeleted = !isDeleted;
                }
                else {
                    var p = data.indexOf(row);
                    if (p >= 0)
                        data.splice(p, 1);
                }
                rowContext.removeErrors();
            };
            deleteIcon = React.createElement("div", { className: "form-row-edit text-info", onClick: onDelClick },
                React.createElement("i", { className: classNames('fa', icon, 'fa-fw') }));
        }
        var editContainer = selectable === true || deletable === true ?
            function (content) { return React.createElement("fieldset", { disabled: isDeleted },
                React.createElement("div", { className: classNames('d-flex', { 'deleted': isDeleted, 'row-selected': row.$isSelected }) },
                    selectCheck,
                    React.createElement("div", { className: "flex-grow-1" }, content),
                    deleteIcon)); }
            :
                function (content) { return content; };
        return React.createElement(ContextContainer.Provider, { key: rowKey, value: rowContext },
            sep,
            RowContainer(editContainer(React.createElement(React.Fragment, null,
                React.createElement(rowContext.renderErrors, null),
                rowContent))));
    })));
});
//# sourceMappingURL=arrComponent.js.map