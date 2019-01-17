import * as React from 'react';
import { View } from 'tonva-tools';
import { CProductCategory } from './CProductCategory';
import { List, LMR } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv, BoxId } from 'tonva-react-usql';

export class VRootCategory extends View<CProductCategory> {

    private categoryClick = async (categoryWapper: any) => {

        await this.controller.openMainPage(categoryWapper);
    }

    private onRootCategoryRender = (item: any, index: number) => {
        let { productCategory, name, children } = item;
        let left = <div className="h4">{name}</div>;
        return <div className="row bg-light py-2">
            <div className="col-12">
                <LMR left={left} right="更多..." className="px-3 cursor-pointer" onClick={() => this.categoryClick(item)} />
            </div>
            <div className="col-12">
                <div className="row mx-3 cussor-pointer">
                    {children && children.map((childrenWapper: any) => {
                        return <div className="col-12 col-md-4 py-2" onClick={() => this.categoryClick(childrenWapper)}>
                            {childrenWapper.name}
                            <hr className="my-1"/>
                        </div>
                    })}
                </div>
            </div>
        </div>
    }

    render(param: any): JSX.Element {
        let { rootCategories } = this.controller;
        return <List items={rootCategories} item={{ render: this.onRootCategoryRender }} className="mx-1" />
    }
}
