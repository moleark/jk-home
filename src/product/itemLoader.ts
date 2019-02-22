import { VMMain, VMSub, VMProductChemical, VmProductChemicalInventory, VMSubInventory, VMCartRow } from './item';
import { CCartApp } from 'CCartApp';
import { TuidMain, TuidDiv, Map, Query, Entity, BoxId } from 'tonva-react-uq';
import { element } from 'prop-types';

export abstract class LoaderMain<T extends VMMain<S>, S extends VMSub> {
    protected cApp: CCartApp
    private schemaLoaded: boolean = false;
    private productTuid: TuidMain;
    private packTuid: TuidDiv;
    private getFutureDeliveryTime: Query;

    constructor(cApp: CCartApp) {
        this.cApp = cApp;
        this.initEntities();
    }
    protected initEntities() {
        let { cUqProduct, cUqCustomerDiscount, cUqWarehouse } = this.cApp;
        this.productTuid = cUqProduct.tuid('productx');
        this.packTuid = this.productTuid.divs['packx'];
        this.getFutureDeliveryTime = cUqProduct.query("getFutureDeliveryTime");
    }
    protected entityArray(): Entity[] {
        return [
            this.productTuid,
            this.packTuid,
        ];
    }

    protected abstract createData(): T;

    protected loadPromiseArray(id: number): Promise<any>[] {
        return [
            this.productTuid.load(id),
        ];
    }

    async load(id: number): Promise<T> {
        if (this.schemaLoaded === false) {
            await Promise.all(this.entityArray());
            this.schemaLoaded = true;
        }
        let data = this.createData();
        await this.loadMainData(id, data);
        await this.loadSubsData(data);
        return data;
    }

    protected async loadMainData(id: number, data: T): Promise<void> {
        // let results = await Promise.all(this.loadPromiseArray(id));
        data.product = this.productTuid.boxId(id);
    }

    protected async loadSubsData(data: T): Promise<void> {

    }
}

export class loaderProductChemical extends LoaderMain<VMProductChemical, VMSub> {
    private productChemicalMap: Map;
    private getCustomerDiscount: Query;
    private priceMap: Map;
    private getInventoryAllocationQuery: Query;

    protected initEntities() {
        super.initEntities();

        let { cUqProduct, cUqCustomerDiscount, cUqWarehouse } = this.cApp;
        this.productChemicalMap = cUqProduct.map('productChemical');
        this.getCustomerDiscount = cUqCustomerDiscount.query("getdiscount");
        this.priceMap = cUqProduct.map('pricex');
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
    }

    protected async loadMainData(id: number, data: VMProductChemical): Promise<void> {
        await super.loadMainData(id, data);

        let productChemical = await this.productChemicalMap.obj({ product: id });
        data.productChemical = productChemical;
    }

    protected async loadSubsData(data: VMProductChemical): Promise<void> {
        await super.loadSubsData(data);

        let productObj = data.product.getObj();

        let discount = 0;
        let { currentUser, currentSalesRegion } = this.cApp;
        if (currentUser.hasCustomer) {
            let discountSetting = await this.getCustomerDiscount.obj({ brand: productObj.brand.id, customer: currentUser.currentCustomer });
            discount = discountSetting && discountSetting.discount;
        }

        let prices = await this.priceMap.table({ product: productObj.id, salesRegion: currentSalesRegion.id });
        data.subs = prices.map(element => {
            let ret: any = {};
            ret.pack = element.pack;
            ret.retail = element.retail;
            ret.vipPrice = Math.round(element.retail * (1-discount));
            ret.currency = currentSalesRegion.currency;
            return ret;
        });

        let promises: PromiseLike<any>[] = [];
        let inventoryAllocationPromises = data.subs.map(v => {
            return this.getInventoryAllocationQuery.table({ product: productObj.id, pack: v.pack, salesRegion: currentSalesRegion });
        });
        promises.push(Promise.all(inventoryAllocationPromises));
        let results = await Promise.all(promises);

        for (let i = 0; i < results.length; i++){
            data.subs[i].inventoryAllocation = results[i];
        }
    }

    protected createData(): VMProductChemical {
        return new VMProductChemical();
    }

}

export class LoaderProductOrdering extends LoaderMain<VmProductChemicalInventory, VMSubInventory> {
    protected createData(): VmProductChemicalInventory {
        return new VmProductChemicalInventory();
    }
}

export class LoaderCartRow extends LoaderMain<VMCartRow, VMSub> {

    private originCartItem: any;
    constructor(cCartApp: CCartApp) {
        super(cCartApp);
    }

    protected createData(): VMCartRow {
        return new VMCartRow();
    }

    async load(id: number): Promise<VMCartRow> {
        // this.originCartItem = originCartItem;

        let data = this.createData();
        return data;
    }

    protected async loadMainData(id: number, data: VMCartRow): Promise<void> {
        await super.loadMainData(id, data);
        data.$isDeleted = false;
        data.$isSelected = true;
        data.createdate = this.originCartItem.createData;
    }
}
