import { VMMain, VMSub, VMProductChemical, VmProductChemicalInventory, VMSubInventory } from './item';
import { CCartApp } from 'CCartApp';
import { TuidMain, TuidDiv, Map, Query, Entity } from 'tonva-react-uq';

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
