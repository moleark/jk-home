import * as React from 'react';
import { VPage, Page, View } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CCartApp } from './CCartApp';
import { List, SearchBox } from 'tonva-react-form';
import { CHome } from './CHome';

const LIGUOSHENG = 5;

export class VHome extends View<CHome> {

    async showEntry(param?: any) {

        // let { cHome } = this.controller;
        // let { homeSections } = cHome;
        // await homeSections.first({ key: "" });

        this.openPage(this.page);
    }

    private renderSection = (item: any, index: number) => {

        return <section>
            <h4>{item.title}<small className="text-muted">{item.subtitle}</small></h4>
            <p>{item.content}</p>
        </section>
    }

    render(param: any): JSX.Element {

        return this.content();
        // return this.page();
    }

    private page = observer(() => {

        /*
        let { cHome, cProductCategory } = this.controller;
        let siteHeader = cHome.renderSiteHeader();
        let rootCategoryList = cProductCategory.renderRootList();
        */

        let { openMetaView } = this.controller;
        let viewMetaButton = <></>;
        if (this.controller.isLogined && this.controller.user.id === LIGUOSHENG) {
            viewMetaButton = <button type="button" className="btn w-100" onClick={openMetaView}>view</button>
        }

        // let { homeSections } = cHome;
        return <Page header={false} footer={viewMetaButton}>
            {this.content()}
        </Page>;
    })

    private content = () => {

        let siteHeader = this.controller.renderSiteHeader();
        return <>{siteHeader}
            {this.controller.renderSearchHeader()}
            {this.controller.renderCategoryRootList()}
        </>
    }
}