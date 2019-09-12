import * as React from 'react';
import { tv, View } from 'tonva';
import { CProduct } from './CProduct';
import { observer } from 'mobx-react';

export class VProductDelivery extends View<CProduct> {

    render(param: any): JSX.Element {
        let { obj: packObj, id: packId } = param;
        let { owner: productId } = packObj;
        let { controller } = this;
        let { currentSalesRegion } = controller.cApp;
        controller.getInventoryAllocation(productId, packId, currentSalesRegion);
        controller.getFutureDeliveryTimeDescription(productId, currentSalesRegion);
        return <this.content packId={packId} productId={productId} />;
    }

    private content = observer((param: any) => {

        let deliveryTimeUI;
        let { packId, productId } = param;
        let { inventoryAllocationContainer, futureDeliveryTimeDescriptionContainer } = this.controller;
        let inventoryAllocation = inventoryAllocationContainer[packId];
        let futureDeliveryTimeDescription = futureDeliveryTimeDescriptionContainer[productId];
        if (inventoryAllocation && inventoryAllocation.length > 0) {
            deliveryTimeUI = inventoryAllocation.map((v, index) => {
                let { warehouse, quantity, deliveryTimeDescription } = v;
                if (quantity > 0) {
                    return <div key={index} className="text-success">
                        {tv(warehouse, (values: any) => <span className="small">{values.name}</span>)}: {(quantity > 10 ? '>10' : quantity)}
                        {deliveryTimeDescription}
                    </div>
                }
            });
        } else {
            deliveryTimeUI = <div>{futureDeliveryTimeDescription && '期货: ' + futureDeliveryTimeDescription}</div>;
        }
        return deliveryTimeUI;
    })
}