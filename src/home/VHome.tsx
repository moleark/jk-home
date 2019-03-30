import * as React from 'react';
import { VPage, Page, View } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CHome } from './CHome';
import { observable } from 'mobx';

const LIGUOSHENG = 5;

export class VHome extends View<CHome> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    private renderSection = (item: any, index: number) => {
        return <section>
            <h4>{item.title}<small className="text-muted">{item.subtitle}</small></h4>
            <p>{item.content}</p>
        </section>
    }

    render(param: any): JSX.Element {
        return <this.content />
    }

    private page = observer(() => {
        let { openMetaView } = this.controller;
        let viewMetaButton = <></>;
        if (this.controller.isLogined && this.controller.user.id === LIGUOSHENG) {
            viewMetaButton = <button type="button" className="btn w-100" onClick={openMetaView}>view</button>
        }

        return <Page header={false} footer={viewMetaButton}>
            <this.content />
        </Page>;
    })

    private content = observer(() => {
        let siteHeader = this.controller.renderSiteHeader();
        return <>
            {siteHeader}
            {this.controller.renderCategoryRootList()}
        </>
    });
}