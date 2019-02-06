import { PropBorder, PropGap, StringPropRow, NumberPropRow, ListPropRow, ComponentPropRow } from './row';
var PropView = /** @class */ (function () {
    function PropView(gridProps, props) {
        this.gridProps = gridProps;
        this.props = props;
        //this.values = values;
        this.buildRows();
    }
    PropView.prototype.buildRows = function () {
        this.rows = [];
        var isGap = true;
        for (var _i = 0, _a = this.props; _i < _a.length; _i++) {
            var prop = _a[_i];
            if (typeof prop === 'string') {
                this.rows.push(new PropGap(prop));
                isGap = true;
            }
            else {
                if (!isGap)
                    this.rows.push(new PropBorder());
                var row = void 0;
                switch (prop.type) {
                    default: continue;
                    case 'string':
                        row = new StringPropRow(this.gridProps, prop);
                        break;
                    case 'number':
                        row = new NumberPropRow(this.gridProps, prop);
                        break;
                    case 'list':
                        row = new ListPropRow(this.gridProps, prop);
                        break;
                    case 'component':
                        row = new ComponentPropRow(this.gridProps, prop);
                        break;
                }
                this.rows.push(row);
                isGap = false;
            }
        }
    };
    PropView.prototype.setValues = function (values) {
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var r = _a[_i];
            r.setValues(values);
        }
    };
    PropView.prototype.render = function () {
        return this.rows.map(function (row, index) { return row.render(String(index)); });
    };
    return PropView;
}());
export { PropView };
//# sourceMappingURL=propView.js.map