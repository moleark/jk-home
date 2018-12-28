import * as React from 'react';
import Loadable from 'react-loadable';
import { Loading } from 'tonva-tools';

export const homeTab = () => {
    let LoadableComponent = Loadable.Map({
        loader: {
            a: () => import('./CCartApp'),
        },
        loading: Loading,
        render(loaded, props) {
            let { cCartApp } = loaded.a;
            return <div>{cCartApp.cHome.renderHome()}</div>
        }
    });
    return <LoadableComponent />;
}