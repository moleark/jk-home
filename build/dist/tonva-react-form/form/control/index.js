export * from './control';
export * from './buttonsControl';
export * from './stringControl';
export * from './numberControl';
import { CheckControl } from './checkControl';
import { RadioControl } from './radioControl';
import { TextAreaControl } from './textAreaControl';
import { SelectControl } from './selectControl';
import { UnknownControl, EmptyControl } from './unknownControl';
import { StringControl, PasswordControl } from './stringControl';
import { NumberControl } from './numberControl';
import { PickIdControl } from './pickIdControl';
import { PickTuidControl } from './pickTuidControl';
import { PickControl } from './pickControl';
export var createControl = function (form, row) {
    var label = row.label;
    if (row.group !== undefined)
        return createGroupControl(form, label, row);
    if (row.field !== undefined)
        return createFieldControl(form, label, row);
    return new EmptyControl(form, row.help);
};
var controls = {
    "string": StringControl,
    "password": PasswordControl,
    "number": NumberControl,
    "checkbox": CheckControl,
    "radiobox": RadioControl,
    "select": SelectControl,
    "pick-id": PickIdControl,
    "pick-tuid": PickTuidControl,
    "textarea": TextAreaControl,
    "pick": PickControl,
};
var defaultFaces = {
    "string": { type: 'string' },
    "number": { type: 'number' },
    "int": { type: 'number' },
    "dec": { type: 'number' },
    "bool": { type: 'checkbox' },
};
function createFieldControl(form, label, fieldRow) {
    var field = fieldRow.field, face = fieldRow.face;
    switch (typeof field) {
        case 'string':
            field = {
                name: field,
                type: 'string',
            };
            break;
        case 'object':
            break;
        default:
            return new UnknownControl(form, field, face);
    }
    var fieldType = field.type || 'string';
    if (face === undefined) {
        face = defaultFaces[fieldType];
        if (face === undefined)
            return new UnknownControl(form, field, face);
    }
    else if (face.type === undefined) {
        var f = defaultFaces[fieldType];
        face.type = f === undefined ? 'string' : f.type;
    }
    var control = controls[face.type || fieldType] || UnknownControl;
    return new control(form, field, face);
}
function createGroupControl(form, label, groupRow) {
    return new UnknownControl(form, groupRow, undefined);
}
//# sourceMappingURL=index.js.map