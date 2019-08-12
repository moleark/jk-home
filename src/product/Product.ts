import { BoxId, Map, Query } from 'tonva';
import { CCartApp } from 'CCartApp';

export interface PackRow {
    pack: BoxId;
    quantity: number;
    futureDeliveryTimeDescription?: string;
    inventoryAllocation?: any[];
}

export interface ProductPackRow extends PackRow {
    retail: number;
    vipPrice: number;
    promotionPrice: number;
    currency: BoxId;
}