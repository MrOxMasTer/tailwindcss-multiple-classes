const createTransform = require("./");

const expand = createTransform({
	separator: ",",
	opBracket: "(",
	clBracket: ")",
});

// const str0 = `const Main = () => {
// 	return <main className="flex mm:bg-red,text-green,hover:text-3xl,pl-2">...</main>;
// };`;

// const str = `const main = () => {
// 	return <main className="flex supports-[not(container-type:inline-size)]:min-height-[10px]:h-10,sm:h-20,md:h-30,lg:h-40,xl:h-50,hover:(pl-4,py-3) pl-3">...</main>;};`;

// const str = "@apply mm:bg-redOrange,text-green;";

const str = `
	/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var f=require("react"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l;exports.jsx=q;exports.jsxs=q;
`;

console.log(expand(str));
