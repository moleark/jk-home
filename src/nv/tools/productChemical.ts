//import { CCartApp } from 'CCartApp';
import { Map, Query } from 'tonva';
import { Loader } from '../mainSubs/loader';

export class LoaderProductChemical extends Loader<any> {
    /*
    private productChemicalMap: Map;

    initEntities() {
        let { cUqProduct } = this.cApp;
        this.productChemicalMap = cUqProduct.map('productChemical');
    }
    */
    protected async loadToData(productId: number, data: any): Promise<void> {

        let productChemical = await this.cApp.uqs.product.ProductChemical.obj({ product: productId });
        if (productChemical) {
            let { chemical, purity, CAS, molecularFomula, molecularWeight } = productChemical;
            data.chemical = chemical;
            data.purity = purity;
            data.CAS = CAS;
            data.molecularFomula = molecularFomula;
            data.molecularWeight = molecularWeight;
        }
    }

    protected initData(): any {
        return {};
    }
}