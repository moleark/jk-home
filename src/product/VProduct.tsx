import * as React from 'react';
import { CProduct, productRow } from './CProduct';
import {
    VPage, Page, Form, ItemSchema, ArrSchema, NumSchema, UiSchema, UiArr, Field,
    StringSchema, Context, ObjectSchema, RowContext, UiCustom, View
} from 'tonva-tools';
import { List, LMR, FA, SearchBox } from 'tonva-react-form';
import { tv, BoxId } from 'tonva-react-uq';
import { observer } from 'mobx-react';
import { MinusPlusWidget } from '../tools/minusPlusWidget';
import { PackRow, Product } from './Product';

const schema: ItemSchema[] = [
    {
        name: 'list',
        type: 'arr',
        arr: [
            { name: 'pack', type: 'object' } as ObjectSchema,
            { name: 'retail', type: 'number' } as NumSchema,
            { name: 'vipPrice', type: 'number' } as NumSchema,
            { name: 'currency', type: 'string' },
            { name: 'quantity', type: 'number' } as NumSchema,
            { name: 'inventoryAllocation', type: 'object' } as ObjectSchema,
            { name: 'deliveryTimeDescription', type: 'string' }
        ]
    } as ArrSchema
];

export class VProduct extends VPage<CProduct> {
    private data: any;
    private uiSchema: UiSchema;
    private product: Product;
    //private packRows: PackRow[];

    async open(product: Product) {
        this.product = product;
        this.uiSchema = {
            items: {
                list: {
                    widget: 'arr',
                    Templet: this.arrTemplet,
                    items: {
                        quantity: {
                            widget: 'custom',
                            className: 'text-center',
                            WidgetClass: MinusPlusWidget,
                            onChanged: this.onQuantityChanged
                        }
                    },
                    ArrContainer: (label: string, content: JSX.Element) => { return <div className="bg-white">{content}</div>; },
                    RowContainer: (content: JSX.Element) => { return <div className="py-2">{content}</div> },
                    Rowseperator: (<div className="border border-danger border-top"></div>),
                } as UiArr,
            }
        };

        //this.packRows = this.controller.buildPackRows();
        this.data = {
            list: product.packRows,
        };

        this.openPage(this.page);
    }

    private onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        //let { row } = context;
        let { data } = context;
        let { pack, retail, currency } = data;
        let { cApp } = this.controller;
        let { cart } = cApp;
        await cart.AddToCart(this.product.id, pack, value, retail, currency);
    }

    //context:Context, name:string, value:number
    private arrTemplet = (item: any) => {
        //let a = context.getValue('');
        let { pack, retail, vipPrice, inventoryAllocation, futureDeliveryTimeDescription } = item;
        let right = null;
        if (retail) {
            let price: number;
            let retailUI: any;
            if (vipPrice) {
                price = vipPrice;
                retailUI = <small className="text-muted"><del>¥{retail}</del></small>;
            }
            else {
                price = retail;
            }
            right = <div className="d-block text-right">
                <div className="pb-2 small text-muted">{retailUI} <span className="text-danger">¥ <span className="h5">{price}</span></span></div>
                <div className="d-flex"><Field name="quantity" /></div>
            </div >
        } else {
            right = <small>请询价</small>
        }

        let deliveryTimeUI = <></>;
        if (inventoryAllocation && inventoryAllocation.length > 0) {
            deliveryTimeUI = inventoryAllocation.map((v, index) => {
                return <div key={index}>
                    {tv(v.warehouse, (values: any) => <>{values.name}</>)}
                    {v.deliveryTimeDescription}
                </div>
            });
        } else {
            deliveryTimeUI = <div>{futureDeliveryTimeDescription}</div>
        }
        let packLabel = <small className="text-muted">包装：</small>;
        return <LMR className="mx-3" right={right}>
            <div><b>{tv(pack)}</b></div>
            {this.renderVm(VDelivery)}
            {deliveryTimeUI}
        </LMR>;
    }

    private page = observer(() => {

        let { cApp } = this.controller;
        let { id } = this.product;
        let header = cApp.cHome.renderSearchHeader();
        let cartLabel = cApp.cCart.renderCartLabel();
        return <Page header={header} right={cartLabel}>
            <div className="px-2 py-2 bg-white mb-3">{tv(id, productRow)}</div>
            <Form schema={schema} uiSchema={this.uiSchema} formData={this.data} />
        </Page>
    })
}


class VDelivery extends View<CProduct> {

    render() {
        // let inventoryAllocation = this.controller.getInventoryAllocation();
        return <div>inventoryAllocation</div>
    }
}