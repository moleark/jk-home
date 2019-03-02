import * as React from 'react';
import { CProduct, renderBrand } from './CProduct';
import {
    VPage, Page, Form, ItemSchema, ArrSchema, NumSchema, UiSchema, Field,
    ObjectSchema, RowContext, UiCustom, View
} from 'tonva-tools';
import { LMR } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { observer } from 'mobx-react';
import { MinusPlusWidget } from '../tools/minusPlusWidget';
import { ProductPackRow } from './Product';
import { ViewMainSubs, MainProductChemical } from 'mainSubs';

const schema: ItemSchema[] = [
    { name: 'pack', type: 'object' } as ObjectSchema,
    { name: 'retail', type: 'number' } as NumSchema,
    { name: 'vipPrice', type: 'number' } as NumSchema,
    { name: 'currency', type: 'string' },
    { name: 'quantity', type: 'number' } as NumSchema,
    { name: 'inventoryAllocation', type: 'object' } as ObjectSchema,
    { name: 'futureDeliveryTimeDescription', type: 'string' }
];

export class VProduct extends VPage<CProduct> {
    private product: MainProductChemical;

    async open(product: any) {
        this.product = product.main;
        this.openPage(this.page, product);
    }

    private renderProduct = (product: MainProductChemical) => {

        let { brand, description, CAS, purity, molecularFomula, molecularWeight, origin } = product;
        return <div className="mb-3 px-2">
            <div className="py-2"><strong>{description}</strong></div>
            <div className="row">
                <div className="col-3">
                    <img src="favicon.ico" alt="structure" />
                </div>
                <div className="col-9">
                    <div className="row">
                        {this.item('CAS', CAS)}
                        {this.item('纯度', purity)}
                        {this.item('分子式', molecularFomula)}
                        {this.item('分子量', molecularWeight)}
                        {this.item('产品编号', origin)}
                        {renderBrand(brand)}
                    </div>
                </div>
            </div>
        </div>
    }

    private item = (caption: string, value: any) => {
        if (value === null || value === undefined) return null;
        return <>
            <div className="col-4 col-sm-2 text-muted pr-0 small">{caption}</div>
            <div className="col-8 col-sm-4">{value}</div>
        </>;
    }

    private arrTemplet = (item: any) => {
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
            right = <div className="row">
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center"><small className="text-muted">{retailUI}</small>&nbsp; &nbsp; <span className="text-danger">¥ <span className="h5">{price}</span></span></div>
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center"><Field name="quantity" /></div>
            </div >
        } else {
            right = <small>请询价</small>
        }

        let deliveryTimeUI = <></>;
        if (inventoryAllocation && inventoryAllocation.length > 0) {
            deliveryTimeUI = inventoryAllocation.map((v, index) => {
                let { warehouse, quantity, deliveryTimeDescription } = v;
                return <div key={index} className="text-success">
                    {tv(warehouse, (values: any) => <>{values.name}</>)}: {quantity}
                    {deliveryTimeDescription}
                </div>
            });
        } else {
            deliveryTimeUI = <div>{futureDeliveryTimeDescription && '期货: ' + futureDeliveryTimeDescription}</div>
        }
        /*
        return <LMR className="mx-3" right={right}>
            <div className="d-flex flex-column justify-content-between h-100">
                <div><b>{tv(pack)}</b></div>
                <div>{deliveryTimeUI}</div>
            </div>
        </LMR>;
        */
        return <div className="px-2">
            <div className="row">
                <div className="col-6">
                    <div><b>{tv(pack)}</b></div>
                    <div>{deliveryTimeUI}</div>
                </div>
                <div className="col-6">
                    {right}
                </div>
            </div>
        </div>;
    }

    private onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data } = context;
        let { pack, retail, vipPrice, currency } = data;
        let price = vipPrice || retail;
        let { cApp } = this.controller;
        let { cartService, cartViewModel } = cApp;
        if (value > 0) {
            await cartService.AddToCart(cartViewModel, this.product.id, pack.id, value, price, currency);
        } else {
            await cartService.removeFromCart(cartViewModel, [{ productId: this.product.id, packId: pack.id }]);
        }
    }

    private uiSchema: UiSchema = {
        Templet: this.arrTemplet,
        items: {
            quantity: {
                widget: 'custom',
                className: 'text-center',
                WidgetClass: MinusPlusWidget,
                onChanged: this.onQuantityChanged
            } as UiCustom
        },
    };

    private renderPack = (pack: ProductPackRow) => {
        return <>
            <div className="sep-product-select" />
            <Form className="my-3" schema={schema} uiSchema={this.uiSchema} formData={pack} />
        </>;
    }

    private page = observer((product: any) => {

        let { cApp } = this.controller;
        let header = cApp.cHome.renderSearchHeader();
        let cartLabel = cApp.cCart.renderCartLabel();
        /*
            <div className="px-2 py-2 bg-white mb-3">{renderProduct(product.main, 0)}</div>
            <Form schema={schema} uiSchema={this.uiSchema} formData={this.data} />
        */
        let viewProduct = new ViewMainSubs<MainProductChemical, ProductPackRow>(this.renderProduct, this.renderPack);
        viewProduct.model = product;
        return <Page header={header} right={cartLabel}>
            <div className="px-2 py-2 bg-white mb-3">{viewProduct.render()}</div>
        </Page>
    })
}