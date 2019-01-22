import * as React from 'react';
import Loadable from 'react-loadable';
import { Controller, Loading } from 'tonva-tools';
import { VMember } from './VMember';
import { CCartApp } from 'CCartApp';
import { Query } from 'tonva-react-usql';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export class CMember extends Controller {

    cApp: CCartApp;
    @observable member: any;
    pointMap: any;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
    }

    protected async internalStart(param: any) {

        let memberMap = this.cApp.cUsqMember.map('member');
        if (this.isLogined) {
            let getPointQuery: Query = this.cApp.cUsqMember.query('getPoint');
            this.pointMap = await getPointQuery.obj({ memberId: this.cApp.currentUser.id });
            this.member = await memberMap.table(this.cApp.currentUser.id);
        }
    }

    renderMember = () => {
        return this.renderView(VMember);
    }

    render = observer(() => {
        return this.member === undefined ? <Loading /> : this.renderMember();
    })

    tab = () => {
        this.start();
        return <this.render />;
    }

    /*{
        let LoadableComponent = Loadable({
            loader: () => import('../CCartApp'),
            loading: Loading,
            render(loaded, props) {
                let { cCartApp } = loaded;
                cCartApp.cMember.start();
                return <cCartApp.cMember.render />
            }
        });
        return <LoadableComponent />;
    }*/
}
