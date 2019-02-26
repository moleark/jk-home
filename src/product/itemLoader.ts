import { CCartApp } from 'CCartApp';
import { TuidMain, TuidDiv, Map, Query } from 'tonva-react-uq';
import { ProductPackRow } from './Product';
import { Loader } from 'mainSubs/loader';
import { MainSubs, MainProductChemical } from 'mainSubs';

export class LoaderProduct extends Loader<MainProductChemical> {
    private productTuid: TuidMain;
    private packTuid: TuidDiv;
    private getFutureDeliveryTime: Query;
    private productChemicalMap: Map;

    protected initEntities() {

        let { cUqProduct } = this.cApp;
        this.productTuid = cUqProduct.tuid('productx');
        this.packTuid = this.productTuid.divs['packx'];
        this.getFutureDeliveryTime = cUqProduct.query("getFutureDeliveryTime");
        this.productChemicalMap = cUqProduct.map('productChemical');
    }

    protected async loadToData(productId: any, data: MainProductChemical): Promise<void> {

        let product = await this.productTuid.load(productId);
        data = { ...product };

        let productChemical = await this.productChemicalMap.obj({ product: productId });
        if (productChemical) {
            let { chemical, purity, CAS, molecularFomula, molecularWeight } = productChemical;
            data.chemical = chemical;
            data.purity = purity;
            data.CAS = CAS;
            data.molecularFomula = molecularFomula;
            data.molecularWeight = molecularWeight;
        }
    }

    protected initData(): MainProductChemical {
        return {} as MainProductChemical;
    }
}

export class LoaderProductChemical extends Loader<MainSubs<MainProductChemical, ProductPackRow>> {

    private getCustomerDiscount: Query;
    private priceMap: Map;
    private getInventoryAllocationQuery: Query;

    protected initEntities() {

        let { cUqProduct, cUqCustomerDiscount, cUqWarehouse } = this.cApp;
        this.getCustomerDiscount = cUqCustomerDiscount.query("getdiscount");
        this.priceMap = cUqProduct.map('pricex');
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
    }

    protected initData(): MainSubs<MainProductChemical, ProductPackRow> {
        return { main: {} as MainProductChemical, subs: [] as ProductPackRow[] };
    }

    protected async loadToData(productId: any, data: MainSubs<MainProductChemical, ProductPackRow>): Promise<void> {

        /*
        let product = await this.productTuid.load(param);
        data.main = { ...product };

        let productChemical = await this.productChemicalMap.obj({ product: param });
        if (productChemical) {
            let { chemical, purity, CAS, molecularFomula, molecularWeight } = productChemical;
            data.main.chemical = chemical;
            data.main.purity = purity;
            data.main.CAS = CAS;
            data.main.molecularFomula = molecularFomula;
            data.main.molecularWeight = molecularWeight;
        }
        */
        let productLoader = new ProductService(this.cApp);
        data.main = await productLoader.loadProductChemical(productId);

        /*
        let productLoader = new LoaderProduct(this.cApp);
        data.main = await productLoader.load(productId);
        */

        let discount = 0;
        let { currentUser, currentSalesRegion, cart } = this.cApp;
        if (currentUser.hasCustomer) {
            let discountSetting = await this.getCustomerDiscount.obj({ brand: data.main.brand.id, customer: currentUser.currentCustomer });
            discount = discountSetting && discountSetting.discount;
        }

        let prices = await this.priceMap.table({ product: productId, salesRegion: currentSalesRegion.id });
        data.subs = prices.map(element => {
            let ret: any = {};
            ret.pack = element.pack;
            ret.retail = element.retail;
            ret.vipPrice = Math.round(element.retail * (1 - discount));
            ret.currency = currentSalesRegion.currency;
            ret.quantity = cart.getQuantity(productId, element.pack.id)
            return ret;
        });

        let promises: PromiseLike<any>[] = [];
        let inventoryAllocationPromises = data.subs.map(v => {
            return this.getInventoryAllocationQuery.table({ product: productId, pack: v.pack, salesRegion: currentSalesRegion });
        });
        promises.push(Promise.all(inventoryAllocationPromises));
        let results = await Promise.all(promises);

        for (let i = 0; i < results.length; i++) {
            data.subs[i].inventoryAllocation = results[i];
        }
    }
}

// 拟用 LoaderProduct 替换
export class ProductService {

    private cApp: CCartApp;
    private productTuid: TuidMain;
    private productChemicalMap: Map;

    constructor(cApp: CCartApp) {
        this.cApp = cApp;
        this.initEntities();
    }

    protected initEntities() {

        let { cUqProduct, cUqCustomerDiscount, cUqWarehouse } = this.cApp;
        this.productTuid = cUqProduct.tuid('productx');
        this.productChemicalMap = cUqProduct.map('productChemical');
    }

    async loadProductChemical(productId: number): Promise<MainProductChemical> {

        let result: MainProductChemical;
        let product = await this.productTuid.load(productId);
        result = {...product };

        let productChemical = await this.productChemicalMap.obj({ product: productId });
        if (productChemical) {
            let { chemical, purity, CAS, molecularFomula, molecularWeight } = productChemical;
            result.chemical = chemical;
            result.purity = purity;
            result.CAS = CAS;
            result.molecularFomula = molecularFomula;
            result.molecularWeight = molecularWeight;
        }
        return result;
    }
}