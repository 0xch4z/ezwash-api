const isPrice = s => typeof s === 'string' && /\d+.\d{2}/.test(s);
const isObjectId = s => /^[a-f0-9]{24}$/i.test(s);
