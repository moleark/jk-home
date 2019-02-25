import * as React from 'react';
import { ViewBase } from './viewBase';
import { MainProduct, SubPack } from './model';
import { ViewMainSubs, ViewListMainSubs } from './mainSubs';

export class ViewMainProduct extends ViewBase<MainProduct> {
    render() {
        return <div>
            {'mainproduct'}
        </div>
    }
}

export class ViewSubPack extends ViewBase<SubPack> {
    render() {
        return <div>
            subPack
        </div>
    }
}

let one = new ViewMainSubs<MainProduct, SubPack>(ViewMainProduct, ViewSubPack);
let list = new ViewListMainSubs<MainProduct, SubPack>(
    ViewMainSubs, 
    ViewMainProduct, 
    ViewSubPack);
