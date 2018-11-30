import * as React from 'react';
import { ControllerUsq, TuidMain, BoxId } from 'tonva-react-usql';
import { VContact } from './VContact';

export class CContact extends ControllerUsq {

    contactTuid: TuidMain;
    contact: BoxId;

    async internalStart(contactId: any) {

        this.contactTuid = this.cUsq.tuid("contact");
        if(contactId){
            this.contact = await this.contactTuid.load(contactId);
        }
        this.showVPage(VContact);
    }
}