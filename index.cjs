// const regExp = /(?:(^|["'`]|\s))((\w+?):\((.+)\))(?:(["'`]|\s|$))/g;
// /(?:([\"\'\`\s]|\s))(?<left>([\w\(\)\[\]\-\:]+)):(?<right>([\w\(\)\[\]\-\:]+\,)*([\w\(\)\[\]\-\:]+\,?)+?)(?:([\"\'\`\s]))/g;
// 	/(?:([\"\'\`\s]))(?<left>[^\s,<>]+):(?<right>([^\s,<>]+\,)*[^\s,<>]+)(?:([\"\'\`\s]))/g;
//  /(?<left>[^\s,<>"'`]+):(?<right>([^\s,<>"'`]+\,?)+)/g;

const split = (
	classes = "",
	{ separator = ",", opBracket = "", clBracket = "" } = {},
) => {
	const arrClasses = [];

	let isBracket = false;

	let startIndex = -1;
	for (let i = 0; i < classes.length; i++) {
		const c = classes[i];

		if (c === opBracket) isBracket = true;
		if (c === clBracket) isBracket = false;

		if (c !== separator) {
			if (startIndex === -1) startIndex = i;
		}

		if (c === separator) {
			if (!isBracket) {
				const str = classes.slice(startIndex, i);
				arrClasses.push(str);
				startIndex = -1;
			}
		}
	}

	if (startIndex !== -1) {
		arrClasses.push(classes.slice(startIndex));
	}

	return arrClasses;
};

const createTransform = ({
	separator = ",",
	opBracket = "",
	clBracket = "",
} = {}) => {
	if (separator && separator.trim() === "") {
		throw new Error("Separator should not be empty");
	}

	const isVoidOpBracket = opBracket.trim() === "";
	const isVoidClBracket = clBracket.trim() === "";

	if (
		!(
			(isVoidOpBracket && isVoidClBracket) ||
			(!isVoidOpBracket && !isVoidClBracket)
		)
	) {
		throw new Error("The brackets must either be both, or they should not be");
	}

	const opBracketRegExp = opBracket ? `\\${opBracket}` : "";
	const clBracketRegExp = clBracket ? `\\${clBracket}` : "";

	const separatorRegExp = `\\${separator}`;

	//! First chance:

	// const regExp =
	// 	/(?:([\"\'\`\s]))(?<left>[^\s,<>]+):(?<right>([^\s,<>]+\,)*[^\s,<>]+)(?:([\"\'\`\s]))/g;

	// const splitClasses = (content = "") => findPseudo(content).split(separator);

	// const findPseudo = (content = "") => {
	// 	return content.replaceAll(
	// 		regExp,
	// 		(match, p1, p2, p3, p4, p5, p6, p7, groups, p9) => {
	// 			const classes = groups.right.trim();
	// 			const arrClasses = splitClasses(classes);

	// 			const transformClasses = arrClasses.map(
	// 				(item) => `${groups.left}:${item}`,
	// 			);
	// 			const strClasses = transformClasses.join(" ");

	// 			return p1 + strClasses + p5;
	// 		},
	// 	);
	// };

	//! Second chance:
	// const regExp = new RegExp(
	// 	`(?<left>[^\\s,<>\"\'\`]+):(?<right>([^\\s,<>\"\'\`]+${separatorRegExp}?)+)`,
	// 	"g",
	// );

	// const findPseudo = (content = "") => {
	// 	return content.replaceAll(regExp, (match, p1, p2, p3, p4, p5, groups) => {
	// 		const classes = groups.right.trim();
	// 		const arrClasses = classes.split(separator).map((str) => findPseudo(str));

	// 		const transformClasses = arrClasses.map(
	// 			(item) => `${groups.left}:${item}`,
	// 		);
	// 		const strClasses = transformClasses.join(" ");

	// 		return strClasses;
	// 	});
	// };

	//! Thirty chance:
	// const regExp = new RegExp(
	// 	`(?<left>[^\\s,<>\"\'\`]+):${opBracketRegExp}(?<right>([^\\s,<>\"\'\`]+${separatorRegExp}?)+)${clBracketRegExp}`,
	// 	"g",
	// );

	// const findPseudo = (content = "") => {
	// 	return content.replaceAll(regExp, (match, p1, p2, p3, p4, p5, groups) => {
	// 		const classes = groups.right.trim();

	// 		const arrClasses1 = findPseudo(classes);
	// 		const arrClasses2 = arrClasses1.split(separator);
	// 		const arrClasses3 = arrClasses2.map((item) => item.split(" "));
	// 		const arrClasses = arrClasses3.flat(Number.POSITIVE_INFINITY);

	// 		const transformClasses = arrClasses.map(
	// 			(item) => `${groups.left}:${item}`,
	// 		);
	// 		const strClasses = transformClasses.join(" ");

	// 		return strClasses;
	// 	});
	// };

	//! fourth chance:

	const regExp = new RegExp(
		`(?<left>[^\\s,<>\"\'\`]+):((${opBracketRegExp}(?<rightOne>([^\\s,<>\"\'\`]+${separatorRegExp}?)+)${clBracketRegExp})|(?<rightTwo>([^\\s,<>\"\'\`]+${separatorRegExp}?)+))`,
		"g",
	);

	const findPseudo = (content = "") => {
		return content.replaceAll(
			regExp,
			(match, p1, p2, p3, p4, p5, p6, p7, p8, p9, groups, p10) => {
				const classes = groups.rightOne ?? groups.rightTwo;

				const arrClasses1 = split(classes, {
					separator,
					opBracket,
					clBracket,
				});

				const arrClasses2 = arrClasses1.map((item) => findPseudo(item));
				const arrClasses3 = arrClasses2.map((item) => item.split(" "));
				const arrClasses = arrClasses3.flat(Number.POSITIVE_INFINITY);

				const transformClasses = arrClasses.map(
					(item) => `${groups.left}:${item}`,
				);
				const strClasses = transformClasses.join(" ");

				return strClasses;
			},
		);
	};

	return (content = "") => findPseudo(content);
};

module.exports = createTransform;
