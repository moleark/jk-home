import { AppUI, CApp } from "tonva-react-uq";
import { VHome } from './main';
import { CCartApp } from '../CCartApp';
import orderUI from './order';
import productUI from './product';
import customerUI from './customer';
import warehouseUI from './warehouse';

const ui: AppUI = {
    appName: "百灵威系统工程部/cart",
    CApp: CCartApp,
    main: VHome,
    uqs: {
        '百灵威系统工程部/order': orderUI,
        '百灵威系统工程部/product': productUI,
        '百灵威系统工程部/customer': customerUI,
        '百灵威系统工程部/webUser': customerUI,
        '百灵威系统工程部/warehouse': warehouseUI,
    }
}

export default ui;
