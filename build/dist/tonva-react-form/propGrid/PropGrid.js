import * as tslib_1 from "tslib";
import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { PropView } from './propView';
var PropGrid = /** @class */ (function (_super) {
    tslib_1.__extends(PropGrid, _super);
    function PropGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
        private propView: PropView;
        constructor(props:PropGridProps) {
            super(props);
        }
    */
    /*
        componentWillMount() {
            this.propView = new PropView(this.props.rows);
            this.propView.setValues(this.props.values);
        }
    
        componentWillReceiveProps(nextProps: Readonly<PropGridProps>, nextContext: any) {
            this.propView = new PropView(this.props.rows);
            this.propView.setValues(nextProps.values);
            this.forceUpdate();
        }
    */
    PropGrid.prototype.render = function () {
        var _a = this.props, className = _a.className, rows = _a.rows, values = _a.values;
        var propView = new PropView(this.props, rows);
        propView.setValues(values);
        var cn = classNames('container-fluid', className);
        return React.createElement("div", { className: cn }, propView.render());
    };
    PropGrid = tslib_1.__decorate([
        observer
    ], PropGrid);
    return PropGrid;
}(React.Component));
export { PropGrid };
//# sourceMappingURL=PropGrid.js.map