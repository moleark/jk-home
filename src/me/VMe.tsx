import * as React from 'react';
import { nav, User, Page, Image, VPage } from 'tonva-tools';
import { Prop, Media, IconText, FA, PropGrid, LMR } from 'tonva-react-form';
import { About } from './about';
import { observer } from 'mobx-react';
import { EditMeInfo } from './EditMeInfo';
import { CMe } from './CMe';

export class VMe extends VPage<CMe> {

    async open(param?: any) {

    }

    private exit() {
        nav.showLogout();
        /*
        if (confirm('退出当前账号不会删除任何历史数据，下次登录依然可以使用本账号')) {
            nav.logout();
        }
        */
    }

    private about = () => nav.push(<About />);

    private changePassword = async () => {
        await nav.changePassword();
        // nav.push(<ChangePasswordPage />);
    }

    private meInfo = observer(() => {
        let { user } = nav;
        if (user === undefined) return null;
        let { id, name, nick, icon } = user;
        return <LMR className="py-2 cursor-pointer w-100"
            left={<Image className="w-3c h-3c mr-3" src={icon} />}
            right={<FA className="align-self-end" name="chevron-right" />}
            onClick={() => {
                this.openVPage(EditMeInfo);
            }}>
            <div>
                <div>{userSpan(name, nick)}</div>
                <div className="small"><span className="text-muted">ID:</span> {id > 10000 ? id : String(id + 10000).substr(1)}</div>
            </div>
        </LMR>;
    });

    private orderStates = () => {

        let { openMyOrders } = this.controller;
        return <div className="d-flex justify-content-around w-100 my-3">
            <div className="d-flex flex-column align-items-center" onClick={openMyOrders}>
                <FA name="file-text-o" className="text-info fa-2x" />
                <small>待付款</small>
            </div>
            <div className="d-flex flex-column align-items-center" onClick={openMyOrders}>
                <FA name="file-text-o" className="text-info fa-2x" />
                <small>待收货</small>
            </div>
            <div className="d-flex flex-column align-items-center" onClick={openMyOrders}>
                <FA name="file-text-o" className="text-info fa-2x" />
                <small>所有订单</small>
            </div>
        </div>
    }

    render() {
        const { user } = nav;
        let aboutRows: Prop[] = [
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="smile-o" text="关于百灵威" />,
                onClick: this.about
            },
            '',
        ];

        let rows: Prop[];
        if (user === undefined) {
            rows = aboutRows;
            rows.push('');
            rows.push(
                {
                    type: 'component',
                    component: <button className="btn btn-success w-100" onClick={() => nav.showLogin(undefined, true)}>
                        <FA name="sign-out" size="lg" /> 请登录
                    </button>
                },
            );
        }
        else {
            let logOutRows: Prop[] = [
                '',
                {
                    type: 'component',
                    bk: '',
                    component: <button className="btn btn-danger w-100" onClick={this.exit}>
                        <FA name="sign-out" size="lg" /> 退出登录
                </button>
                },
            ];

            rows = [
                '',
                {
                    type: 'component',
                    component: <this.meInfo />
                },
                '',
                {
                    type: 'component',
                    component: <this.orderStates />,
                },
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="key" text="修改密码" />,
                    onClick: this.changePassword
                },
            ]
            rows.push(...aboutRows, ...logOutRows);
        }
        return <PropGrid rows={rows} values={{}} />;
    }
}


function userSpan(name: string, nick: string): JSX.Element {
    return nick ?
        <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
        : <b>{name}</b>
}
