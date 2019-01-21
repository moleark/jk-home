import * as React from 'react';
import { VPage, Page, View } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CHome } from './CHome';

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

    private cats:Cat[] = [
        {
            caption: '生命科学',
            items: [
                {title: '常用生化试剂', sub: ['C-C键的生成', 'C-X键的生成','胺化反应','C-C键的生成', 'C-X键的生成','胺化反应'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
            ]
        },
        {
            caption: '分析化学',
            items: [
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
            ]
        },
        {
            caption: '有机化学',
            items: [
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
            ]
        },
        {
            caption: '材料科学',
            items: [
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
            ]
        },
        {
            caption: '仪器耗材',
            items: [
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
                {title: 'bbb', sub: ['bb-d'], img: undefined},
            ]
        },
    ];

    private renderSub(sub:string[]):JSX.Element {
        /*
        let s1:any, s2:any, ellipsis:any;
        let len = sub.length;
        if (len>0) {
            s1 = <div style={subStyle}>{sub[0]}</div>;
        }
        if (len>1) {
            if (len>2) ellipsis = <> &nbsp; ...</>;
            s2 = <div style={subStyle}>{sub[1]} {ellipsis}</div>;
        }
        return <>{s1} {s2}</>;
        */
        return <div className="py-2 text-muted small" style={subStyle}>{sub.join(' / ')}</div>;
    }

    private renderCatItem(catItem: CatItem, index:number):JSX.Element {
        let {title, sub, img} = catItem;
        //return <div key={index} className="bg-white px-2 py-2" style={catItemStyle}>
        return <div key={index} className="col-6 col-md-4 col-lg-3">
            <div className="py-3">
                <div>
                    <img src='favicon.ico' style={imgStyle} />
                    <span className="align-middle">{title}</span>
                </div>
                {this.renderSub(sub)}
            </div>
        </div>;
    }

    private renderCat(cat: Cat, index:number):JSX.Element {
        let {caption, items} = cat;
        return <div key={index} className="bg-white mb-3">
            <div className="border-bottom py-3 px-3" style={{borderColor: '#f0f0f0'}}><b>{caption}</b></div>
            <div className="px-3">
                <div className="row">
                    {items.map((v, index) => this.renderCatItem(v, index))}
                </div>
            </div>
        </div>;
        /*
            <div className="d-flex flex-wrap px-1 py-2">
            {items.map((v, index) => this.renderCatItem(v, index))}
        </div>*/
    // <div className="px-2 py-2 text-primary">更多...</div>
    }

    private content = () => {
        let siteHeader = this.controller.renderSiteHeader();
        return <>
            {siteHeader}
            {this.controller.renderCategoryRootList()}
        </>
            //{this.cats.map((v, index) => this.renderCat(v, index))}
            //{this.controller.renderSearchHeader()}
    }
}