import * as React from 'react';
import { VPage, Page, Form, ItemSchema, ArrSchema, NumSchema, UiSchema, UiArr, Field, StringSchema, Context, ObjectSchema } from 'tonva-tools';
import { CProduct } from './CProduct';
import { List, LMR, FA, SearchBox } from 'tonva-react-form';
import { tv, BoxId } from 'tonva-react-usql';
import { observer } from 'mobx-react';
import { MinusPlusWidget } from './minusPlusWidget';
import { RowContext } from 'tonva-tools/ui/form/widgets';
//import { cCartApp } from 'ui/CCartApp';

interface PackRow {
    pack: BoxId;
    input: HTMLInputElement;
    retail: number;
    vipPrice: number;
    currency: any;
}

const schema:ItemSchema[] = [
    {
        name: 'list',
        type: 'arr',
        arr: [
            {name: 'pack', type: 'object'} as ObjectSchema, 
            {name: 'retail', type: 'number'} as NumSchema,
            {name: 'vipPrice', type: 'number'} as NumSchema,
            {name: 'currency', type: 'string'},
            {name:'quantity', type: 'number'} as NumSchema
        ]
    } as ArrSchema
];

export class VProduct extends VPage<CProduct> {
    private data:any;
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
                    }
                } as UiArr,
            }
        };
        let { packTuid } = this.controller;
        this.packRows = [];
        let coll: { [packId: number]: PackRow } = {};
        for (let pr of product.prices) {
            let packRow: PackRow = {
                pack: pr.pack,
                retail: pr.retail,
                vipPrice: pr.vipPrice,
                currency: pr.currency,
            } as any;
            let packId = pr.pack.id;
            coll[packId] = packRow;
            this.packRows.push(packRow);
        }
        for (let pk of product.packx) {
            let { id } = pk;
            let packRow = coll[id];
            if (packRow === undefined) {
                packRow = {} as any;
                this.packRows.push(packRow);
                packRow.pack = packTuid.boxId(id);
            }
        }
        this.data = {
            list: this.packRows,
        };

        this.openPage(this.page, product);
    }

    private onQuantityChanged = async (context:RowContext, value:any, prev:any) => {
        let {row} = context;
        let {data} = row;
        //alert('prev='+prev + ' value=' + value);
        let { pack, retail, currency } = data;
        let { cCart } = this.controller.cApp;
        await cCart.cart.AddToCart(pack, value, retail, currency);
    }

    //context:Context, name:string, value:number
    private arrTemplet = (item: any) => {
        //let a = context.getValue('');
        let {pack, retail, vipPrice} = item;
        let right = <div className="d-flex"><Field name="quantity" /></div>;
        return <LMR className="mx-3" right={right}>
            <div>{tv(pack, this.renderPack)}</div>
            <div>retail:{retail} vipPrice:{vipPrice}</div>
        </LMR>;
    }

    private renderPack = (pack:any):JSX.Element => {
        let {radiox, radioy, unit} = pack;
        return <>{radiox} x {radioy} {unit}</>;
    }

    private inputRef = (input: HTMLInputElement | null, packRow: PackRow) => {
        if (input === null) return;
        packRow.input = input;
    }

    private onProductPackRender = (packRow: PackRow, index: number) => {
        let { pack, retail, currency } = packRow;
        let right = <>
            <input
                className="text-center"
                style={{ width: "60px" }}
                ref={(input) => this.inputRef(input, packRow)}
                type="number"
                defaultValue="1" />
            <button type="button"
                className="btn btn-light"
                onClick={() => this.onProductPackClicked(packRow)}>
                <FA name="cart-plus" className="text-info" />
            </button>
            <button type="button" className="btn btn-light"><FA name="heart-o" className="text-danger small" /></button>
        </>
        return <LMR className="pt-3" right={right}>
            <div className="row">
                <div className="col-2">{pack.obj.name}</div>
                <div className="col-2">{retail}{currency && currency.name}</div>
                <div className="col-2">{retail}</div>
            </div>
        </LMR>
    };

    private onProductPackClicked = async (packRow: PackRow) => {

        let { pack, retail, currency } = packRow;
        let { cCart } = this.controller.cApp;
        let input = packRow.input;
        await cCart.cart.AddToCart(pack, Number(input.value), retail, currency);
    }

    private page = observer((product1: any) => {

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
            <div className="px-2 py-2 bg-white">{tv(product)}</div>
            <Form schema={schema} uiSchema={this.uiSchema} formData={this.data} />

            <List items={this.packRows} item={{ render: this.onProductPackRender }} header={listHeader} className="px-2 bg-white" />
        </Page>
    })



    private renderChemical = (chemical: any, purity: string) => {

        return <>
            <div className="col-4 col-md-2 text-muted">CAS:</div>
            <div className="col-8 col-md-4">{chemical.CAS}</div>
            <div className="col-4 col-md-2 text-muted">纯度:</div>
            <div className="col-8 col-md-4">{purity}</div>
            <div className="col-4 col-md-2 text-muted">分子式:</div>
            <div className="col-8 col-md-4">{chemical.molecularFomula}</div>
            <div className="col-4 col-md-2 text-muted">分子量:</div>
            <div className="col-8 col-md-4">{chemical.molecularWeight}</div>
        </>
    }

    private renderBrand = (brand: any) => {
        return <>
            <div className="col-4 col-md-2 text-muted">品牌:</div>
            <div className="col-8 col-md-4">{brand.name}</div>
        </>
    }

    private productRow = (product: any, index: number) => {

        return <div className="row d-flex">
            <div className="col-12">
                <div className="row py-2">
                    <div className="col-12"><strong>{product.description}</strong></div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <img src="favicon.ico" alt="structure" />
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {tv(product.chemical, this.renderChemical, product.purity)}
                            <div className="col-4 col-md-2 text-muted">产品编号:</div>
                            <div className="col-8 col-md-4">{product.origin}</div>
                            {tv(product.brand, this.renderBrand)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

}