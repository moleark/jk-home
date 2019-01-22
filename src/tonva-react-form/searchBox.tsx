import * as React from 'react';
import * as classNames from 'classnames';

export interface SearchBoxProps {
    className?: string;
    label?: string;
    initKey?: string;
    placeholder?: string;
    buttonText?: string;
    maxLength?: number;
    size?: 'sm' | 'md' | 'lg';
    onSearch: (key:string)=>Promise<void>;
}

export interface SearchBoxState {
    disabled: boolean;
}

export class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
    private input: HTMLInputElement;
    private key: string;

    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
        }
    }
    onChange = (evt: React.ChangeEvent<any>) => {
        this.key = evt.target.value;
        if (this.key !== undefined) {
            this.key = this.key.trim();
        }
        this.setState({disabled: !this.key});
    }
    ref = (input: HTMLInputElement) => {
        this.input = input;
        this.key = this.props.initKey || '';
        if (input === null) return;
        input.value = this.key;
    }
    onSubmit = async (evt: React.FormEvent<any>) => {
        evt.preventDefault();
        if (!this.key) return;
        if (this.input) this.input.disabled = true;
        await this.props.onSearch(this.key);
        if (this.input) this.input.disabled = false;
    }
    render() {
        let {className, label, placeholder, buttonText, maxLength, size} = this.props;
        let inputSize;
        switch (size) {
            default:
            case 'sm': inputSize = 'input-group-sm'; break;
            case 'md': inputSize = 'input-group-md'; break;
            case 'lg': inputSize = 'input-group-lg'; break;
        }
        let lab;
        if (label !== undefined) lab = <label className="input-group-addon">{label}</label>;
        return <form className={className} onSubmit={this.onSubmit} >
            <div className={classNames("input-group", inputSize)}>
                {lab}
                <input onChange={this.onChange} 
                    type="text" 
                    name="key"
                    ref={this.ref}
                    className="form-control" 
                    placeholder={placeholder}
                    maxLength={maxLength} />
                <div className="input-group-append">
                    <button className="btn btn-primary"
                        type="submit"
                        disabled={this.state.disabled}>
                        <i className='fa fa-search' />
                        <i className="fa"/>
                        {buttonText}
                    </button>
                </div>
            </div>
        </form>;
    }
}
