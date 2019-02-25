import * as React from 'react';
import { MainProduct, SubPack } from './model';

export type Render<T> = (model:T) => JSX.Element;

export function renderMainProduct(model: MainProduct):JSX.Element {
    let {product} = model;
    return <div>
        {product.discription}
    </div>
}

export function renderSubPack(model: SubPack):JSX.Element {
    let {pack, vipPrice, price, quantity, amount} = model;
    return <div>
        {pack.name}, {vipPrice}, {price}, {quantity}, {amount}
    </div>
}
