import * as React from 'react';
import _ from 'lodash';
import { Page, loadAppUsqs, nav, meInFrame, Controller, TypeVPage, VPage, resLang} from 'tonva-tools';
import { List, LMR, FA } from 'tonva-react-form';
import { CUsq, EntityType, UsqUI } from './usq';
import { centerApi } from '../centerApi';

export interface AppUI {
    CApp?: typeof CApp;
    CUsq?: typeof CUsq;
    main?: TypeVPage<CApp>;
    usqs: {[usq:string]: UsqUI};
    res?: any;
}

export class CApp extends Controller {
    private appOwner:string;
    private appName:string;
    private isProduction:boolean;
    private cImportUsqs: {[usq:string]: CUsq} = {};
    protected ui:AppUI;
    id: number;
    appUnits:any[];

    constructor(tonvaApp:string, ui?:AppUI) {
        super(resLang(ui && ui.res));
        let parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.ui = ui || {usqs:{}};
        this.caption = this.res.caption || 'Tonva';
    }
    
    readonly caption: string; // = 'View Model 版的 Usql App';    
    cUsqCollection: {[usq:string]: CUsq} = {};

    async startDebug() {
        let appName = this.appOwner + '/' + this.appName;
        let cApp = new CApp(appName, {usqs:{}} );
        let keepNavBackButton = true;
        await cApp.start(keepNavBackButton);    
    }

    protected async loadUsqs(): Promise<string[]> {
        let retErrors:string[] = [];
        let unit = meInFrame.unit;
        let app = await loadAppUsqs(this.appOwner, this.appName);
        let {id, usqs} = app;
        this.id = id;
        for (let appUsq of usqs) {
            let {id:usqId, usqOwner, usqName, url, urlDebug, ws, access, token} = appUsq;
            let usq = usqOwner + '/' + usqName;
            let ui = this.ui && this.ui.usqs && this.ui.usqs[usq];
            let cUsq = this.newCUsq(usq, usqId, access, ui || {});
            let retError = await cUsq.loadSchema();
            if (retError !== undefined) {
                retErrors.push(retError);
                continue;
            }
            this.cUsqCollection[usq] = cUsq;
        }
        if (retErrors.length === 0) return;
        return retErrors;
    }

    async getImportUsq(usqOwner:string, usqName:string):Promise<CUsq> {
        let usq = usqOwner + '/' + usqName;
        let cUsq = this.cImportUsqs[usq];
        if (cUsq !== undefined) return cUsq;
        let ui = this.ui && this.ui.usqs && this.ui.usqs[usq];
        let usqId = -1; // unknown
        this.cImportUsqs[usq] = cUsq = this.newCUsq(usq, usqId, undefined, ui || {});
        let retError = await cUsq.loadSchema();
        if (retError !== undefined) {
            console.error(retError);
            debugger;
            return;
        }
        return cUsq;
    }

    protected newCUsq(usq:string, usqId:number, access:string, ui:any) {
        let cUsq = new (this.ui.CUsq || CUsq)(this, usq, this.id, usqId, access, ui);        
        Object.setPrototypeOf(cUsq.x, this.x);
        return cUsq;
    }

    get cUsqArr():CUsq[] {
        let ret:CUsq[] = [];
        for (let i in this.cUsqCollection) {
            ret.push(this.cUsqCollection[i]);
        }
        return ret;
    }

    getCUsq(apiName:string):CUsq {
        return this.cUsqCollection[apiName];
    }

    protected get VAppMain():TypeVPage<CApp> {return (this.ui&&this.ui.main) || VAppMain}

    protected async beforeStart():Promise<boolean> {
        if (await super.beforeStart() === false) return false;

        try {
            let hash = document.location.hash;
            if (hash.startsWith('#tvdebug')) {
                this.isProduction = false;
                //await this.showMainPage();
                //return;
            }
            else {
                this.isProduction = hash.startsWith('#tv');
            }
            let {unit} = meInFrame;
            if (this.isProduction === false && (unit===undefined || unit<=0)) {
                let app = await loadAppUsqs(this.appOwner, this.appName);
                let {id} = app;
                this.id = id;
                await this.loadAppUnits();
                switch (this.appUnits.length) {
                    case 0:
                        this.showUnsupport();
                        return false;
                    case 1:
                        unit = this.appUnits[0].id;
                        if (unit === undefined || unit < 0) {
                            this.showUnsupport();
                            return false;
                        }
                        meInFrame.unit = unit;
                        break;
                    default: 
                        //nav.clear();
                        nav.push(<this.selectUnitPage />)
                        return false;
                }
            }

            let retErrors = await this.loadUsqs();
            if (retErrors !== undefined) {
                this.openPage(<Page header="ERROR">
                    <div className="m-3">
                        <div>Load Usqs 发生错误：</div>
                        {retErrors.map((r, i) => <div key={i}>{r}</div>)}
                    </div>
                </Page>);
                return false;
            }
            return true;
        }
        catch (err) {
            nav.push(<Page header="App start error!">
                <pre>
                    {typeof err === 'string'? err : err.message}
                </pre>
            </Page>);
            return false;
        }
    }

    protected async internalStart(param:any) {
        if (param !== true) {
            this.clearPrevPages();
        }
        await this.showMainPage();
    }
    async load() {
        await this.beforeStart();
    }

    render(): JSX.Element {
        return this.renderView(this.VAppMain);
    }

    // 如果是独立app，删去显示app之前的页面。
    // 如果非独立app，则不删
    protected clearPrevPages() {
        nav.clear();
    }

    private showUnsupport() {
        this.clearPrevPages();
        this.openPage(<Page header="APP无法运行" logout={true}>
            <div className="m-3 text-danger container">
                <div className="form-group row">
                    <div className="col-2">
                        <FA name="exclamation-triangle" />
                    </div>
                    <div className="col">
                        用户不支持APP
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-2">用户: </div>
                    <div className="col">{`${nav.user.name}`}</div>
                </div>
                <div className="form-group row">
                    <div className="col-2">App:</div>
                    <div className="col">{`${this.appOwner}/${this.appName}`}</div>
                </div>
            </div>
        </Page>)
    }

    private async showMainPage() {
        // #tvRwPBwMef-23-sheet-api-108
        let parts = document.location.hash.split('-');
        if (parts.length > 2) {
            let action = parts[2];
            // sheet_debug 表示centerUrl是debug方式的
            if (action === 'sheet' || action === 'sheet_debug') {
                let usqId = Number(parts[3]);
                let sheetTypeId = Number(parts[4]);
                let sheetId = Number(parts[5]);
                let cUsq = this.getCUsqFromId(usqId);
                if (cUsq === undefined) {
                    alert('unknown usqId: ' + usqId);
                    return;
                }
                this.clearPrevPages();
                await cUsq.navSheet(sheetTypeId, sheetId);
                return;
            }
        }
        this.showVPage(this.VAppMain);
    }

    private getCUsqFromId(usqId:number): CUsq {
        for (let i in this.cUsqCollection) {
            let cUsq = this.cUsqCollection[i];
            if (cUsq.id === usqId) return cUsq;
        }
        return;
    }

    private async loadAppUnits() {
        let ret = await centerApi.userAppUnits(this.id);
        this.appUnits = ret;
        if (ret.length === 1) {
            meInFrame.unit = ret[0].id;
        }
    }

    renderRow = (item: any, index: number):JSX.Element => {
        let {id, nick, name} = item;
        return <LMR className="px-3 py-2" right={'id: ' + id}>
            <div>{nick || name}</div>
        </LMR>;
    }
    onRowClick = async (item: any) => {
        meInFrame.unit = item.id; // 25;
        await this.start();
    }

    /*
    protected appPage = () => {
        return <Page header={this.caption} logout={()=>{meInFrame.unit = undefined}}>
            {this.cUsqArr.map((v,i) => <div key={i}>{v.render()}</div>)}
        </Page>;
    };
    */
    //<LMR className="px-3 py-2 my-2 bg-light"
    //left={<FA name='cog' fixWidth={true} className="text-info mr-2 pt-1" />}
    //onClick={this.opClick}>设置操作权限</LMR>

    protected selectUnitPage = () => {
        return <Page header="选择小号" logout={true}>
            <List items={this.appUnits} item={{render: this.renderRow, onClick: this.onRowClick}}/>
        </Page>
    }
}

class VAppMain extends VPage<CApp> {
    async showEntry(param?:any) {
        this.openPage(this.appPage);
    }

    render(param?:any) {
        return this.appContent();
    }

    protected appPage() {
        let {caption} = this.controller;
        return <Page header={caption} logout={()=>{meInFrame.unit = undefined}}>
            {this.appContent()}
        </Page>;
    }

    protected appContent = () => {
        let {cUsqArr} = this.controller;
        let content:any;
        if (cUsqArr.length === 0) {
            content = <div className="text-danger">
                <FA name="" /> 此APP没有绑定任何的USQ
            </div>;
        }
        else {
            content = cUsqArr.map((v,i) => <div key={i}>{v.render()}</div>);
        }
        return <>{content}</>;
    };
}
