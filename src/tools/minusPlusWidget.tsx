import * as React from 'react';
import classNames from 'classnames';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { UpdownWidget } from 'tonva-tools/ui/form/widgets';

const keys = [107, 109, 110, 187, 189];

export class MinusPlusWidget extends UpdownWidget {
    @observable protected value: any;
    @observable protected disabled:boolean;
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

    private ref = (input:HTMLInputElement) => {
        this.input = input;
        if (this.input === null) return;
        let p: HTMLElement;
        for (p = this.input; ; p = p.parentElement) {
            if (!p) break;
            if (p.tagName !== 'FIELDSET') continue;
            if (p['disabled'] === true) {
                this.disabled = true;
            }
            break;
        }
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
        let cursorPointer:string, 
            minusColor:string, minusClick:any, 
            plusColor:string, plusClick:any;
        if (this.disabled===true) {
            cursorPointer = 'cursor-pointer';
            minusColor = plusColor = 'text-light';
        }
        else {
            minusClick = this.minusClick;
            plusClick = this.plusClick;
            minusColor = 'text-black-50';
            plusColor = 'text-danger';
        }
        let minus = <i className={classNames('fa',
                    'fa-minus-circle', 'fa-lg', minusColor, cursorPointer,
                    {invisible: !(hasFocus === true || hasAction === true && hasValue === true)})}
                onClick={minusClick} />;
        let input = <input ref={this.ref}
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

        let plus = <i className={classNames('fa fa-plus-circle fa-lg',
            plusColor, cursorPointer,
            {invisible: !(hasAction === true)})}
            onClick={plusClick} />;
        return <div className="d-flex align-items-center">{minus}{input}{plus}
            {this.renderErrors()}
        </div>;
        /*
        return <div className="input-group w-6c">
            <div className="input-group-prepend">{minus}</div>
            {input}
            <div className="input-group-append">{plus}</div>
        </div>*/
    });

    render() {
        return <this.renderContent />;
    }
}
