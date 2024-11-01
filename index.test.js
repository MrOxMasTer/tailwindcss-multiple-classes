const createTransform = require("./");

const expand = createTransform({
	separator: ",",
});

const str = "flex mm:bg-red,text-green,hover:text-3xl";
console.log(expand(str));
