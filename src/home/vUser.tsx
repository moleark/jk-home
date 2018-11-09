import * as React from 'react';
import {observer} from 'mobx-react';
import { View, nav } from 'tonva-tools';
import { CHome } from './cHome';

export class VUser extends View<CHome> {
    private onLogin = () => nav.showLogin(true);
    private onLogout = () => nav.logout(true);

    render():JSX.Element {
        return React.createElement(this.view);
    };

    private view = observer(() => {
        let {user} = nav;
        if (user === undefined) {
            return <div>
                <button className="btn btn-sm btn-outline-info" onClick={this.onLogin}>登录用户</button>
            </div>
        }
        return <div>
            {user.name} <button className="btn btn-sm btn-outline-info" onClick={this.onLogout}>安全登出</button>
        </div>;
    });
}