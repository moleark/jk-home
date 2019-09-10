/*
import { UqAppData, UqData } from '../../net';
import { Entity } from './entity';

export abstract class Cache<T> {
    protected value: T;

    abstract get key(): string;

    get():T {
        try {
            if (this.value !== undefined) return this.value;
            let text = localStorage.getItem(this.key);
            return this.value = JSON.parse(text);
        }
        catch (err) {
            localStorage.removeItem(this.key);
            return;
        }
    }

    set(value:T) {
        this.value = value;
        localStorage.setItem(this.key, JSON.stringify(value));
    }

    remove() {
        localStorage.removeItem(this.key);
        this.value = undefined;
    }
}

export class UqAppCache extends Cache<UqAppData> {
    private readonly appOwner: string;
    private readonly appName: string;

    constructor(appOwner:string, appName:string) {
        super();
        this.appOwner = appOwner;
        this.appName = appName;
    }

    get key(): string {return `app-${this.appOwner}.${this.appName}`}
}

export class UqCache extends Cache<any> {
    private uqData: UqData;
    constructor(uqData: UqData) {
        super();
        this.uqData = uqData;
    }

    get key(): string {
        let {uqOwner, uqName} = this.uqData;
        return `uq-${uqOwner}.${uqName}`;
    }
}

export class EntityCache extends Cache<Entity> {
    private entity: Entity;
    constructor(entity: Entity) {
        super();
        this.entity = entity;
    }
    get key(): string {
        let {name, uq} = this.entity;
        let {uqOwner, uqName} = uq;
        return `entity-${uqOwner}.${uqName}-${name}`;
    }
}
*/