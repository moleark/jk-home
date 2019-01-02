import * as React from 'react';
import Loadable from 'react-loadable';
import { Loading } from 'tonva-tools';

export const memberTab = () => {
    let LoadableComponent = Loadable({
        loader: () => import('../home/CCartApp'),
        loading: Loading,
        render(loaded, props) {
            let { cCartApp } = loaded;
            cCartApp.cMember.start();
            return <cCartApp.cMember.render />
        }
    });
    return <LoadableComponent />;
}