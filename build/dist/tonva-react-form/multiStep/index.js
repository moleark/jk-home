import * as tslib_1 from "tslib";
import * as React from 'react';
import _ from 'lodash';
import className from 'classnames';
import { TonvaForm } from '../form';
var MultiStep = /** @class */ (function (_super) {
    tslib_1.__extends(MultiStep, _super);
    function MultiStep(props) {
        var _this = _super.call(this, props) || this;
        _this.values = {};
        _this.stepViews = [];
        _this.state = {
            topView: undefined,
            stepViews: [],
        };
        _this.onPrev = _this.onPrev.bind(_this);
        _this.onNext = _this.onNext.bind(_this);
        return _this;
    }
    MultiStep.prototype.setStep = function (stepName) {
        var step = this.props.steps[stepName];
        if (step === undefined)
            return; //throw new Error('Unknown step name: ' + stepName);
        if (this.topView !== undefined)
            this.stepViews.push(this.topView);
        var otherButton, onOther;
        if (this.stepViews.length > 0) {
            otherButton = React.createElement(ButtonConten, { prefix: "undo", text: "\u4E0A\u4E00\u6B65" });
            onOther = this.onPrev;
        }
        var _a = this.props, header = _a.header, footer = _a.footer;
        var btnContent = step.next === undefined ?
            { prefix: 'cloud-upload', text: this.props.submitButton || '提交' } :
            { suffix: 'arrow-right', text: '下一步' };
        var formProps = {
            formRows: step.formRows,
            submitButton: React.createElement(ButtonConten, tslib_1.__assign({}, btnContent)),
            onSubmit: this.onNext,
            otherButton: otherButton,
            onOther: onOther,
        };
        var num = this.stepViews.length + 1;
        this.topView = {
            stepName: stepName,
            step: step,
            props: formProps,
        };
        this.setState({
            topView: this.topView,
            stepViews: this.stepViews
        });
    };
    MultiStep.prototype.componentWillMount = function () {
        this.setStep(this.props.first);
    };
    MultiStep.prototype.onPrev = function (values) {
        _.assign(this.values, values);
        this.topView = this.stepViews.pop();
        this.setState({
            topView: this.topView,
            stepViews: this.stepViews
        });
    };
    MultiStep.prototype.onNext = function (values) {
        _.assign(this.values, values);
        //let {num, step} = this.state;
        var next = this.topView.step.next;
        if (next === undefined) {
            return this.props.onSubmit(this.values);
        }
        var nextStepName;
        if (typeof next === 'string') {
            nextStepName = next;
        }
        else {
            nextStepName = next(this.values);
        }
        this.setStep(nextStepName);
    };
    MultiStep.prototype.render = function () {
        var _a = this.props, className = _a.className, header = _a.header, footer = _a.footer;
        var _b = this.state, topView = _b.topView, stepViews = _b.stepViews;
        var stepName = topView.stepName, step = topView.step;
        var hidden = { visibility: 'hidden' };
        var num = stepViews.length + 1;
        return React.createElement("div", { className: className },
            React.createElement("div", null,
                header && header(step, num),
                React.createElement(TonvaForm, tslib_1.__assign({ key: stepName, initValues: this.values }, topView.props)),
                footer && footer(step, num)));
    };
    return MultiStep;
}(React.Component));
export { MultiStep };
var ButtonConten = function (props) {
    var prefix = props.prefix, text = props.text, suffix = props.suffix;
    var pIcon, sIcon;
    if (prefix !== undefined)
        pIcon = React.createElement("i", { className: className('fa', 'fa-' + prefix) });
    if (suffix !== undefined)
        sIcon = React.createElement("i", { className: className('fa', 'fa-' + suffix) });
    return React.createElement(React.Fragment, null,
        pIcon,
        " ",
        props.text,
        " ",
        sIcon);
};
//# sourceMappingURL=index.js.map