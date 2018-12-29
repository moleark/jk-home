import * as React from 'react';
import Loadable from 'react-loadable';
import { Loading } from 'tonva-tools';

export const memberTab = () => {
    let LoadableComponent = Loadable.Map({
        loader: {
            a: () => import('../home/CCartApp'),
        },
        loading: Loading,
        render(loaded, props) {
            let { cCartApp } = loaded.a;
            return <div>{cCartApp.cMember.renderMember()}</div>
        }
    });
    return <LoadableComponent />;
}
