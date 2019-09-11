import { AppUI, CApp } from 'tonva';
//import { CCartApp } from '../CCartApp';
import commonUI from './common';
import orderUI from './order';
import productUI from './product';
import customerUI from './customer';
import warehouseUI from './warehouse';
import { jnkTop } from '../me/loginTop';
import AnalyticalChemistry from '../images/AnalyticalChemistry.png';
import LabSupplies from '../images/LabSupplies.png';
import LifeScience from '../images/LifeScience.png';
import MaterialScience from '../images/MaterialScience.png';
import OrganicChemistry from '../images/OrganicChemistry.png';

const ui: AppUI = {
    appName: "百灵威系统工程部/cart",
    CApp: undefined, // CCartApp,
    main: undefined, // VHome,
    uqs: {
        '百灵威系统工程部/common': commonUI,
        '百灵威系统工程部/order': orderUI,
        '百灵威系统工程部/product': productUI,
        '百灵威系统工程部/customer': customerUI,
        '百灵威系统工程部/webUser': customerUI,
        '百灵威系统工程部/warehouse': warehouseUI,
    },
    loginTop: jnkTop,
    version: "1.0.1"
}

export const GLOABLE = {
    CHINA: 44,
    CHINESE: 196,
    SALESREGION_CN: 1,
    ROOTCATEGORY: {
        47: {
            src: OrganicChemistry,
            labelColor: 'text-info',
        },
        470: {
            src: AnalyticalChemistry,
            labelColor: 'text-success',
        },
        1013: {
            src: LifeScience,
            labelColor: 'text-danger',
        },
        1219: {
            src: MaterialScience,
            labelColor: 'text-warning',
        },
        1545: {
            src: LabSupplies,
            labelColor: 'text-primary',
        },
    }
}

/*
export const GLOABLE = {
    CHINA: 43,
    CHINESE: 197,
    SALESREGION_CN: 1,
    ROOTCATEGORY: {
        7: {
            src: OrganicChemistry,
            labelColor: 'text-info',
        },
        430: {
            src: AnalyticalChemistry,
            labelColor: 'text-success',
        },
        986: {
            src: LifeScience,
            labelColor: 'text-danger',
        },
        1214: {
            src: MaterialScience,
            labelColor: 'text-warning',
        },
        1545: {
            src: LabSupplies,
            labelColor: 'text-primary',
        },
    }
}
*/
export default ui;
