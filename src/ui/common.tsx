import * as React from 'react';
import { TuidUI } from 'tonva-react-uq';

export const productUI: TuidUI = {
    content: (values: any) => {
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
    },
    divs: {
        packx: {
            content: (values: any) => {
                let {radiox, radioy, unit} = values;
                if (radioy === 0) return <>{radiox} {unit}</>;
                if (radiox !== 1) return <>{radiox} &#2df; {radiox}{unit}</>;
                return <>{radioy}{unit}</>;
            }
        }
    }
}
