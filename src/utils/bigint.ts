export function bigintReplacer(key: string, value: any) {
    return typeof value === 'bigint' ? value.toString() : value;
}

export function bigintReviver(key: string, value: any) {
    return typeof value === 'string' && /^\d+n$/.test(value) ? BigInt(value.slice(0, -1)) : value;
}