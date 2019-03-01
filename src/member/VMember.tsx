import * as React from 'react';
import { VPage } from 'tonva-tools';
import { CMember } from './CMember';
import { LMR, Muted, FA, Media } from 'tonva-react-form';

export class VMember extends VPage<CMember> {

    async open(param: any) {

    }

    render(member: any): JSX.Element {

        return <this.content />;
    }

    private content = () => {
        let { cApp, member } = this.controller;
        if (member === undefined)
            return <></>;
        let { currentUser } = cApp;
        let { recommendationCode, point } = member;

        let im = <img className="mr-3" src={currentUser.icon} alt="头像" 
            style={{width:'2.5rem', height:'2.5rem'}} />;
        let inviteCode = <div className="small">邀请码: {recommendationCode}</div>;

        let divPoints = <div className="my-3 p-4 text-center bg-white">
            <div>
                <small className="muted">积分: </small>
                <span className="text-danger" style={{fontSize:'2rem'}}>{point}</span>
            </div>
        </div>

        let pointTitle = <p className="h4">我的积分</p>
        let pointDetail = <p className="small align-self-end">查看详情 <FA name="angle-right"></FA></p>
        let pointThisWeek = <><p className="h5 mb-0">0</p><Muted>本周</Muted></>
        let pointAll = <><p className="h5 mb-0">{point}</p><Muted>累计</Muted></>
        let fansTitle = <p>我的粉丝</p>
        let fansDetail = <p className="small align-self-end">查看详情 <FA name="angle-right"></FA></p>
        return <div>
            <LMR className="bg-white p-3 mb-1 align-items-center"
                left={im} right={inviteCode}>
                <b>{currentUser.name}</b>
            </LMR>
            {divPoints}

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
/*
<div className="shadow bg-white rounded p-3 mb-1">
<LMR left={pointTitle} right={pointDetail}></LMR>
<LMR className="pb-2">
    <p className="h4 mb-0">0</p>
    <Muted>今日</Muted>
</LMR>
<LMR left={pointThisWeek} right={pointAll} />
</div>
*/