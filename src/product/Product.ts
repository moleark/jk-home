import { Pack } from './Pack';

export class Product {
    id: number;

    brandId: number;
    brandName: string;

    description: string;
    packs: Pack[] = [];
}