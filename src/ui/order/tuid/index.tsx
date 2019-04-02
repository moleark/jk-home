import * as React from 'react';
import { TuidUI } from "tonva-react-uq";
import { countryUI, addressUI } from 'ui/common';
import { productUI } from 'ui/product/tuid/product';
import { contactUI } from 'ui/customer/tuid/contact';

export default {
    productx: productUI,
    address: addressUI,
    country: countryUI,
    province: countryUI,
    city: countryUI,
    county: countryUI,
    contact: contactUI,
}