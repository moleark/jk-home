import * as React from 'react';
import classNames from 'classnames';
import { UpdownWidget } from "tonva-tools/ui/form/widgets";
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const keys = [107, 109, 110, 187, 189];

export class MinusPlusWidget extends UpdownWidget {
    @observable protected value: any;
    @observable protected hasFocus: boolean;

    protected isValidKey(key:number):boolean {
        if (keys.find(v => v===key) !== undefined) return false;
        return super.isValidKey(key);
    }

    protected onBlur() {
        super.onBlur();
        this.hasFocus = false;
    }

    protected onFocus() {
        super.onFocus();
        this.hasFocus = true;
    }

    private minusClick = () => {
        let v = this.getValue();
        if (!v) v = 0;
        this.setValue(v - 1);
    }
    private plusClick = () => {
        let v = this.getValue();
        if (!v) v = 0;
        this.setValue(v + 1);
    }

    private renderContent = observer(():JSX.Element => {
        let renderTemplet = this.renderTemplet();
        if (renderTemplet !== undefined) return renderTemplet;
        let cn = {
            //'form-control': true,
        };
        if (this.hasError === true) {
            cn['is-invalid'] = true;
        }
        else {
            cn['required-item'] = this.itemSchema.required === true;
        }
        let hasFocus = this.hasFocus; // document.hasFocus() && document.activeElement === this.input;
        let hasAction = this.readOnly !== true && this.disabled !== true;
        let hasValue = this.value !== NaN && this.value !== undefined && this.value > 0;
        let minus = <i className={classNames('fa', 
                    'fa-minus-circle', 'fa-lg', 'text-danger', 'cursor-pointer', 
                    {invisible: !(hasFocus === true || hasAction === true && hasValue === true)})}
                onClick={this.minusClick} />;
        let input = <input ref={input=>this.input = input}
            className={classNames(this.className, cn, 'mx-1 w-4c form-control',
                {invisible: !(hasFocus === true || hasValue === true)})}
            type="text"
            defaultValue={this.value} 
            onChange={this.onInputChange}
            placeholder={this.placeholder}
            readOnly={this.readOnly}
            disabled={this.disabled}
            onKeyDown = {this.onKeyDown}
            onFocus = {()=>this.onFocus()}
            onBlur={()=>this.onBlur()}
            maxLength={10} />;

        let plus = <i className={classNames('fa fa-plus-circle fa-lg text-danger cursor-pointer',
            {invisible: !(hasAction === true)})}
            onClick={this.plusClick} />;
        return <div className="d-flex align-items-center">{minus}{input}{plus}
            {this.renderErrors()}
        </div>;
    });

    render() {
        return <this.renderContent />;
    }
}
