import * as React from 'react';
import { View, tv, FormField, ObjectSchema, NumSchema, UiSchema, UiCustom, RowContext, BoxId, Form } from 'tonva';
import { CProduct, productPropItem, renderBrand } from './CProduct';
import { ProductImage } from 'tools/productImage';
import { observer } from 'mobx-react';
import { MinusPlusWidget } from 'tools';
import { observable } from 'mobx';

export class VCartProuductView extends View<CProduct> {

    render(param: any): JSX.Element {
        return <>{tv(param, this.renderCartProduct)}</>;
    }


    private renderCartProduct = (product: any) => {
        let { id, brand, description, descriptionC, origin, imageUrl } = product;

        return <div className="row d-flex mb-3 px-2">
            <div className="col-12">
                <div className="py-2">
                    <strong>{description}</strong>
                </div>
                <div className="pb-2">
                    <strong>{descriptionC}</strong>
                </div>
                <div className="row">
                    <div className="col-3">
                        <ProductImage chemicalId={imageUrl} className="w-4c h-4c" />
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {this.controller.renderChemicalInfo(product)}
                            {productPropItem('编号', origin)}
                            {tv(brand, renderBrand)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    };
}


export class VProuductView extends View<CProduct> {

    render(param: any): JSX.Element {
        return <>{tv(param, this.renderProduct)}</>;
    }

    private renderProduct = (product: any) => {
        let { brand, description, descriptionC, origin, imageUrl } = product;
        return <div className="d-block mb-4 px-3">
            <div className="py-2">
                <div><strong>{description}</strong></div>
                <div>{descriptionC}</div>
            </div>
            <div className="row">
                <div className="col-3">
                    <ProductImage chemicalId={imageUrl} className="w-100" />
                </div>
                <div className="col-9">
                    <div className="row">
                        {productPropItem('产品编号', origin)}
                        {tv(brand, renderBrand)}
                        {this.controller.renderChemicalInfo(product)}
                    </div>
                </div>
            </div>
        </div>
    }
}

export class VProductPrice extends View<CProduct> {

    private schema = [
        { name: 'pack', type: 'object' } as ObjectSchema,
        { name: 'quantity', type: 'number' } as NumSchema,
    ];

    private onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data } = context;
        let { pack, retail, vipPrice, promotionPrice, currency } = data;
        let price = 0; //this.minPrice(vipPrice, promotionPrice) || retail;
        let { cApp } = this.controller;
        let { cart } = cApp;
        if (value > 0)
            await cart.add(this.product, pack, value, price, currency);
        else
            await cart.removeFromCart([{ productId: this.product.id, packId: pack.id }]);
    }

    private uiSchema: UiSchema = {
        items: {
            pack: { visible: false },
            quantity: {
                widget: 'custom',
                label: null,
                className: 'text-center',
                WidgetClass: MinusPlusWidget,
                onChanged: this.onQuantityChanged
            } as UiCustom
        }
    }

    @observable private prices: any;
    private initPrices = async (productId: number, salesRegionId: number) => {
        if (this.prices === undefined)
            this.prices = this.controller.getProductPrice(productId, salesRegionId);
    }

    private product: BoxId;
    render(param: any): JSX.Element {
        this.product = param;
        let productId = param.id;
        let { currentSalesRegion } = this.controller.cApp;
        this.controller.getProductPrice(productId, currentSalesRegion);
        return <this.content productId={productId} SalesRegionId={currentSalesRegion} />;
    }

    private content = observer((param?: any) => {
        let priceUI;
        let { productId, SalesRegionId } = param;

        let { renderDeliveryTime } = this.controller;
        // let prices = productPriceContainer[productSalesRegion];
        this.initPrices(productId, SalesRegionId);
        if (this.prices && this.prices.length > 0) {
            priceUI = this.prices.filter(e => e.discountinued === 0 && e.expireDate > Date.now()).map((v, index) => {
                let { pack, retail } = v;
                if (retail) {
                    return <div className="px-2" key={pack.id}>
                        <div className="row">
                            <div className="col-6">
                                <div><b>{tv(pack)}</b></div>
                                <div>{renderDeliveryTime(pack)}</div>
                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center">
                                        <span className="text-danger">¥ <span className="h5">{retail}</span></span>
                                    </div>
                                    <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center">
                                        <Form schema={this.schema} uiSchema={this.uiSchema} formData={v} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>;
                } else {
                    return <small>请询价</small>
                }
            });
        }
        return priceUI || <div>none</div>;
    })
}