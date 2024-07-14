export function isObjectEmpty(object: Record<string, string>) {
    return Object.keys(object).length === 0 ? true : false;
}