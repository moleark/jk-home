import * as React from 'react';
import { Image } from 'tonva-tools';

const imagePath = "http://www.jkchemical.com/static/Structure/";

interface ProductImageProps {
    className?: string;
    style?: React.CSSProperties;
    chemicalId: string;
}

export function ProductImage(props: ProductImageProps) {

    let {style, className, chemicalId} = props;
    return <Image src={chemicalId && (imagePath + chemicalId.substr(0, 3) + '/' + chemicalId + '.png')} style={style} className={className} />;
}
