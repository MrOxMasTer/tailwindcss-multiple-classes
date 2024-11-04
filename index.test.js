const createTransform = require("./");

const expand = createTransform({
	separator: ",",
	opBracket: "(",
	clBracket: ")",
});

// const str0 = `const Main = () => {
// 	return <main className="flex mm:bg-red,text-green,hover:text-3xl,pl-2">...</main>;
// };`;

const str = `const main = () => {
	return <main className="flex supports-[not(**)]:min-height-[10.1px]:h-10,sm:h-20,md:h-30,lg:h-40,xl:h-50,hover:(pl-4,py-3) pl-3">...</main>;};`;

console.log(expand(str));
