import { BoxId } from 'tonva-react-uq';

export interface MainProduct {
    product: BoxId;    
}

export interface MainProductChemical extends MainProduct {
    chemical: BoxId;
}

export interface SubPack {
    pack: BoxId;
    price: number;
    vipPrice: number;
    quantity: number;
    amount: number;
}

export interface RowInventory {
    inventory: BoxId;
    quantity: number;
}

export interface SubPackInventory extends SubPack {
    rowInventorys: RowInventory[];
}
