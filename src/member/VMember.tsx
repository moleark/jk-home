import * as React from 'react';
import { VPage } from 'tonva-tools';
import { CMember } from './CMember';

export class VMember extends VPage<CMember> {

    async showEntry(param: any) {

    }

    render(param: any): JSX.Element {

        return this.content();
    }

    private content = () => {
        return <div>Member</div>
    }
}