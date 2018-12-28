import * as React from 'react';
import { TabCaptionComponent } from 'tonva-tools';
import { observable } from 'mobx';
import { homeTab } from './home';
import { cartTab } from 'cart';

export const store = {
    homeCount: observable.box<number>(-1),
    cartCount: observable.box<number>(101),
};

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
export const faceTabs = [
    { name: 'home', label: '首页', icon: 'home', content: homeTab, notify: store.homeCount },
    { name: 'cart', label: '购物车', icon: 'shopping-cart', content: cartTab, notify: store.cartCount },
].map(v => {
    let { name, label, icon, content, notify } = v;
    return {
        name: name,
        caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
        content: content,
        notify: notify,
    }
});