import * as React from 'react';
import { View } from 'tonva-tools';
import { CCart } from './CCart';
import { List } from 'C:/Users/ligsh/tonva/tonva-react-form/dist';
import { tv } from 'tonva-react-usql';

export class VCartToBePurchased extends View<CCart> {

    private renderProduct = (product: any) => <strong>{product.description}</strong>
    private renderPack = (pack: any) => <>{pack.name}</>
    private onCartItemRender = (item: any) => {
        return <div className="row">
            <div className="col-3">
                <img src="favicon.ico" alt={item.product.obj.description} />
            </div>
            <div className="col-9">
                <div className="row">
                    <div className="col-12">
                        {tv(item.product, this.renderProduct)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">{tv(item.pack, this.renderPack)}</div>
                    <div className="col-3"><strong className="text-danger">{item.price}</strong></div>
                    <div className="col-6 text-right d-flex">
                        <span className="px-4 bg-light">{item.quantity}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">货期</div>
                </div>
            </div>
        </div>
    }

    render(selectedCartItem: any) {
        return <List items={selectedCartItem} item={{ render: this.onCartItemRender }} />
    }
}