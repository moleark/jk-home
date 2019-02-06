import * as React from 'react';
import Loadable from 'react-loadable';
import { Loading } from 'tonva-tools';
export var meTab = function () {
    var LoadableComponent = Loadable({
        loader: function () { return import('./tab'); },
        loading: Loading
    });
    return React.createElement(LoadableComponent, null);
};
//# sourceMappingURL=index.js.map