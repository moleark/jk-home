/*
import { VMMain, VMSub, VMSubInventory, VMMainChemical, VM } from './item';
import { CCartApp } from 'CCartApp';
import { TuidMain, TuidDiv, Map, Query, Entity } from 'tonva-react-uq';

export abstract class Loader {
    private entities:Entity[] = [];
    private schemaLoaded:boolean = false;
    private productTuid: TuidMain;
    private packTuid: TuidDiv;
    private productChemicalMap: Map;
    private priceMap: Map;
    private getCustomerDiscount: Query;
    private getInventoryAllocationQuery: Query;
    private getFutureDeliveryTime: Query;
    protected cApp: CCartApp
    constructor(cApp: CCartApp) {
        this.cApp = cApp;
    }
    protected initEntities() {
        let { cUqProduct, cUqCustomerDiscount, cUqWarehouse } = this.cApp;
        this.entities.push(this.productTuid = cUqProduct.tuid('productx'));
        this.entities.push(this.packTuid = this.productTuid.divs['packx']);
        this.entities.push(this.productChemicalMap = cUqProduct.map('productChemical'));
        this.entities.push(this.priceMap = cUqProduct.map('pricex'));
        this.entities.push(this.getCustomerDiscount = cUqCustomerDiscount.query("getdiscount"));
        this.entities.push(this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation"));
        this.entities.push(this.getFutureDeliveryTime = cUqProduct.query("getFutureDeliveryTime"));
    }
    protected async loadSchemas() {
        if (this.schemaLoaded === true) return;
        await Promise.all(this.entities);
        this.schemaLoaded = true;
    }

    async load(id:number):Promise<any> {
        await this.loadSchemas();
        let data = this.createData();
        let results = await Promise.all(this.entities);
        this.setData(data, results);
    }
    protected abstract createData():any;
    protected abstract setData(data:any, results:any[]):void;
}

export class LoaderVMMain<M extends VMMain> extends Loader {
    createData():any {return new VMMain()}
    setData(data:M, results:any[]) {

    }
}

export class LoaderVMMainChemical<M extends VMMainChemical> extends LoaderVMMain<M> {
    createData() {return new VMMainChemical()}
    setData(data:M, results:any[]) {
        
    }
}

export class LoaderVMSub<M extends VMMain, S extends VMSub> extends Loader {
    createData() {return new VMSub()}
    setData(data:S, results:any[]) {
        
    }
}

export class LoaderVMSubInventory<M extends VMMain, S extends VMSubInventory> extends LoaderVMSub<M, S> {
    createData() {return new VMSubInventory()}
    setData(data:S, results:any[]) {        
    }
}

export class LoaderVM<M extends VMMain, S extends VMSub> extends Loader {
    constructor(cApp: CCartApp) {
        super(cApp);
    }
    protected createLoaderVMMain():LoaderVMMain<M> {return new LoaderVMMain<M>(this.cApp)}
    protected createLoaderVMSub():LoaderVMSub<M, S> {return new LoaderVMSub<M, S>(this.cApp)}
    createData() {return new VM()}
    setData(data:S, results:any[]) {
    }
}
*/
/*
export abstract class LoaderMain<T extends VMMain<S>, S extends VMSub> {
    protected cApp: CCartApp
    private schemaLoaded:boolean = false;
    private productTuid: TuidMain;
    private packTuid: TuidDiv;
    private productChemicalMap: Map;
    private priceMap: Map;
    private getCustomerDiscount: Query;
    private getInventoryAllocationQuery: Query;
    private getFutureDeliveryTime: Query;

    constructor(cApp: CCartApp) {
        this.cApp = cApp;
        this.initEntities();
    }
    protected initEntities() {
        let { cUqProduct, cUqCustomerDiscount, cUqWarehouse } = this.cApp;
        this.productTuid = cUqProduct.tuid('productx');
        this.packTuid = this.productTuid.divs['packx'];
        this.productChemicalMap = cUqProduct.map('productChemical');
        this.priceMap = cUqProduct.map('pricex');
        this.getCustomerDiscount = cUqCustomerDiscount.query("getdiscount");
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
        this.getFutureDeliveryTime = cUqProduct.query("getFutureDeliveryTime");
    }
    protected entityArray():Entity[] {
        return [
            this.productTuid,
            this.packTuid,
        ];
    }

    protected abstract createData():T;

    protected loadPromiseArray(id:number):Promise<any>[] {
        return [
            this.productTuid.load(id),
        ];
    }
    
    async load(id:number):Promise<T> {
        if (this.schemaLoaded === false) {
            await Promise.all(this.entityArray());
            this.schemaLoaded = true;
        }
        let data = this.createData();
        await this.loadData(id, data);
        return data;
    }

    protected async loadData<T>(id:number, data:T): Promise<void> {
        let results = await Promise.all(this.loadPromiseArray(id));
    }
}
*/
/*
export class ViewProduct extends LoaderMain<VMProductChemical, VMSub> {
    protected createData():VMProductChemical {
        return new VMProductChemical();
    }

}

export class ViewProductOrdering extends LoaderMain<VmProductChemicalInventory, VMSubInventory> {
    protected createData():VmProductChemicalInventory {
        return new VmProductChemicalInventory();
    }
}

export class ViewCartRow extends LoaderMain<VMProductChemical, VMSub> {
    protected createData():VMProductChemical {
        return new VMProductChemical();
    }
}
*/