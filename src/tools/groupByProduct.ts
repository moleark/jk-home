
export function groupByProduct(packItems: any[]) {
    let result: any[] = [];
    for (let cd of packItems) {
        let { product, pack, quantity, price, currency } = cd;
        let packRow: any = {
            pack: pack.id,
            price: price,
            quantity: quantity,
            currency: currency && currency.id
        }
        let cpi = result.find(e => e.product === product.id);
        if (cpi === undefined) {
            cpi = { product: product.id, packs: [] };
            result.push(cpi);
        }
        cpi.packs.push(packRow);
    }
    return result;
}

export function orderItemGroupByProduct(packItems: any[]) {
    let result: any[] = [];
    for (let cd of packItems) {
        let { product, pack, quantity, price, currency } = cd;
        let cpi = result.find(e => e.product.id === product.id);
        if (cpi === undefined) {
            cpi = { product: product, packs: [] };
            result.push(cpi);
        }
        let packRow: any = {
            pack: pack,
            price: price,
            quantity: quantity,
            currency: currency && currency.id
        }
        cpi.packs.push(packRow);
    }
    return result;
}
