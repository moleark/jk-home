import * as React from 'react';
import { Controller, Loading } from 'tonva-tools';
import { VMember } from './VMember';
import { CCartApp } from 'home/CCartApp';
import { Book } from 'tonva-react-usql';
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
        this.member = await memberTuid.load(this.user.id);

        let pointBook: Book = this.cApp.cUsqMember.book('point');
        // let point = await pointBook.obj({ member: this.member.id });
        this.member.point = 100;
    }

    renderMember = () => {
        return this.renderView(VMember);
    }

    render = observer(() => {
        return this.member === undefined ? <Loading /> : this.renderMember();
    })
}