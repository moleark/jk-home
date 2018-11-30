import * as React from 'react';
import { TuidUI } from "tonva-react-usql";

const product: TuidUI = {
    inputContent: (values: any) => {
        let product = values;
        let left = <div>image</div>
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
                            <div className="col-4 col-md-2 text-muted">产品编号:</div>
                            <div className="col-8 col-md-4">{product.origin}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

const address: TuidUI = {
    inputContent: (values: any) => {
        let {description } = values;
        return <div>
            {description}
        </div>
    }
}

const contact: TuidUI = {
    inputContent: (values: any) => {
        return <div>gee</div>
    }
}

export default {
    product: product,
    address: address,
    contact: contact,
}