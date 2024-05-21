const createTransform = require('./index.cjs');

const expand = createTransform();

const str = 'mm:(text,green,red,blue)';
console.log(expand(str));

const str2 = 'mm:{text;green;red;blue}';
const expand2 = createTransform({ separator: ';', opBracket: '{', clBracket: '}' });

console.log(expand2(str2));
