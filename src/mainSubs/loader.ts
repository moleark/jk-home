import { Entity } from "tonva-react-uq";

//class CCartApp {
//}

export abstract class Loader<T> {
    private entities:Entity[] = [];
    private schemaLoaded:boolean = false;
    /*
    private productTuid: TuidMain;
    private packTuid: TuidDiv;
    private productChemicalMap: Map;
    private priceMap: Map;
    private getCustomerDiscount: Query;
    private getInventoryAllocationQuery: Query;
    private getFutureDeliveryTime: Query;
    */
    /*
    protected cApp: CCartApp
    constructor(cApp: CCartApp) {
        this.cApp = cApp;
    }
    */
   protected abstract initEntities():void;
        /*
        let { cUqProduct, cUqCustomerDiscount, cUqWarehouse } = this.cApp;
        this.entities.push(this.productTuid = cUqProduct.tuid('productx'));
        this.entities.push(this.packTuid = this.productTuid.divs['packx']);
        this.entities.push(this.productChemicalMap = cUqProduct.map('productChemical'));
        this.entities.push(this.priceMap = cUqProduct.map('pricex'));
        this.entities.push(this.getCustomerDiscount = cUqCustomerDiscount.query("getdiscount"));
        this.entities.push(this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation"));
        this.entities.push(this.getFutureDeliveryTime = cUqProduct.query("getFutureDeliveryTime"));
        */
    //}
    protected async loadSchemas() {
        if (this.schemaLoaded === true) return;
        await Promise.all(this.entities);
        this.schemaLoaded = true;
    }

    async load(param: any):Promise<T> {
        await this.loadSchemas();
        let data = <T>{};
        await this.loadToData(param, data);
        return data;
    }
    protected abstract async loadToData(param:any, data:T):Promise<void>;
}
