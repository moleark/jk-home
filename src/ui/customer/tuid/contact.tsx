import * as React from 'react';

export const contactUI = {
    content: (values: any) => {
        let { name, mobile, addressString } = values;
        return <div className="flex-grow-1">
            <b>
                {name}
            </b>
            &nbsp; {mobile}<br />
            {addressString}
        </div>
    }
}