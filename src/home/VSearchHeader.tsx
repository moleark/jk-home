import * as React from 'react';
import { View } from 'tonva-tools';
import { CHome } from './CHome';
import { SearchBox } from 'tonva-react-form';

export class VSearchHeader extends View<CHome> {

    private onSearch = async (key: string) => {
        let { cProduct } = this.controller.cApp;
        cProduct.start(key);
    }

    render(param: any) {
        return <SearchBox className="px-1 w-100"
            size={param}
            onSearch={this.onSearch}
            placeholder="搜索品名、编号、CAS、MDL等" />
    }
}