const createTransform = require('./');

const expand = createTransform({});

const str = 'flex mm:(bg-red,text-green,hover:(text-3xl))';
console.log(expand(str));

// const str2 = 'mm:{text;green;red;blue}';
// const expand2 = createTransform({ separator: ';', opBracket: '{', clBracket: '}' });

// console.log(expand2(str2));
