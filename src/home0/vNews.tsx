import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CHome, News } from './cHome';
import { VDir } from './vDir';

export class VNews extends VPage<CHome> {

    async showEntry(news: News) {
        this.openPage(this.page, news);
    }
    private page = (news: News) => {

        return <Page>
            <div className="row">
                <div className="col-sm-2">
                    {this.renderVm(VDir)}
                </div>

                <div className="col-sm-10" dangerouslySetInnerHTML={{__html:(news as any).Content}} />
            </div>
        </Page>
    }
}