import * as React from 'react';
//import {Media, PropGrid, Prop, FA, IconText, TonvaForm, FormRow, SubmitResult, Fields} from 'tonva-react-form';
import {nav, User, Page} from 'tonva-tools';
import {Prop, Media, IconText, FA, PropGrid} from 'tonva-react-form';
//import {store} from 'store';
import { consts } from '../home/consts';
//import mainApi from 'mainApi';
import {About} from './about';
import ChangePasswordPage from './changePassword';

class Me extends React.Component {
    private exit() {
        if (confirm('退出当前账号不会删除任何历史数据，下次登录依然可以使用本账号')) {
            nav.logout();
        }
    }

    private about = () => nav.push(<About />);

    private changePassword = () => {
        nav.push(<ChangePasswordPage />);
    }
    render() {
        const {user} = nav;
        let aboutRows:Prop[] = [
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info" icon="envelope" text="关于百灵威" />,
                onClick: this.about
            },
            '',
        ];

        let logOutRows:Prop[] = [
            '',
            {
                type: 'component',
                bk: '',
                component: <button className="btn btn-danger w-100" onClick={this.exit}>
                    <FA name="sign-out" size="lg" /> 退出登录
                </button>
            },
        ];
        let rows:Prop[];
        if (user === undefined) {
            rows = aboutRows;
            rows.push('');
            rows.push(
                {
                    type: 'component',
                    component: <button className="btn btn-success w-100" onClick={() => nav.showLogin(true)}>
                        <FA name="sign-out" size="lg" /> 请登录
                    </button>
                },
            );
        }
        else {
            rows = [
                '',
                {
                    type: 'component',
                    component: <Media icon={consts.appIcon} main={user.name} discription={String(user.id)} />
                },
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info" icon="envelope" text="修改密码" />,
                    onClick: this.changePassword
                },
            ]
            rows.push(...aboutRows, ...logOutRows);
        }
        return <PropGrid rows={rows} values={{}} />;
    }
}

export default Me;