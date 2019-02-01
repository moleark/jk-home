import * as React from 'react';
import { VPage, Page, View } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CHome } from './CHome';
import { observable } from 'mobx';

const LIGUOSHENG = 5;

interface CatItem {
    title: string;
    sub: string[];
    img: string;
}

interface Cat {
    caption: string;
    items?: CatItem[];
}

const catItemStyle:React.CSSProperties = {
    width:'12rem', 
    //height: '6rem', 
    overflow: 'hidden', 
};
const subStyle:React.CSSProperties = {
    fontSize:'0.75rem',
    overflow: 'hidden', 
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
};
const imgStyle:React.CSSProperties = {
    //float:'left', clear:'both', 
    height:'1.5rem', width:'1.5rem', opacity:0.1, 
    marginRight: '0.5rem',
};

export class VHome extends View<CHome> {

    async showEntry(param?: any) {
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