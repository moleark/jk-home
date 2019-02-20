import { BoxId, TuidMain, TuidDiv, Map, Query } from 'tonva-react-uq';
import { CCartApp } from 'CCartApp';

export interface PackRow {
    pack: BoxId;
    //price: number;
    retail: number;
    vipPrice: number;
    currency: BoxId;
    quantity: number;
    futureDeliveryTimeDescription: string;
    inventoryAllocation: any[];
}

export class Product {
    private cApp: CCartApp;
    private productTuid: TuidMain;
    private packTuid: TuidDiv;
    private productChemicalMap: Map;
    private priceMap: Map;
    private getCustomerDiscount: Query;
    private getInventoryAllocationQuery: Query;
    private getFutureDeliveryTime: Query;

    id: BoxId;
    product: any;
    productChemical: any;
    packRows: PackRow[];

    constructor(cApp: CCartApp) {
        this.cApp = cApp;
        let { cUqProduct, cUqCustomerDiscount, cUqWarehouse } = cApp;
        this.productTuid = cUqProduct.tuid('productx');
        this.packTuid = this.productTuid.divs['packx'];
        this.productChemicalMap = cUqProduct.map('productChemical');
        this.priceMap = cUqProduct.map('pricex');
        this.getCustomerDiscount = cUqCustomerDiscount.query("getdiscount");
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
        this.getFutureDeliveryTime = cUqProduct.query("getFutureDeliveryTime");
    }

    async load(id: number) {
        let loadSchemas: Promise<any>[] = [
            this.productTuid.loadSchema(),
            this.packTuid.loadSchema(),
            this.productChemicalMap.loadSchema(),
            this.priceMap.loadSchema(),
            this.getCustomerDiscount.loadSchema(),
            this.getInventoryAllocationQuery.loadSchema(),
            this.getFutureDeliveryTime.loadSchema(),
        ];
        await Promise.all(loadSchemas);

        this.id = this.productTuid.boxId(id);
        let { cart, currentSalesRegion, currentUser } = this.cApp;
        this.product = await this.productTuid.load(id);
        this.packRows = this.product.packx.map(v => {
            return {
                pack: v,
                quantity: cart.getQuantity(id, v.id),
            }
        });

        let promises: PromiseLike<any>[] = [];
        promises.push(this.productChemicalMap.obj({ product: id }));
        if (currentUser.hasCustomer) {
            promises.push(this.getCustomerDiscount.obj({ brand: this.product.brand, customer: currentUser.currentCustomer }));
        }
        promises.push(this.priceMap.table({ product: id, salesRegion: currentSalesRegion.id }));
        promises.push(this.getFutureDeliveryTimeDescription(id, currentSalesRegion.id));
        let inventoryAllocationPromises = this.packRows.map(v => {
            return this.getInventoryAllocationQuery.table({ product: this.product, pack: v.pack, salesRegion: currentSalesRegion });
        });
        promises.push(Promise.all(inventoryAllocationPromises));
        let results = await Promise.all(promises);

        let p = 0;
        this.productChemical = results[p++];
        if (this.productChemical) {
            this.product.chemical = this.productChemical.chemical;
            this.product.purity = this.productChemical.purity;
            this.product.CAS = this.productChemical.CAS;
            this.product.molecularFomula = this.productChemical.molecularFomula;
            this.product.molecularWeight = this.productChemical.molecularWeight;
        }

        let discount = 0;
        if (currentUser.hasCustomer) {
            let discountSetting = results[p++];
            discount = discountSetting && discountSetting.discount;
        }

        let prices: any[] = results[p++];
        prices.forEach(element => {
            element.vipPrice = Math.round(element.retail * (1 - discount));
            element.currency = currentSalesRegion.currency;
        });

        let fd = results[p++];
        let allocationResults = results[p++];
        for (let i = 0; i < allocationResults.length; i++) {
            const element = this.packRows[i];
            element.futureDeliveryTimeDescription = fd;
            element.inventoryAllocation = allocationResults[i];
        };
        this.packRows.forEach(v => {
            let price = prices.find(x => x.pack.id === v.pack.id);
            if (price) {
                let { retail, vipPrice } = price;
                v.retail = retail;
                v.vipPrice = vipPrice;
            }
            v.currency = currentSalesRegion.currency;
        })
    }

    private getFutureDeliveryTimeDescription = async (productId: number, salesRegionId: number) => {
        let futureDeliveryTime = await this.getFutureDeliveryTime.table({ product: productId, salesRegion: salesRegionId });
        if (futureDeliveryTime.length > 0) {
            return futureDeliveryTime[0].deliveryTimeDescription;
        }
    }
}
