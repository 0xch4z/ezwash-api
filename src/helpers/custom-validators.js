export const isPrice = s => /\d+.\d{2}/.test(s);
export const isObjectId = s => /^[a-f0-9]{24}$/i.test(s);
