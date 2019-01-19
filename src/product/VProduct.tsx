import * as React from 'react';
import { CProduct, productRow, PackRow } from './CProduct';
import {
    VPage, Page, Form, ItemSchema, ArrSchema, NumSchema, UiSchema, UiArr, Field,
    StringSchema, Context, ObjectSchema, RowContext, UiCustom
} from 'tonva-tools';
import { List, LMR, FA, SearchBox } from 'tonva-react-form';
import { tv, BoxId } from 'tonva-react-usql';
import { observer } from 'mobx-react';
import { MinusPlusWidget } from '../tools/minusPlusWidget';

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
    private packRows: PackRow[];

    async showEntry(product: any) {
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

        this.packRows = this.controller.buildPackRows();
        this.data = {
            list: this.packRows,
        };

        this.openPage(this.page, product);
    }

    private onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        //let { row } = context;
        let { data } = context;
        let { pack } = data;
        let { retail, currency } = pack;
        let { cApp, productBox } = this.controller;
        let { cCart } = cApp;
        await cCart.cart.AddToCart(productBox, pack, value, retail, currency);
    }

    //context:Context, name:string, value:number
    private arrTemplet = (item: any) => {
        //let a = context.getValue('');
        let { pack } = item;
        let { retail, vipPrice, inventoryAllocation, futureDeliveryTimeDescription } = pack;
        let right, priceUI = <></>;
        if (retail) {
            right = <div className="d-flex"><Field name="quantity" /></div>;
            priceUI = <div>retail:{retail} vipPrice:{vipPrice}</div>
        }

        let deliveryTimeUI = <></>;
        if (inventoryAllocation.length > 0) {
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

        let { product, cApp } = this.controller;
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
            <div className="px-2 py-2 bg-white">{tv(product, productRow)}</div>
            <Form schema={schema} uiSchema={this.uiSchema} formData={this.data} />
        </Page>
    })
}