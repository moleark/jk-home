import { BoxId, tv } from 'tonva-react-uq';

/*
export interface Product {

}

export interface Chemical {

}
*/
/*
export interface Pack {

}

export interface Inventory {

}
*/
export class VMSub {
    pack: BoxId;
    price: number;
    vipPrice: number;
    quantity: number;
    amount: number;
}

export class VMSubInventory extends VMSub {
    inventory: BoxId;
}

export class VMMain<T extends VMSub> {
    product: BoxId;
    subs: T[];
}

export class VMProduct extends VMMain<VMSub> {
}

export class VMProductChemicalBase<S extends VMSub> extends VMMain<S> {
    chemical: BoxId;
}

export class VMProductChemical extends VMProductChemicalBase<VMSub> {
}

export class VmProductChemicalInventory extends VMProductChemicalBase<VMSubInventory> {
}
