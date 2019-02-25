import * as React from 'react';
import { ViewBase } from './viewBase';

export interface MainSubs<M, S> {
    main: M;
    subs: S[];
}

export class ViewMainSubs<M, S> extends ViewBase<MainSubs<M, S>> {
    protected main: new () => ViewBase<M>;
    protected sub: new () => ViewBase<S>;
    constructor(main: new () => ViewBase<M>, sub: new () => ViewBase<S>)
    {
        super();
        this.main = main;
        this.sub = sub;
    }
    protected subsContainer(subViews: JSX.Element[]):JSX.Element {
        return <div>{subViews}</div>
    }

    protected renderSubs():JSX.Element[] {
        let {subs} = this.model;
        let subViews:JSX.Element[] = subs && subs.map((v, index) => {
            let viewSub = new this.sub();
            viewSub.model = v;
            return <React.Fragment key={index}>{viewSub.render()}</React.Fragment>;
        });
        return subViews;
    }

    render():JSX.Element {
        let {main} = this.model;
        let viewMain = new this.main();
        viewMain.model = main;
        return <>
            {viewMain.render()}
            {this.subsContainer(this.renderSubs())}
        </>;
    }
}

export class ViewListMainSubs<M, S> extends ViewBase<MainSubs<M, S>[]> {
    private row: new (main: new () => ViewBase<M>, sub: new () => ViewBase<S>) => ViewMainSubs<M, S>;
    private main: new () => ViewBase<M>;
    private sub: new () => ViewBase<S>;
    constructor(
        row: new (main: new () => ViewBase<M>, sub: new () => ViewBase<S>) => ViewMainSubs<M, S>, 
        main: new () => ViewBase<M>,
        sub: new () => ViewBase<S>) 
    {
        super();
        this.row = row;
        this.main = main;
        this.sub = sub;
    }
    render():JSX.Element {
        return <>
            {this.model.map((v, index) => {
                let view = new this.row(this.main, this.sub);
                view.model = v;
                return <React.Fragment key={index}>{view.render()}</React.Fragment>;
            })}
        </>;
    }
}
