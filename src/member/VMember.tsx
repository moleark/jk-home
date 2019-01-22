import * as React from 'react';
import { VPage } from 'tonva-tools';
import { CMember } from './CMember';
import { LMR, Muted, FA, Media } from 'tonva-react-form';

export class VMember extends VPage<CMember> {

    async showEntry(param: any) {

    }

    render(member: any): JSX.Element {

        return <this.content />;
    }

    private content = () => {
        let { cApp, member, pointMap } = this.controller;
        let { currentUser } = cApp;
        let { point } = pointMap;

        let im = <img src={currentUser.icon} alt="头像"></img>
        let pointTitle = <p className="h4">我的积分</p>
        let pointDetail = <p className="small align-self-end">查看详情 <FA name="angle-right"></FA></p>
        let pointThisWeek = <><p className="h5 mb-0">0</p><Muted>本周</Muted></>
        let pointAll = <><p className="h5 mb-0">{point}</p><Muted>累计</Muted></>
        let fansTitle = <p className="h4">我的粉丝</p>
        let fansDetail = <p className="small align-self-end">查看详情 <FA name="angle-right"></FA></p>
        return <div>
            <LMR className="shadow bg-white rounded p-3 mb-1" left={im}>
                <div>
                    <div>{currentUser.name}</div>
                    <div>邀请码:{member.recommendationCode}</div>
                </div>
            </LMR>
            <div className="shadow bg-white rounded p-3 mb-1">
                <LMR left={pointTitle} right={pointDetail}></LMR>
                <LMR className="pb-2">
                    <p className="h4 mb-0">0</p>
                    <Muted>今日</Muted>
                </LMR>
                <LMR left={pointThisWeek} right={pointAll} />
            </div>
            <div className="shadow bg-white rounded p-3 mb-1">
                <LMR left={fansTitle} right={fansDetail}></LMR>
                <LMR className="pb-2">
                    <p className="h4 mb-0">0</p>
                    <Muted>今日</Muted>
                </LMR>
                <LMR left={pointThisWeek} right={pointAll} />
            </div>
        </div>
    }
}