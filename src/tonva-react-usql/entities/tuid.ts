import * as React from 'react';
import {observable} from 'mobx';
import _ from 'lodash';
import { Entity } from './entity';
import { Entities, Field, ArrFields } from './entities';
import { isNumber } from 'util';
import { CUsq, CTuidMain, CTuidEdit, CTuidInfo, CTuidSelect } from '../controllers';

export class BoxId {
    id: number;
    obj?: any;
    content: (templet?:(values?:any, x?:any)=>JSX.Element, x?:any)=>JSX.Element;
    valueFromFieldName: (fieldName:string)=>BoxId|any;
}

const maxCacheSize = 1000;
export abstract class Tuid extends Entity {
    private BoxId: ()=>void;
    get typeName(): string { return 'tuid';}
    private queue: number[] = [];               // 每次使用，都排到队头
    private waitingIds: number[] = [];          // 等待loading的
    private cache = observable.map({}, {deep: false});    // 已经缓冲的
    idName: string;
    owner: TuidMain;                    // 用这个值来区分是不是TuidArr
    unique: string[];
    schemaFrom: {owner:string; usq:string};

    constructor(entities:Entities, name:string, typeId:number) {
        super(entities, name, typeId);
        this.buildIdBoxer();
    }

    abstract get Main();

    private buildIdBoxer() {
        this.BoxId = function():void {};
        let prototype = this.BoxId.prototype;
        Object.defineProperty(prototype, '_$tuid', {
            value: this,
            writable: false,
            enumerable: false,
        });
        /*
        prototype.content = function(templet?:(values?:any, x?:any)=>JSX.Element, x?:any) {
            let t:Tuid = this._$tuid;
            let com = templet || this._$com;
            if (com === undefined) {
                com = this._$com = t.entities.usq.getTuidContent(t);
            }
            let val = t.valueFromId(this.id);
            if (typeof val === 'number') val = {id: val};
            if (templet !== undefined) return templet(val, x);
            //return com(val, x);
            return React.createElement(com, val);
        }
        */
        Object.defineProperty(prototype, 'obj', {
            enumerable: false,
            get: function() {
                if (this.id === undefined || this.id<=0) return undefined;
                return this._$tuid.valueFromId(this.id);
            }
        });
        prototype.valueFromFieldName = function(fieldName:string):BoxId|any {
            let t:Tuid = this._$tuid;
            return t.valueFromFieldName(fieldName, this.obj);
        };
        prototype.toJSON = function() {return this.id}
    }
    boxId(id:number):BoxId {
        this.useId(id);
        let ret:BoxId = new this.BoxId();
        ret.id = id;
        return ret;
    }
    getTuidContent() {
        return this.entities.cUsq.getTuidContent(this);
    }
    getIdFromObj(item:any):number {
        return item[this.idName];
    }

    setSchema(schema:any) {
        super.setSchema(schema);
        let {id, unique} = schema;
        this.idName = id;
        this.unique = unique;
        this.schemaFrom = this.schema.from;
    }

    private moveToHead(id:number) {
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.queue.push(id);
    }

    valueFromId(id:number|BoxId):any {
        let _id:number;
        let tId = typeof id;
        switch (typeof id) {
            case 'object': _id = (id as BoxId).id; break;
            case 'number': _id = id as number; break;
            default: return;
        }
        let v = this.cache.get(_id);
        if (this.owner !== undefined && typeof v === 'object') {
            v.$owner = this.owner.boxId(v.owner); // this.owner.valueFromId(v.owner);
        }
        return v;
    }
    valueFromFieldName(fieldName:string, obj:any):BoxId|any {
        if (obj === undefined) return;
        let f = this.fields.find(v => v.name === fieldName);
        if (f === undefined) return;
        let v = obj[fieldName];
        let {_tuid} = f;
        if (_tuid === undefined) return v;
        return _tuid.valueFromId(v);
    }
    resetCache(id:number) {
        this.cache.delete(id);
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.useId(id);
    }
    useId(id:number, defer?:boolean) {
        if (id === undefined || id === 0) return;
        if (isNumber(id) === false) return;
        console.log('if (this.cache.has(id) === true) {');
        if (this.cache.has(id) === true) {
            this.moveToHead(id);
            return;
        }
        this.entities.cacheTuids(defer===true?70:20);
        //let idVal = this.createID(id);
        this.cache.set(id, id);
        if (this.waitingIds.findIndex(v => v === id) >= 0) {
            this.moveToHead(id);
            return;
        }

        console.log('// 如果没有缓冲, 或者没有waiting');
        // 如果没有缓冲, 或者没有waiting
        if (this.queue.length >= maxCacheSize) {
            // 缓冲已满，先去掉最不常用的
            let r = this.queue.shift();
            if (r === id) {
                // 如果移除的，正好是现在用的，则插入
                this.queue.push(r);
                return;
            }

            //let rKey = String(r);
            if (this.cache.has(r) === true) {
                // 如果移除r已经缓存
                this.cache.delete(r);
            }
            else {
                // 如果移除r还没有缓存
                let index = this.waitingIds.findIndex(v => v === r);
                this.waitingIds.splice(index, 1);
            }
        }
        console.log('this.waitingIds.push(id)', id);
        this.waitingIds.push(id);
        this.queue.push(id);
        return;
    }
    async proxied(name:string, id:number):Promise<any> {
        let proxyTuid = this.entities.getTuid(name, undefined);
        proxyTuid.useId(id);
        let proxied = await this.tvApi.proxied(this.name, name, id);
        this.cacheValue(proxied);
        return proxied;
    }
    cacheValue(val:any):boolean {
        if (val === undefined) return false;
        let id = this.getIdFromObj(val);
        if (id === undefined) return false;
        let index = this.waitingIds.findIndex(v => v === id);
        if (index>=0) this.waitingIds.splice(index, 1);
        //let cacheVal = this.createID(id, val);
        this.cache.set(id, val);
        // 下面的代码应该是cache proxy id, 需要的时候再写吧
        /*
        let {tuids, fields} = this.schema;
        if (tuids !== undefined && fields !== undefined) {
            for (let f of fields) {
                let {name, tuid} = f;
                if (tuid === undefined) continue;
                let t = this.entities.tuid(tuid);
                if (t === undefined) continue;
                t.useId(val[name]);
            }
        }*/
        return true;
    }
    protected afterCacheId(tuidValue:any) {
        for (let f of this.fields) {
            let {_tuid} = f;
            if (_tuid === undefined) continue;
            _tuid.useId(tuidValue[f.name]);
        }
    }
    async cacheIds():Promise<void> {
        if (this.waitingIds.length === 0) return;
        let name:string, arr:string;
        if (this.owner === undefined) {
            name = this.name;
        }
        else {
            name = this.owner.name;
            arr = this.name;
        }
        let api = await this.getApiFrom();
        let tuids = await api.tuidIds(name, arr, this.waitingIds);
        console.log('tuidIds', name, this.waitingIds.join(','), tuids);
        for (let tuidValue of tuids) {
            if (this.cacheValue(tuidValue) === false) continue;
            this.cacheTuidFieldValues(tuidValue);
            this.afterCacheId(tuidValue);
        }
    }
    async load(id:number):Promise<any> {
        if (id === undefined || id === 0) return;
        let api = await this.getApiFrom();
        let values = await api.tuidGet(this.name, id);
        if (values === undefined) return;
        values._$tuid = this;
        this.cacheValue(values);
        this.cacheTuidFieldValues(values);
        return values;
    }
    protected getDiv(divName:string):TuidDiv {return;}
    private cacheTuidFieldValues(values:any) {
        let {fields, arrs} = this.schema;
        this.cacheFieldsInValue(values, fields);
        if (arrs !== undefined) {
            for (let arr of arrs as ArrFields[]) {
                let {name, fields} = arr;
                let arrValues = values[name];
                if (arrValues === undefined) continue;
                let tuidDiv = this.getDiv(name);
                for (let row of arrValues) {
                    row._$tuid = tuidDiv;
                    row.$owner = this.boxId(row.owner); 
                    this.cacheFieldsInValue(row, fields);
                }
            }
        }
    }
    private cacheFieldsInValue(values:any, fields:Field[]) {
        for (let f of fields as Field[]) {
            let {name, _tuid} = f;
            if (_tuid === undefined) continue;
            let id = values[name];
            //_tuid.useId(id);
            values[name] = _tuid.boxId(id);
        }
    }
    async save(id:number, props:any) {
        let params = _.clone(props);
        params["$id"] = id;
        let ret = await this.tvApi.tuidSave(this.name, params);
        let {id:retId, inId} = ret;
        if (retId === undefined) {
            params.id = id;
            this.cacheValue(params);
        }
        else if (retId > 0) {
            params.id = retId;
            this.cacheValue(params);
        }
        return ret;
    }
    async search(key:string, pageStart:string|number, pageSize:number):Promise<any> {
        let ret:any[] = await this.searchArr(undefined, key, pageStart, pageSize);
        return ret;
    }
    async searchArr(owner:number, key:string, pageStart:string|number, pageSize:number):Promise<any> {
        let {fields} = this.schema;
        let name:string, arr:string;
        if (this.owner !== undefined) {
            name = this.owner.name;
            arr = this.name;
        }
        else {
            name = this.name;
            arr = undefined;
        }
        let api = await this.getApiFrom();
        let ret = await api.tuidSearch(name, arr, owner, key, pageStart, pageSize);
        for (let row of ret) {
            this.cacheFieldsInValue(row, fields);
            if (this.owner !== undefined) row.$owner = this.owner.boxId(row.owner);
        }
        return ret;
    }
    async loadArr(arr:string, owner:number, id:number):Promise<any> {
        if (id === undefined || id === 0) return;
        let api = await this.getApiFrom();
        return await api.tuidArrGet(this.name, arr, owner, id);
    }
    /*
    async loadArrAll(owner:number):Promise<any[]> {
        return this.all = await this.tvApi.tuidGetAll(this.name);
    }*/
    async saveArr(arr:string, owner:number, id:number, props:any) {
        let params = _.clone(props);
        params["$id"] = id;
        return await this.tvApi.tuidArrSave(this.name, arr, owner, params);
    }
    async posArr(arr:string, owner:number, id:number, order:number) {
        return await this.tvApi.tuidArrPos(this.name, arr, owner, id, order);
    }
    
    // cache放到Tuid里面之后，这个函数不再需要公开调用了
    //private async ids(idArr:number[]) {
    //    return await this.tvApi.tuidIds(this.name, idArr);
    //}
    async showInfo(id:number) {
        await this.entities.cUsq.showTuid(this, id);
    }
}

export class TuidMain extends Tuid {
    get Main() {return this}

    divs: {[name:string]: TuidDiv};
    proxies: {[name:string]: TuidMain};

    public setSchema(schema:any) {
        super.setSchema(schema);
        let {arrs} = schema;
        if (arrs !== undefined) {
            this.divs = {};
            for (let arr of arrs) {
                let {name} = arr;
                let tuidDiv = new TuidDiv(this.entities, name, this.typeId);
                tuidDiv.owner = this;
                this.divs[name] = tuidDiv;
                tuidDiv.setSchema(arr);
            }
        }
    }
    protected getDiv(divName:string):TuidDiv {return this.divs[divName];}
    async cacheIds():Promise<void> {
        await super.cacheIds();
        if (this.divs === undefined) return;
        for (let i in this.divs) {
            await this.divs[i].cacheIds();
        }
    }

    async cUsqFrom(): Promise<CUsq> {
        if (this.schemaFrom === undefined) return this.entities.cUsq;
        let {owner, usq} = this.schemaFrom;
        let cUsq = await this.entities.cUsq
        let cApp = cUsq.cApp;
        if (cApp === undefined) return cUsq;
        let cUsqFrm = await cApp.getImportUsq(owner, usq);
        if (cUsqFrm === undefined) {
            console.error(`${owner}/${usq} 不存在`);
            debugger;
            return cUsq;
        }
        let retErrors = await cUsqFrm.loadSchema();
        if (retErrors !== undefined) {
            console.error('cUsq.loadSchema: ' + retErrors);
            debugger;
            return cUsq;
        }
        return cUsqFrm;
    }

    protected async getApiFrom() {
        let from = await this.from();
        if (from !== undefined) return from.entities.usqApi;
        return this.entities.usqApi;
    }

    async from(): Promise<TuidMain> {
        let cUsq = await this.cUsqFrom();
        return cUsq.tuid(this.name);
    }

    async cFrom(): Promise<CTuidMain> {
        let cUsq = await this.cUsqFrom();
        return cUsq.cTuidMainFromName(this.name);
    }

    async cEditFrom(): Promise<CTuidEdit> {
        let cUsq = await this.cUsqFrom();
        return cUsq.cTuidEditFromName(this.name);
    }

    async cInfoFrom(): Promise<CTuidInfo> {
        let cUsq = await this.cUsqFrom();
        return cUsq.cTuidInfoFromName(this.name);
    }

    async cSelectFrom(): Promise<CTuidSelect> {
        let cUsq = await this.cUsqFrom();
        if (cUsq === undefined) return;
        return cUsq.cTuidSelectFromName(this.name);
    }

    protected afterCacheId(tuidValue:any) {
        super.afterCacheId(tuidValue);
        if (this.proxies === undefined) return;
        let {type, $proxy} = tuidValue;
        let pTuid = this.proxies[type];
        pTuid.useId($proxy);
    }
}

export class TuidDiv extends Tuid {
    get Main() {return this.owner}
}
