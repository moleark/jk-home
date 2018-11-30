import * as React from 'react';
import { View } from 'tonva-tools';
import { CProductCategory } from './CProductCategory';
import { List, LMR } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv } from 'tonva-react-usql';

export class VRootCategory extends View<CProductCategory> {

    private catClick = async (cat: any) => {

        await this.controller.openMainPage(cat);
    }

    private onRootCategoryRender = (categoryBox: any, index: number) => {

        let { category, children } = categoryBox;
        let left = <div className="h4 text-danger cursor-pointer" onClick={() => this.catClick(categoryBox)}>{category.obj.name}</div>;
        return <div className="row bg-light py-2">
            <div className="col-12">
                <LMR left={left} right="更多..." className="px-3" />
            </div>
            <div className="col-12">
                <div className="row mx-3 text-success cussor-pointer">
                    {children && children.map((childrenWapper: any) => {
                        return <div className="col-12 col-md-4 py-2" onClick={() => this.catClick(childrenWapper)}>
                            {childrenWapper.category.obj.name}
                        </div>
                    })}
                </div>
            </div>
        </div>
        /*
        return <LMR left={left} right="更多..." className="bg-light px-3 py-2 align-items-end">
            <div className="d-none d-sm-flex flex-row mx-5">
                {children && children.map((childrenWapper: any) => {
                    return <div className="mx-3 text-success cussor-pointer" onClick={() => this.catClick(childrenWapper)}>{childrenWapper.category.obj.name}</div>
                })}
            </div>
        </LMR>
        */
    }

    render(param: any): JSX.Element {
        let { rootCategories } = this.controller;
        return <List items={rootCategories} item={{ render: this.onRootCategoryRender }} />
    }
}
