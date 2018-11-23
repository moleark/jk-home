import { AppUI, CApp } from "tonva-react-usql";
import { VHome } from 'home/VHome';
import { CCartApp } from 'home/CCartApp';
import cartUI from './cart';

const ui: AppUI = {
    CApp: CCartApp,
    main: VHome,
    usqs: {
        '百灵威系统工程部/cart': cartUI,
    }
}

export default ui;