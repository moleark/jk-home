import * as React from 'react';
import { Controller, Page, nav } from 'tonva-tools';
import { VHome } from './vHome';
import { HttpChannel } from 'tonva-tools/dist/net/httpChannel';

export interface Dir {
    caption: string;
}

export interface News {
    Id: Number;
    Title: string;
}

export class CHome extends Controller {

    private httpChannel = new HttpChannel(false, "http://localhost:11887/webapi", "");
    dirs: Dir[] = [
        { caption: '首页' },
        { caption: '百灵威简介' },
        { caption: '产品搜索' },
        { caption: '产品目录' },
        { caption: 'CAS索引' },
        { caption: '官能团索引' },
        { caption: '产品名称索引' },
        { caption: '元素分类索引' },
        { caption: '分析方法索引' },
    ];
    newsItems: News[];

    protected async internalStart(param: any) {
        this.newsItems = [
            { Id: 1, Title: 'a' },
            { Id: 2, Title: 'bbb' },
            { Id: 3, Title: 'a]c\\' },
            { Id: 4, Title: 'eee' },
        ]

        try {
        var document = [
            { Id: 1, Title: 'a' },
            { Id: 2, Title: 'bbb' },
            { Id: 3, Title: 'a]c\\' },
            { Id: 4, Title: 'eee' },
        ]; //  await this.httpChannel.get("/Document/GetHisotoryNews?page=0");
        console.log(document);
        this.newsItems = document;//.Documents;
        }
        catch (err) {
            console.error(err);
        }
        this.showVPage(VHome);
    }

    showDir(dir: Dir) {
        nav.push(<Page>{dir.caption}</Page>);
    }
}