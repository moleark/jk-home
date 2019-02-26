
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
export class VMMain {
    product: BoxId;
}

export class VMMainChemical extends VMMain {
    chemical: BoxId;
}

export class VMSub {
    pack: BoxId;
    retail: number;
    vipPrice: number;
    currency: BoxId;
    quantity: number;
    amount: number;
    inventoryAllocation: any;
}

export class VMSubInventory extends VMSub {
    inventory: BoxId;
}

export class VM<M extends VMMain, S extends VMSub> {
    main: M;
    subs: S[];
}
/*
export class VMProduct extends VMMain<VMSub> {
}

export class VMProductChemicalBase<S extends VMSub> extends VMMain<S> {
    productChemical: any;
}

export class VMProductChemical extends VMProductChemicalBase<VMSub> {
}

export class VmProductChemicalInventory extends VMProductChemicalBase<VMSubInventory> {
}

export class VMCartRow extends VMProductChemicalBase<VMSubInventory> {
    $isSelected?: boolean;
    $isDeleted?: boolean;
    createdate: number;
}
*/
