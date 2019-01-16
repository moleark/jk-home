import * as React from 'react';
import { TuidUI } from "tonva-react-usql";
import { productUI } from 'ui/common';

const address: TuidUI = {
    content: (values: any) => {
        let {description } = values;
        return <div>
            {description}
        </div>
    }
}

const contact: TuidUI = {
    content: (values: any) => {
        return <div>gee</div>
    }
}

export default {
    product: productUI,
    productx: productUI,
    address: address,
    contact: contact,
}