import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
import { UiTextItem } from '../uiSchema';
import { StringSchema } from '../schema';

export class TextWidget extends Widget {
    protected inputType = 'text';
    protected ui: UiTextItem;
    protected input: HTMLInputElement;

    protected setElementValue(value:any) {
        if (this.input === null) return;
        this.input.value = value;
    }
    protected get placeholder() {return (this.ui && this.ui.placeholder) || this.name}
    protected onKeyDown: (evt:React.KeyboardEvent<HTMLInputElement>)=>void;

    protected onBlur() {
        this.checkRules();
        this.context.checkContextRules();
    }
    protected onFocus() {
        this.clearError();
        this.context.removeErrorWidget(this);
        this.context.removeErrors();
    }

    setReadOnly(value:boolean) {
        if (this.input === null) return;
        this.input.readOnly = this.readOnly = value;
    }
    setDisabled(value:boolean) {
        if (this.input === null) return;
        this.input.disabled = this.disabled = value;
    }

    render() {
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
        return <><input ref={input=>this.input = input}
            className={classNames(this.className, cn)}
            type={this.inputType}
            defaultValue={this.value}
            onChange={this.onInputChange}
            placeholder={this.placeholder}
            readOnly={this.readOnly}
            disabled={this.disabled}
            onKeyDown = {this.onKeyDown}
            onFocus = {()=>this.onFocus()}
            onBlur={()=>this.onBlur()}
            maxLength={(this.itemSchema as StringSchema).maxLength} />
            {this.renderErrors()}
        </>;
    }
}