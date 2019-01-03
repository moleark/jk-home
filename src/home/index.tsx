import * as React from 'react';
import Loadable from 'react-loadable';
import { Loading } from 'tonva-tools';
import { cCartApp } from './CCartApp';

/*
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
*/
export function homeTab() {
    return <>{cCartApp.cHome.renderHome()}</>;
}
/*
export class homeTab extends React.Component {
    render() {
        return <>{cCartApp.cHome.renderHome()}</>;
    }
}
*/