import * as React from 'react';
import { View } from 'tonva-tools';
import { CProductCategory } from './CProductCategory';
import { List, LMR } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv, BoxId } from 'tonva-react-usql';

const imgStyle: React.CSSProperties = {
    height: "1.5rem", width: "1.5rem", opacity: 0.1,
    marginRight: "0.5rem"
}

const subStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}

export class VRootCategory extends View<CProductCategory> {

    private categoryClick = async (categoryWapper: any) => {

        await this.controller.openMainPage(categoryWapper);
    }

    private renderRootCategory = (item: any) => {
        let { productCategory, name, children } = item;
        return <div className="bg-white mb-3" key={name}>
            <div className="border-bottom py-3 px-3 cursor-pointer" onClick={() => this.categoryClick(item)}>
                <b>{name}</b>
            </div>
            <div className="px-3">
                <div className="row">
                    {children.map(v => this.renderSubCategory(v))}
                </div>
            </div>
        </div>
    }

    private renderSubCategory = (item: any) => {
        let { name, children } = item;
        return <div className="col-6 col-md-4 col-lg-3 cursor-pointer" onClick={() => this.categoryClick(item)} key={name}>
            <div className="py-3">
                <div>
                    <img src="favicon.ico" alt="structure" style={imgStyle} />
                    <span className="ml-1 align-middle">{name}</span>
                </div>
                {this.renderThirdCategory(children)}
            </div>
        </div>
    }

    private renderThirdCategory(items: any) {
        return <div className="py-2 text-muted small" style={subStyle}>
            {items.map(v => v.name).join(' / ')}
        </div>
    }

    render(param: any): JSX.Element {
        let { rootCategories } = this.controller;
        return <>{rootCategories.map(v => this.renderRootCategory(v))}</>;
    }
}
