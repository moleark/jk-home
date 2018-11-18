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

    private onNewsClick = async (item: News) => {
        await this.controller.showNews(item);
    }

    private page = () => {

        let { dirs, newsItems } = this.controller;
        let vDir = new VDir(this.controller);

        return <Page header={false}>
            <div className="row">
                <div className="col-sm-12">
                    <form className="form-inline">
                        <label className="sr-only" htmlFor="searchBox">Search</label>
                        <div className="input-group mb-2 mr-sm-2">
                            <input type="input" id="searchBox" className="form-control" placeholder="search"></input>
                            <div className="input-group-prepend">
                                <button type="button" className="input-group-text">Search</button>
                            </div>
                        </div>
                    </form>
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
                            <List items={newsItems} item={{ render: this.renderNews, onClick: this.onNewsClick }} />
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