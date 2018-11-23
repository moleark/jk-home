import * as React from 'react';
import { TuidUI } from "tonva-react-usql";

const product: TuidUI = {
    inputContent: (values: any) => {
        let { description } = values;
        return <div>{description}</div>
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

export default {
    product: product,
    address: address,
}