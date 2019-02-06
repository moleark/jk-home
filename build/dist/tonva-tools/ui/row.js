import * as tslib_1 from "tslib";
import * as React from 'react';
import * as classNames from 'classnames';
var LabelRow = /** @class */ (function (_super) {
    tslib_1.__extends(LabelRow, _super);
    function LabelRow(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isPressed: false
        };
        return _this;
    }
    LabelRow.prototype.mouseDown = function () {
        this.setState({ isPressed: true });
    };
    LabelRow.prototype.mouseUp = function () {
        this.setState({ isPressed: false });
        if (this.props.action)
            this.props.action();
    };
    LabelRow.prototype.render = function () {
        var _this = this;
        var c = classNames('row', 'label-row', this.props.className, {
            pressed: this.state.isPressed
        });
        return (React.createElement("div", { className: c, onMouseDown: function () { return _this.mouseDown(); }, onMouseUp: function () { return _this.mouseUp(); } },
            React.createElement("div", { className: "col-xs-3" }, this.props.label),
            React.createElement("div", { className: "col-xs-9" }, this.props.children)));
    };
    return LabelRow;
}(React.Component));
export { LabelRow };
var ActionRow = /** @class */ (function (_super) {
    tslib_1.__extends(ActionRow, _super);
    function ActionRow(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isPressed: false
        };
        return _this;
    }
    ActionRow.prototype.mouseDown = function () {
        this.setState({ isPressed: true });
    };
    ActionRow.prototype.mouseUp = function () {
        this.setState({ isPressed: false });
        if (this.props.action)
            this.props.action();
    };
    ActionRow.prototype.render = function () {
        var _this = this;
        var c = classNames('action-row', this.props.className, {
            pressed: this.state.isPressed
        });
        return (React.createElement("div", { className: c, onMouseDown: function () { return _this.mouseDown(); }, onMouseUp: function () { return _this.mouseUp(); } }, this.props.children));
    };
    return ActionRow;
}(React.Component));
export { ActionRow };
//# sourceMappingURL=row.js.map