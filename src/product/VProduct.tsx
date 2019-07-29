import * as React from 'react';
import { CProduct, renderBrand, productPropItem } from './CProduct';
import {
    VPage, Page, Form, ItemSchema, NumSchema, UiSchema, Field,
    ObjectSchema, RowContext, UiCustom, FormField
} from 'tonva';
import { tv } from 'tonva';
import { observer } from 'mobx-react';
import { MinusPlusWidget } from '../tools/minusPlusWidget';
import { ProductPackRow } from './Product';
import { ViewMainSubs, MainProductChemical } from 'mainSubs';
import { ProductImage } from 'tools/productImage';

const schema: ItemSchema[] = [
    { name: 'pack', type: 'object' } as ObjectSchema,
    { name: 'retail', type: 'number' } as NumSchema,
    { name: 'vipPrice', type: 'number' } as NumSchema,
    { name: 'promotionPrice', type: 'number' } as NumSchema,
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

        let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
        return <div className="mb-3 px-2">
            <div className="py-2"><strong>{description}</strong></div>
            <div>{descriptionC}</div>
            <div className="row mt-3">
                <div className="col-12 col-sm-3">
                    <ProductImage chemicalId={imageUrl} className="w-100" />
                </div>
                <div className="col-12 col-sm-9">
                    <div className="row mx-3">
                        {productPropItem('CAS', CAS, "font-weight-bold")}
                        {productPropItem('产品编号', origin, "font-weight-bold")}
                        {productPropItem('纯度', purity)}
                        {productPropItem('分子式', molecularFomula)}
                        {productPropItem('分子量', molecularWeight)}
                        {renderBrand(brand)}
                    </div>
                </div>
            </div>
        </div>
    }

    private arrTemplet = (item: ProductPackRow) => {
        let { pack, retail, vipPrice, promotionPrice, inventoryAllocation, futureDeliveryTimeDescription } = item;
        let right = null;
        if (retail) {
            let price: number = this.minPrice(vipPrice, promotionPrice);
            let retailUI: any;
            if (price) {
                retailUI = <small className="text-muted"><del>¥{retail}</del></small>;
            }
            else {
                price = retail;
            }
            right = <div className="row">
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center">
                    <small className="text-muted">{retailUI}</small>&nbsp; &nbsp;
                    <span className="text-danger">¥ <span className="h5">{price}</span></span>
                </div>
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center"><FormField name="quantity" /></div>
            </div >
        } else {
            right = <small>请询价</small>
        }

        let deliveryTimeUI = [];
        if (inventoryAllocation && inventoryAllocation.length > 0) {
            deliveryTimeUI = inventoryAllocation.map((v, index) => {
                let { warehouse, quantity, deliveryTimeDescription } = v;
                return <div key={index} className="text-success">
                    {tv(warehouse, (values: any) => <>{values.name}</>)}: {quantity}
                    {deliveryTimeDescription}
                </div>
            });
        } else {
            deliveryTimeUI.push(<div>{futureDeliveryTimeDescription && '期货: ' + futureDeliveryTimeDescription}</div>);
        }
        return <div className="px-2">
            <div className="row">
                <div className="col-6">
                    <div><b>{tv(pack)}</b></div>
                    <div>{deliveryTimeUI.map((v, index) => v)}</div>
                </div>
                <div className="col-6">
                    {right}
                </div>
            </div>
        </div>;
    }

    private onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data } = context;
        let { pack, retail, vipPrice, promotionPrice, currency } = data;
        let price = this.minPrice(vipPrice, promotionPrice) || retail;
        let { cApp } = this.controller;
        let { cartService, cartViewModel } = cApp;
        if (value > 0) {
            await cartService.addToCart(cartViewModel, this.product.id, pack.id, value, price, currency);
        } else {
            await cartService.removeFromCart(cartViewModel, [{ productId: this.product.id, packId: pack.id }]);
        }
    }

    private minPrice(vipPrice: any, promotionPrice: any) {
        if (vipPrice || promotionPrice)
            return Math.min(typeof (vipPrice) === 'number' ? vipPrice : Infinity, typeof (promotionPrice) === 'number' ? promotionPrice : Infinity);
    }

    private uiSchema: UiSchema = {
        Templet: this.arrTemplet,
        items: {
            quantity: {
                widget: 'custom',
                className: 'text-center',
                WidgetClass: MinusPlusWidget as any,
                onChanged: this.onQuantityChanged
            } as UiCustom
        },
    };

    private renderPack = (pack: ProductPackRow) => {
        return <>
            <div className="sep-product-select" />
            <Form className="mx-3" schema={schema} uiSchema={this.uiSchema} formData={pack} />
        </>;
    }

    private page = observer((product: any) => {

        let { cApp } = this.controller;
        let header = cApp.cHome.renderSearchHeader();
        let cartLabel = cApp.cCart.renderCartLabel();
        let viewProduct = new ViewMainSubs<MainProductChemical, ProductPackRow>(this.renderProduct, this.renderPack);
        viewProduct.model = product;
        return <Page header={header} right={cartLabel}>
            <div className="px-2 py-2 bg-white mb-3">{viewProduct.render()}</div>
        </Page>
    })
}