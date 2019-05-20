import { AppUI, CApp } from 'tonva';
import { VHome } from './main';
import { CCartApp } from '../CCartApp';
import commonUI from './common';
import orderUI from './order';
import productUI from './product';
import customerUI from './customer';
import warehouseUI from './warehouse';
import { jnkTop } from '../me/loginTop';

const ui: AppUI = {
    appName: "百灵威系统工程部/cart",
    CApp: CCartApp,
    main: VHome,
    uqs: {
        '百灵威系统工程部/common': commonUI,
        '百灵威系统工程部/order': orderUI,
        '百灵威系统工程部/product': productUI,
        '百灵威系统工程部/customer': customerUI,
        '百灵威系统工程部/webUser': customerUI,
        '百灵威系统工程部/warehouse': warehouseUI,
    },
    loginTop: jnkTop,
}

export default ui;
