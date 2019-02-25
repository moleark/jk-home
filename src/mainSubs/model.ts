import { BoxId } from 'tonva-react-uq';

export interface Id {
    id: number;
}

export interface Product extends Id {
    discription: string;
}

export interface Pack extends Id {
    name: string;
}

export interface Chemical extends Id {
    CAS: string;
    purity: number;
}

export interface Inventory extends Id {
    name: string;
}

export interface MainProduct {
    product: Product;    
}

export interface MainProductChemical extends MainProduct {
    chemical: Chemical;
}

export interface SubPack {
    pack: Pack;
    price: number;
    vipPrice: number;
    quantity: number;
    amount: number;
}

export interface RowInventory {
    inventory: Inventory;
    quantity: number;
}

export interface SubPackInventory extends SubPack {
    rowInventorys: RowInventory[];
}
