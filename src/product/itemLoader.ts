import _ from 'lodash';
import { TuidMain, TuidDiv, Map, Query } from 'tonva-react-uq';
import { ProductPackRow } from './Product';
import { Loader } from 'mainSubs/loader';
import { MainSubs, MainProductChemical, MainBrand } from 'mainSubs';

export class LoaderBrand extends Loader<MainBrand> {
    private brandTuid: TuidMain;

    protected initEntities() {
        let { cUqProduct } = this.cApp;
        this.brandTuid = cUqProduct.tuid('brand');
    }

    protected async loadToData(brandId: number, data: MainBrand): Promise<void> {
        let brand = await this.brandTuid.load(brandId);
        data.id = brand.id;
        data.name = brand.name;
    }

    protected initData(): MainBrand {
        return {} as MainBrand;
    }
}

export class LoaderProductChemical extends Loader<MainProductChemical> {
    private productTuid: TuidMain;
    private packTuid: TuidDiv;
    private productChemicalMap: Map;

    protected initEntities() {

        let { cUqProduct } = this.cApp;
        this.productTuid = cUqProduct.tuid('productx');
        this.packTuid = this.productTuid.divs['packx'];
        this.productChemicalMap = cUqProduct.map('productChemical');
    }

    protected async loadToData(productId: number, data: MainProductChemical): Promise<void> {

        let product = await this.productTuid.load(productId);
        _.merge(data, product);

        let brandLoader = new LoaderBrand(this.cApp);
        data.brand = await brandLoader.load(data.brand.id);

        let productChemical = await this.productChemicalMap.obj({ product: productId });
        if (productChemical) {
            let { chemical, purity, CAS, molecularFomula, molecularWeight } = productChemical;
            data.chemical = chemical;
            data.purity = purity;
            data.CAS = CAS;
            data.molecularFomula = molecularFomula;
            data.molecularWeight = molecularWeight;
        }

        data.packs = [];
        product.packx.forEach(e => {
            // let { id, radiox, radioy, unit } = e;
            data.packs.push(e);
        });
    }

    protected initData(): MainProductChemical {
        return {} as MainProductChemical;
    }
}

export class LoaderProductChemicalWithPrices extends Loader<MainSubs<MainProductChemical, ProductPackRow>> {

    private getCustomerDiscount: Query;
    private priceMap: Map;
    private getInventoryAllocationQuery: Query;
    private getFutureDeliveryTime: Query;
    private getPromotionPackQuery: Query;

    protected initEntities() {

        let { cUqProduct, cUqCustomerDiscount, cUqWarehouse, cUqPromotion } = this.cApp;
        this.getCustomerDiscount = cUqCustomerDiscount.query("getdiscount");
        this.priceMap = cUqProduct.map('pricex');
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
        this.getFutureDeliveryTime = cUqProduct.query("getFutureDeliveryTime");
        this.getPromotionPackQuery = cUqPromotion.query("getPromotionPack");
    }

    protected initData(): MainSubs<MainProductChemical, ProductPackRow> {
        return { main: {} as MainProductChemical, subs: [] as ProductPackRow[] };
    }

    protected async loadToData(productId: any, data: MainSubs<MainProductChemical, ProductPackRow>): Promise<void> {

        let productLoader = new LoaderProductChemical(this.cApp);
        data.main = await productLoader.load(productId);

        let discount = 0;
        let { currentUser, currentSalesRegion, cartViewModel, currentLanguage } = this.cApp;
        if (currentUser.hasCustomer) {
            let discountSetting = await this.getCustomerDiscount.obj({ brand: data.main.brand.id, customer: currentUser.currentCustomer });
            discount = discountSetting && discountSetting.discount;
        }

        let { id: currentSalesRegionId } = currentSalesRegion;
        let prices = await this.priceMap.table({ product: productId, salesRegion: currentSalesRegionId });
        data.subs = prices.filter(e => e.discountinued === 0 && e.expireDate > Date.now()).map(element => {
            let ret: any = {};
            ret.pack = element.pack;
            ret.retail = element.retail;
            if (discount !== 0)
                ret.vipPrice = Math.round(element.retail * (1 - discount));
            ret.currency = currentSalesRegion.currency;
            ret.quantity = cartViewModel.getQuantity(productId, element.pack.id)
            return ret;
        });

        let promises: PromiseLike<any>[] = [];
        data.subs.forEach(v => {
            promises.push(this.getInventoryAllocationQuery.table({ product: productId, pack: v.pack, salesRegion: currentSalesRegion }));
            promises.push(this.getPromotionPackQuery.obj({ product: productId, pack: v.pack, salesRegion: currentSalesRegion, language: currentLanguage }));
        })
        let results = await Promise.all(promises);

        let fd = await this.getFutureDeliveryTimeDescription(productId, currentSalesRegionId);
        for (let i = 0; i < data.subs.length; i++) {
            data.subs[i].futureDeliveryTimeDescription = fd;
            data.subs[i].inventoryAllocation = results[i * 2];
            let promotion = results[i * 2 + 1];
            let discount = promotion && promotion.discount;
            if (discount)
                data.subs[i].promotionPrice = Math.round((1 - discount) * data.subs[i].retail);
        }
    }

    private getFutureDeliveryTimeDescription = async (productId: number, salesRegionId: number) => {
        let futureDeliveryTime = await this.getFutureDeliveryTime.table({ product: productId, salesRegion: salesRegionId });
        if (futureDeliveryTime.length > 0) {
            let { minValue, maxValue, unit, deliveryTimeDescription } = futureDeliveryTime[0];
            return minValue + (maxValue > minValue ? '~' + maxValue : '') + ' ' + unit;
            // return futureDeliveryTime[0].deliveryTimeDescription;
        }
    }
}

/*
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
*/