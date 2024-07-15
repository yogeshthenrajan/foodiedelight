/**
 * This will check weather the given object is empty or not by checking keys length.
 * 
 * @param {Record<string, string>} - Object
 * @returns {Boolean}
 */
export function isObjectEmpty(object: Record<string, string>) {
    return Object.keys(object).length === 0 ? true : false;
}