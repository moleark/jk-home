import * as React from 'react';
import { Controller, Loading } from 'tonva-tools';
import { VMember } from './VMember';
import { CCartApp } from 'home/CCartApp';
import { Query } from 'tonva-react-usql';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export class CMember extends Controller {

    cApp: CCartApp;
    @observable member: any;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
    }

    protected async internalStart(param: any) {

        let memberTuid = this.cApp.cUsqMember.tuid('member');
        let member = await memberTuid.load(this.user.id);

        let getPointQuery: Query = this.cApp.cUsqMember.query('getPoint');
        let point = await getPointQuery.obj({ member: member.id });
        member.point = point === undefined ? 0 : point.point;

        this.member = member;
    }

    renderMember = () => {
        return this.renderView(VMember);
    }

    render = observer(() => {
        return this.member === undefined ? <Loading /> : this.renderMember();
    })
}