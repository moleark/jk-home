import * as React from 'react';
import { VPage, Page, Form, ObjectSchema, NumSchema, ArrSchema, UiSchema, UiArr, Field, UiCustom, RowContext } from 'tonva-tools';
import { CCart } from './CCart';
import { List, LMR, FA } from 'tonva-react-form';
import { tv, BoxId } from 'tonva-react-uq';
import { observer } from 'mobx-react';
import { MinusPlusWidget, PackItem } from '../tools';

const cartSchema = [
    {
        name: 'list',
        type: 'arr',
        arr: [
            { name: 'checked', type: 'boolean' },
            { name: 'product', type: 'object' } as ObjectSchema,
            {
                name: 'packs', type: 'arr', arr: [
                    { name: 'pack', type: 'object' } as ObjectSchema,
                    { name: 'price', type: 'number' } as NumSchema,
                    { name: 'quantity', type: 'number' } as NumSchema,
                ]
            }
        ],
    } as ArrSchema
];

export class VCart extends VPage<CCart> {
    async open() {
        this.openPage(this.page);
    }

    protected CheckOutButton = observer(() => {
        let { checkOut, cart } = this.controller;
        //let { count, amount } = cart.sum;
        let amount = cart.amount.get();
        let check = "去结算";
        let content = amount > 0 ?
            <>{check} (¥{amount})</> :
            <>{check}</>;
        return <button className="btn btn-success w-100" type="button" onClick={checkOut} disabled={amount <= 0}>
            {content}
        </button>;
    });

    render(params: any): JSX.Element {
        return <this.tab />;
    }

    private productRow = (item: any) => {
        let { product } = item;
        return <div className="pr-1"><div className="row">
            <div className="col-sm-6">{tv(product)}</div>
            <div className="col-sm-6"><Field name="packs" /></div>
        </div></div>;
    }

    private packsRow = (item: any) => {
        let { pack, quantity, price } = item;
        //let {name} = pack;
        //<div className="d-flex flex-grow-1">
        //</div>
        return <div className="d-flex align-items-center px-2">
            <div className="flex-grow-1">{tv(pack)}</div>
            <div className="w-6c mr-4 text-right"><span className="text-danger h5">¥{price}</span></div>
            <Field name="quantity" />
        </div>;
    }

    private uiSchema: UiSchema = {
        selectable: true,
        deletable: true,
        restorable: true,
        items: {
            list: {
                widget: 'arr',
                Templet: this.productRow,
                ArrContainer: (label: any, content: JSX.Element) => content,
                RowContainer: (content: JSX.Element) => <div className="py-3">{content}</div>,
                //onStateChanged: this.controller.onRowStateChanged,
                items: {
                    packs: {
                        widget: 'arr',
                        Templet: this.packsRow,
                        selectable: false,
                        deletable: false,
                        ArrContainer: (label: any, content: JSX.Element) => content,
                        RowContainer: (content: JSX.Element) => content,
                        RowSeperator: <div className="border border-gray border-top my-3" />,
                        items: {
                            quantity: {
                                widget: 'custom',
                                className: 'text-center',
                                WidgetClass: MinusPlusWidget,
                                onChanged: this.controller.onQuantityChanged
                            }
                        },
                    } as UiArr
                }
            } as UiArr
        }
    }

    protected cartForm = () => {
        let { cart } = this.controller;
        let cartData = cart.data;
        return <Form className="bg-white" schema={cartSchema} uiSchema={this.uiSchema} formData={cartData} />
    };

    private empty() {
        return <div className="py-5 text-center bg-white">你的购物车空空如也</div>
    }

    private test = () => {
        let {cart} = this.controller;
        let row = cart.items[0];
        row.packs[0].quantity = row.packs[0].quantity + 1;
    }

    private testButton = () => <button onClick={()=>this.test()}>test</button>;

    private page = observer((params: any): JSX.Element => {
        let { cart } = this.controller;
        if (cart.count.get() === 0) {
            return <Page header="购物车">{this.empty()}</Page>;
        }
        return <Page header="购物车" footer={<this.CheckOutButton />}>
            <this.cartForm />
        </Page>;
    });

    private tab = observer(() => {
        let { cart } = this.controller;
        let header = <header className="py-2 text-center bg-info text-white">
            <FA className="align-middle" name="shopping-cart" size="2x"/> &nbsp; <span className="h5 align-middle">购物车</span>
        </header>;
        if (cart.count.get() === 0) {
            return <>
                {header}
                {this.empty()}
            </>;
        }
        return <div className="bg-white">
            {header}
            <this.cartForm />
            <footer className="m-3"><this.CheckOutButton /></footer>
        </div>
    });
}
