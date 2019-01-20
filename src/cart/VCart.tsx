import * as React from 'react';
import { VPage, Page, Form, ObjectSchema, NumSchema, ArrSchema, UiSchema, UiArr, Field, UiCustom, RowContext } from 'tonva-tools';
import { CCart } from './CCart';
import { List, LMR, FA } from 'tonva-react-form';
import { tv, BoxId } from 'tonva-react-usql';
import { observer } from 'mobx-react';
import { Product } from 'product/Product';
import { CartItem } from './Cart';
import { MinusPlusWidget } from 'tools/minusPlusWidget';

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

    private inputRefs: { [item: number]: HTMLInputElement } = {}
    private checkBoxs: { [packId: number]: HTMLInputElement } = {}

    private mapInputRef = (input: HTMLInputElement | null, item: any) => {
        if (input === null) return;
        input.value = item.quantity;
        return this.inputRefs[item.pack.id] = input;
    }

    private mapCheckBox = (input: HTMLInputElement | null, item: any) => {
        if (input === null) return;
        input.checked = item.checked || false;
        return this.checkBoxs[item.pack.id] = input;
    }

    async showEntry() {
        this.openPage(this.page);
    }

    private updateChecked = async (item: any) => {

        let input = this.checkBoxs[item.pack.id];
        await this.controller.cart.updateChecked(item, input.checked);
    }

    /**
     *
     */
    private updateQuantity = async (item: any) => {

        let input = this.inputRefs[item.pack.id];
        await this.controller.cart.updateQuantity(item, Number(input.value));
    }

    private minusQuantity = async (item: any) => {

        if (item.quantity > 1)
            await this.controller.cart.updateQuantity(item, item.quantity - 1);
    }

    private plusQuantity = async (item: any) => {

        await this.controller.cart.updateQuantity(item, item.quantity + 1);
    }

    private renderProduct = (product: any) => <strong>{product.description}</strong>
    private renderPack = (pack: any) => {
        return <>{(pack.radiox === 1 ? "" : pack.radiox + '*') + pack.radioy + pack.unit}</>
    }
    private renderItem = (cartItem: CartItem) => {
        let { product, pack, price, quantity } = cartItem;
        let left = <img src="favicon.ico" alt="structure image" />;
        let right = <div className="w-6c text-right">
            <span className="text-primary">{quantity}</span>
        </div>;
        return <LMR left={left} right={right} className="px-3 py-2">
            <div className="px-3">
                <div>
                    {tv(product, this.renderProduct)}
                </div>
                <div className="row">
                    <div className="col-3">{tv(pack, this.renderPack)}</div>
                    <div className="col-3"><strong className="text-danger">{price}</strong></div>
                </div>
                <div className="row">
                    <div className="col-12">货期</div>
                </div>
            </div>
        </LMR>
    }

    private onCartItemRender = (cartItem: CartItem) => {
        let { isDeleted } = cartItem;
        let prod = <>
            {this.renderItem(cartItem)}
        </>;
        let input = <input
            className="text-center"
            style={{ width: "60px" }}
            ref={(input) => this.mapInputRef(input, cartItem)}
            type="number"
            onChange={() => this.updateQuantity(cartItem)} disabled={isDeleted} />;
        let onClick, btnContent;
        let mid;
        if (isDeleted === true) {
            mid = <del>{prod}</del>;
            onClick = () => cartItem.isDeleted = false;
            btnContent = <FA name="rotate-left" />;
        }
        else {
            mid = <div>
                {prod}
            </div>
            onClick = () => cartItem.isDeleted = true;
            btnContent = <FA name="trash-o" />;
        }
        let button = <button className="btn btn-light" type="button" onClick={onClick}>{btnContent}</button>;
        return <LMR className="px-2 py-2"
            left={<input className="mr-3"
                type="checkbox"
                ref={(input) => this.mapCheckBox(input, cartItem)}
                onChange={() => this.updateChecked(cartItem)} disabled={isDeleted} />}
            right={<>{button}</>}>
            {mid}
        </LMR>;
    }

    private CheckOutButton = observer(() => {
        let { checkOut, cart } = this.controller;
        //let { count, amount } = cart.sum;
        let amount = cart.amount.get();
        let check = "去结算";
        let content = amount > 0 ?
            <>{check} ({amount} 元)</> :
            <>{check}</>;
        return <button className="btn btn-success w-100" type="button" onClick={checkOut} disabled={amount <= 0}>
            {content}
        </button>;
    });

    render(params: any): JSX.Element {
        return this.page();
    }

    private onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        //let { row } = context;
        let { data } = context;
        let { product, pack } = data;
        let { retail, currency } = pack;
        let { cCart } = this.controller.cApp;
        await cCart.cart.AddToCart(product, pack, value, retail, currency);
    }

    private productRow = (item: any) => {
        let { product } = item;
        //let {discription} = product;
        return <div className="row">
            <div className="col-sm-6">{tv(product)}</div>
            <div className="col-sm-6"><Field name="packs" /></div>
        </div>;
    }

    private packsRow = (item: any) => {
        let { pack, quantity, price } = item;
        //let {name} = pack;
        return <div className="d-flex align-items-center">
            <div className="d-flex flex-grow-1">
                <div className="flex-grow-1">{tv(pack)}</div>
                <div className="w-6c mr-4 text-right"><span className="text-danger h5">{price}</span>元</div>
            </div>
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
                RowContainer: (content: JSX.Element) => <div className="p-3">{content}</div>,
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
                                onChanged: this.onQuantityChanged
                            }
                        }
                    } as UiArr
                }
            } as UiArr
        }
    }

    private cartData = {
        list: [
            {
                product: { discription: 'aaa' },
                packs: [
                    {
                        pack: { name: '1g' },
                        quantity: 10,
                        price: 12.10,
                    },
                    {
                        pack: { name: '10g' },
                        quantity: 12,
                        price: 22.10,
                    }
                ]
            },
            {
                product: { discription: 'bbb' },
                packs: [
                    {
                        pack: { name: '1g' },
                        quantity: 13,
                        price: 12.10,
                    },
                    {
                        pack: { name: '10g' },
                        quantity: 14,
                        price: 22.10,
                    }
                ]
            }
        ]
    };

    private page = () => {
        let { cart } = this.controller;

        let cartData = {
            list: cart.items.map(v => {
                return {
                    product: v.product,
                    packs: [{
                        pack: v.pack,
                        quantity: v.quantity,
                        price: v.price,
                    }]
                }
            })
        };

        return <>
            <header className="p-3 text-center">购物车</header>
            <Form className="bg-white" schema={cartSchema} uiSchema={this.uiSchema} formData={cartData} />
            <div className="row">
                <div className="col-12">
                    <List items={cart.items} item={{ render: this.onCartItemRender }} />
                </div>
            </div>
            <footer><this.CheckOutButton /></footer>
        </>
    }
}
