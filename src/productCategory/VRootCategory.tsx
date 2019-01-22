import * as React from 'react';
import { View } from 'tonva-tools';
import { CProductCategory } from './CProductCategory';

const imgStyle: React.CSSProperties = {
    height: "1.5rem", width: "1.5rem", opacity: 0.1,
    marginRight: "0.3rem"
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
        return <div className="bg-white mb-3 pb-1" key={name}>
            <div className="py-2 px-3 cursor-pointer" onClick={() => this.categoryClick(item)}>
                <b>{name}</b>
            </div>
            <div className="" 
                //style={{paddingLeft:'1px', paddingRight:'1px'}}
                >
                <div className="row no-gutters">
                    {children.map(v => this.renderSubCategory(v))}
                </div>
            </div>
        </div>
    }

    private renderSubCategory = (item: any) => {
        let { name, children } = item;
        return <div key={name}
            className="col-6 col-md-4 col-lg-3 cursor-pointer"
            //style={{borderRight:'1px solid gray', borderBottom:'1px solid gray'}}
            onClick={() => this.categoryClick(item)}>
            <div className="pt-1 pb-1 px-2 my-1 border" 
                style={{borderColor:'#fcfcfc'}}
                >
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
            {items.length===0? <>&nbsp;</>:items.map(v => v.name).join(' / ')}
        </div>
    }

    render(param: any): JSX.Element {
        let { rootCategories } = this.controller;
        return <>{rootCategories.map(v => this.renderRootCategory(v))}</>;
    }
}
