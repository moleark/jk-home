import { VFieldBand, VArrBand, VSubmitBand } from "./vBand";
import { VSubmit } from "./vSubmit";
import { buildVField, VComputeField } from "./vField";
import { VArr } from "./vArr";
import { VTuidField } from "./vField/vTuidField";
var BandsBuilder = /** @class */ (function () {
    function BandsBuilder(vForm, options, onSubmit) {
        this.vForm = vForm;
        this.onSubmit = onSubmit;
        var fields = options.fields, arrs = options.arrs, ui = options.ui, res = options.res;
        this.fields = fields;
        this.arrs = arrs;
        if (ui !== undefined) {
            var items = ui.items, layout = ui.layout;
            this.formItems = items;
            this.layout = layout;
        }
        this.res = res;
    }
    BandsBuilder.prototype.build = function () {
        //return this.bandUIs === undefined? this.bandsOnFly() : this.bandsFromUI();
        return this.layout === undefined ? this.bandsOnFly() : this.bandsFromLayout();
    };
    BandsBuilder.prototype.resFromName = function (name, res) {
        if (res === undefined)
            return;
        var fields = res.fields;
        if (fields === undefined)
            return;
        return fields[name] || name;
    };
    BandsBuilder.prototype.bandsOnFly = function () {
        var bands = [];
        this.bandsFromFields(bands, this.fields, this.res);
        if (this.arrs !== undefined) {
            for (var _i = 0, _a = this.arrs; _i < _a.length; _i++) {
                var arr = _a[_i];
                bands.push(this.bandFromArr(arr));
            }
        }
        if (this.onSubmit !== undefined) {
            bands.push(new VSubmitBand(new VSubmit(this.vForm)));
        }
        return bands;
    };
    BandsBuilder.prototype.bandsFromFields = function (bands, fields, res) {
        if (fields === undefined)
            return;
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            bands.push(this.bandFromField(field, res));
        }
    };
    BandsBuilder.prototype.bandsFromLayout = function () {
        var bands = [];
        /*
        for (let bandUI of this.bandUIs)  {
            let band = this.bandFromUI(bandUI);
            bands.push(band);
        }
        */
        return bands;
    };
    /*
    private bandFromUI(bandUI:BandUI):VBand {
        let {band} = bandUI;
        switch (band) {
            default: return this.bandFromFieldUI(bandUI as FieldBandUI);
            case 'arr': return this.bandFromArrUI(bandUI as ArrBandUI);
            case 'fields': return this.bandFromFieldsUI(bandUI as FieldsBandUI);
            case 'submit': return this.bandFromSubmitUI(bandUI as SubmitBandUI);
        }
    }
    
    private bandFromFieldUI(bandUI: FieldBandUI): VFieldBand {
        let {label} = bandUI;
        let vField = this.vFieldFromUI(bandUI);
        return new VFieldBand(label, vField);
    }
    private bandFromArrUI(bandUI: ArrBandUI): VArrBand {
        let {label, name} = bandUI;
        let vArr = this.vArrFromUI(bandUI);
        return new VArrBand(label, vArr);
    }
    private bandFromFieldsUI(bandUI: FieldsBandUI): VFieldsBand {
        let {label, fieldUIs} = bandUI;
        let vFields = fieldUIs.map(v => this.vFieldFromUI(v));
        return new VFieldsBand(label, vFields);
    }
    private bandFromSubmitUI(bandUI: SubmitBandUI): VSubmitBand {
        if (this.onSubmit === undefined) return;
        let vSubmit = new VSubmit(this.vForm);
        return new VSubmitBand(vSubmit);
    }
    */
    /*
        private vFieldFromField(field:Field, fieldRes:FieldRes, formItem: FormItem): VField {
            let fieldUI:FieldUI = undefined;
            if (formItem !== undefined) {
                if (typeof formItem === 'function') {
                    return new VComputeField(this.vForm, field, fieldRes);
                }
            }
            let ret = buildVField(this.vForm, field, formItem, fieldRes);
            if (ret !== undefined) return ret;
            return new VTuidField(field, fieldUI, fieldRes, this.vForm);
        }
    */
    BandsBuilder.prototype.bandFromField = function (field, res) {
        var name = field.name;
        var fieldRes;
        var rfn = this.resFromName(name, res);
        var label;
        if (typeof rfn === 'object') {
            label = rfn.label;
            fieldRes = rfn;
        }
        else {
            label = rfn;
            fieldRes = undefined;
        }
        var vField;
        var formItem;
        if (this.formItems !== undefined)
            formItem = this.formItems[name];
        //let vField = this.vFieldFromField(field, fieldRes as FieldRes, formItem);
        //let fieldUI:FieldUI = undefined;
        if (typeof formItem === 'function') {
            vField = new VComputeField(this.vForm, field, fieldRes);
        }
        else {
            vField = buildVField(this.vForm, field, formItem, fieldRes);
        }
        if (vField === undefined) {
            vField = new VTuidField(this.vForm, field, formItem, fieldRes);
        }
        return new VFieldBand(label || name, vField);
    };
    BandsBuilder.prototype.bandFromArr = function (arr) {
        var name = arr.name, fields = arr.fields;
        //let row = JSONContent;
        //let bands:VBand[] = [];
        //this.bandsFromFields(bands, fields, res);
        var vArr = new VArr(this.vForm, arr); // name, res && res.label || name, row, bands);
        return new VArrBand(name, vArr);
    };
    return BandsBuilder;
}());
export { BandsBuilder };
//# sourceMappingURL=bandsBuilder.js.map