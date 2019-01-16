import * as React from 'react';
import { observer } from 'mobx-react';
import { BoxId, Tuid } from "../entities";
import { PureJSONContent } from '../controllers';

interface Props {
    tuidValue: number|BoxId, 
    ui?: (values?:any, x?:any)=>JSX.Element,
    x?: any,
    nullUI?: ()=>JSX.Element
}

function boxIdContent(bi: any, templet, x) {
    let {id, _$tuid, _$com} = bi;
    let t:Tuid = _$tuid;
    if (t === undefined) {
        if (templet !== undefined) return templet(bi, x);
        return PureJSONContent(bi, x);
    }
    let com = templet || _$com;
    if (com === undefined) {
        com = bi._$com = t.getTuidContent();
    }
    let val = t.valueFromId(id);
    if (typeof val === 'number') val = {id: val};
    if (templet !== undefined) return templet(val, x);
    return React.createElement(com, val);
}

const Tv = observer(({tuidValue, ui, x, nullUI}:Props) => {
    let ttv = typeof tuidValue;
    switch (ttv) {
        default:
            if (ui === undefined)
                return <>{ttv}-{tuidValue}</>;
            else
                return ui(tuidValue, x);
        case 'undefined':
            if (nullUI === undefined) return <>null</>;
            return nullUI();
        case 'object':
            if (tuidValue === null) {
                if (nullUI === undefined) return <>null</>;
                return nullUI();
            }
            return boxIdContent(tuidValue, ui, x);
        case 'number':
            return <>id...{tuidValue}</>;
    }
});

export const tv = (tuidValue:number|BoxId, ui?:(values?:any, x?:any)=>JSX.Element, x?:any, nullUI?:()=>JSX.Element):JSX.Element => {
    return <Tv tuidValue={tuidValue} ui={ui} x={x} nullUI={nullUI} />;
};
