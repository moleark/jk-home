import * as React from 'react';
import { CProduct, productRow } from './CProduct';
import {
    VPage, Page, Form, ItemSchema, ArrSchema, NumSchema, UiSchema, UiArr, Field,
    StringSchema, Context, ObjectSchema, RowContext, UiCustom
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
            { name: 'quantity', type: 'number' } as NumSchema
        ]
    } as ArrSchema
];

export class VProduct extends VPage<CProduct> {
    private data: any;
    private uiSchema: UiSchema;
    private product: Product;
    //private packRows: PackRow[];

    async showEntry(product: Product) {
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
        let right, priceUI = <></>;
        if (retail) {
            right = <div className="d-flex"><Field name="quantity" /></div>;
            priceUI = <div>retail:{retail} vipPrice:{vipPrice}</div>
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
        return <LMR className="mx-3" right={right}>
            <div>{tv(pack)}</div>
            {priceUI}
            {deliveryTimeUI}
        </LMR>;
    }

    private page = observer(() => {

        let { cApp } = this.controller;
        let { id } = this.product;
        let header = cApp.cHome.renderSearchHeader();
        let cartLabel = cApp.cCart.renderCartLabel();
        let listHeader = <LMR className="pt-3" right="quantity  cart  favorite">
            <div className="row">
                <div className="col-2">SKU</div>
                <div className="col-2">price</div>
                <div className="col-2">vip price</div>
            </div>
        </LMR>
        return <Page header={header} right={cartLabel}>
            <div className="px-2 py-2 bg-white mb-1">{tv(id, productRow)}</div>
            <Form schema={schema} uiSchema={this.uiSchema} formData={this.data} />
        </Page>
    })
}