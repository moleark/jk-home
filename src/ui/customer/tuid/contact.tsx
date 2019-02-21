import * as React from 'react';

export const contactUI = {
    content: (values: any) => {
        let { name, mobile, organizationName, addressString } = values;
        return <div className="flex-grow-1">
            <b>
                {name}
            </b>
            &nbsp; {mobile} &nbsp; {organizationName}<br />
            <small>{addressString}</small>
        </div>
    }
}