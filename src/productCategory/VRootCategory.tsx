import * as React from 'react';
import { View } from 'tonva';
import { CProductCategory } from './CProductCategory';
import { consts } from '../home/consts';
import { FA } from 'tonva';

const imgStyle: React.CSSProperties = {
    height: '1.5rem', width: '1.5rem',
    marginLeft: '0.1rem',
    marginRight: '0.3rem'
}

export const titleTitle: React.CSSProperties = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}

export const subStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}

export class VRootCategory extends View<CProductCategory> {

    private categoryClick = async (categoryWapper: any, parent: any) => {
        await this.controller.openMainPage(categoryWapper, parent);
    }

    private renderRootCategory = (item: any, parent: any) => {
        let { name, children, total } = item;
        return <div className="bg-white mb-3" key={name}>
            <div className="py-2 px-3 cursor-pointer" onClick={() => this.categoryClick(item, undefined)}>
                <b>{name}</b>
            </div>
            <div className=""
                style={{ paddingRight: '1px' }}
            >
                <div className="row no-gutters">
                    {children.map(v => this.renderSubCategory(v, item))}
                </div>
            </div>
        </div>
    }

    private renderSubCategory = (item: any, parent: any) => {
        let { name, children, total } = item;
        return <div key={name}
            className="col-6 col-md-4 col-lg-3 cursor-pointer"
            //style={{borderRight:'1px solid gray', borderBottom:'1px solid gray'}}
            onClick={() => this.categoryClick(item, parent)}>
            <div className="py-3 px-2"
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <div style={titleTitle}>
                    <span className="ml-1 align-middle">
                        <FA name="chevron-circle-right" className="text-info" />
                        &nbsp; {name}
                    </span>
                </div>
                {renderThirdCategory(children, total)}
            </div>
        </div>;
        // <img src={consts.appIcon} alt="structure" style={imgStyle} />
    }

    render(param: any): JSX.Element {
        let { categories } = this.controller;
        return <>{categories.map(v => this.renderRootCategory(v, undefined))}</>;
    }
}


export function renderThirdCategory(items: any, total: number) {
    return <div className="py-2 px-1 text-muted small" style={subStyle}>
        {items.length === 0 ? <>该类产品数量: {total > 1000 ? '>1000' : total}</> : items.map(v => v.name).join(' / ')}
    </div>
}