import * as React from 'react';
import { VPage, Page, nav } from 'tonva-tools';
import { List } from 'tonva-react-form';
import { CHome, Dir, News } from './cHome';
import { VDir } from './vDir';
import { VUser } from './vUser';

const sectionClass = "my-3 p-3 bg-white";

export class VHome extends VPage<CHome> {

    async showEntry(param?: any) {
        this.openPage(this.page);
    }

    private renderNews = (item: News, index: number) => {
        return <div className="mx-3 my-2">{item.Title}</div>;
    }

    private page = () => {
        let { dirs, newsItems } = this.controller;
        let vDir = new VDir(this.controller);
        return <Page header={false}>
            <div className="row">
                <div className="col-sm-12">
                    <input type="input" placeholder="search" className="w-100"></input>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-11 col-lg-12">
                    logo
                </div>
                <div className="col-sm-1 col-lg-2">
                    {vDir.render()}
                </div>
                <div className="col-sm-12 col-lg-6">
                    <div className="jumbotron">
                        <img alt="" />
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <List items={newsItems} item={{ render: this.renderNews }} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-4">
                    {this.renderVm(VUser)}
                </div>
            </div>
        </Page>;
    }
}