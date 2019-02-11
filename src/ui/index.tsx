import { AppUI, CApp } from "tonva-react-uq";
import { VHome } from './main';
import { CCartApp } from '../CCartApp';
import orderUI from './order';
import productUI from './product';
import customerUI from './customer';

const ui: AppUI = {
    CApp: CCartApp,
    main: VHome,
    uqs: {
        '百灵威系统工程部/order': orderUI,
        '百灵威系统工程部/product': productUI,
        '百灵威系统工程部/webUser': customerUI,
    }
}

export default ui;
