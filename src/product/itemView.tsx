import * as React from 'react';
import { VMSub, VMMain, VMProductChemical, VmProductChemicalInventory, VMSubInventory } from './item';

export class ViewMain<T extends VMMain<S>, S extends VMSub> {
    protected main: T
    constructor(main: T) {
        this.main = main;
    }

    protected renderCaption():JSX.Element {
        return <div>name</div>;
    }

    protected renderProps():JSX.Element[] {
        return [
            <div key="prop1">prop1</div>,
            <div key="prop2">prop2</div>,
            <div key="prop3">prop3</div>,
        ];
    }

    protected renderSub(sub: S):JSX.Element {
        return <div key={sub.pack.id}>row</div>;
    }

    protected renderSubs():JSX.Element[] {
        return this.main.subs.map(v => this.renderSub(v));
    }

    render():JSX.Element {
        return <div>
            {this.renderCaption()}
            {this.renderProps()}
            {this.renderSubs()}
        </div>
    }
}

export class ViewProduct extends ViewMain<VMProductChemical, VMSub> {
    /*
    render():JSX.Element {
        return <></>;
    }
    */
}

export class ViewProductOrdering extends ViewMain<VmProductChemicalInventory, VMSubInventory> {
    render():JSX.Element {
        return super.render();
    }
}

export class ViewCartRow extends ViewMain<VMProductChemical, VMSub> {

}
