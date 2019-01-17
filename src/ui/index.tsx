import { AppUI, CApp } from "tonva-react-usql";
import { VHome } from './main';
import { CCartApp } from '../CCartApp';
import orderUI from './order';
import productUI from './product';

const ui: AppUI = {
    CApp: CCartApp,
    main: VHome,
    usqs: {
        '百灵威系统工程部/order': orderUI,
        '百灵威系统工程部/product': productUI,
    }
}

export default ui;
