import * as React from 'react';
import { VMSub, VMMain, VMProductChemical, VmProductChemicalInventory, VMSubInventory } from './item';
import { tv } from 'tonva-react-uq';
import { setReactionScheduler } from 'mobx/lib/internal';
import { Form, NumSchema, UiSchema, RowContext, Field } from 'tonva-tools';
import { ItemSchema, ObjectSchema } from 'tonva-tools';
import { ArrSchema } from 'tonva-tools/ui/form/schema';
import { MinusPlusWidget } from 'tools';
import { LMR } from 'tonva-react-form';
import { UiArr } from 'tonva-tools/ui/form/uiSchema';

export class ViewMain<T extends VMMain<S>, S extends VMSub> {
    protected main: T
    protected param: any;
    constructor(main: T, param?: any) {
        this.main = main;
        this.param = param;
    }

    protected renderCaption(): JSX.Element {
        return <div>name</div>;
    }

    protected renderProps(): JSX.Element[] {
        return [
            <div key="prop1">prop1</div>,
            <div key="prop2">prop2</div>,
            <div key="prop3">prop3</div>,
        ];
    }

    protected renderSub(sub: S): JSX.Element {
        return <div key={sub.pack.id}>row</div>;
    }

    protected renderSubs(): JSX.Element[] {
        return this.main.subs.map(v => this.renderSub(v));
    }

    render(): JSX.Element {
        return <div>
            {this.renderCaption()}
            {this.renderProps()}
            {this.renderSubs()}
        </div>
    }
}

function row(label: string, value: any) {
    return <React.Fragment key={label}><div className="col-sm-4">{label}</div><div className="col-sm-8">{value}</div></React.Fragment>;
}

const schema: ItemSchema[] = [
    {
        name: 'subs',
        type: 'arr',
        arr: [
            { name: 'pack', type: 'object' } as ObjectSchema,
            { name: 'retail', type: 'number' } as NumSchema,
            { name: 'vipPrice', type: 'number' } as NumSchema,
            { name: 'currency', type: 'string' },
            { name: 'quantity', type: 'number' } as NumSchema,
            { name: 'inventoryAllocation', type: 'object' } as ObjectSchema,
            { name: 'futureDeliveryTimeDescription', type: 'string' }
        ]
    } as ArrSchema
];

export class ViewProductChemicalBase<S extends VMSub> extends ViewMain<VMProductChemical, VMSub> {
    protected param: { onQuantityChanged: (product: number, pack: number, quantity: number, price: number, currency: number) => Promise<void> };

    private onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        if (this.param === undefined) return;
        let { onQuantityChanged } = this.param;
        if (onQuantityChanged === undefined) return;
        let { data } = context;
        let { pack, retail, vipPrice, currency } = data;
        let price = vipPrice || retail;
        await onQuantityChanged(this.main.product.id, pack, value, price, currency);
    }

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
            /*
            deliveryTimeUI = inventoryAllocation.map((v, index) => {
                return <div key={index}>
                    {tv(v.warehouse, (values: any) => <>{values.name}</>)}
                    {v.deliveryTimeDescription}
                </div>
            });
            */
            deliveryTimeUI = <div className="text-success">国内现货</div>
        } else {
            deliveryTimeUI = <div>期货:{futureDeliveryTimeDescription}</div>
        }
        let packLabel = <small className="text-muted">包装：</small>;
        return <LMR className="mx-3" right={right}>
            <div><b>{tv(pack)}</b></div>
            {deliveryTimeUI}
        </LMR>;
    }

    render(): JSX.Element {
        let uiSchema: UiSchema = {
            items: {
                subs: {
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

        return <>
            <div className="px-2 py-2 bg-white mb-3">
                {tv(this.main.product)}
            </div>
            <Form schema={schema} uiSchema={uiSchema} formData={this.main} />
        </>
    }
}

export class ViewProductChemical extends ViewProductChemicalBase<VMSub> {
}

export class ViewProductOrdering extends ViewMain<VmProductChemicalInventory, VMSubInventory> {
    render(): JSX.Element {
        return super.render();
    }
}

export class ViewCartRow extends ViewProductChemicalBase<VMSub> {
    render(): JSX.Element {
        return <>{super.render()}
            cartrow
        </>;
    }
}
