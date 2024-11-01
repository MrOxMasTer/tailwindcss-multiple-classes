// const regExp = /(?:(^|["'`]|\s))((\w+?):\((.+)\))(?:(["'`]|\s|$))/g;

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

	const regExp = new RegExp(
		`(?:(^|[\"\'\`\\${separator}]|\\s))((\\w+?):${opBracketRegExp}(.+)${clBracketRegExp})(?:([\"\'\`\\${separator}]|\\s|$))`,
		"g",
	);

	const splitClasses = (content = "") => findPseudo(content).split(separator);

	const findPseudo = (content = "") => {
		return content.replaceAll(regExp, (match, p1, p2, p3, p4, p5) => {
			const classes = p4.trim();
			const arrClasses = splitClasses(classes);

			const transformClasses = arrClasses.map((item) => `${p3}:${item}`);
			const strClasses = transformClasses.join(" ");

			return p1 + strClasses + p5;
		});
	};

	return (content = "") => findPseudo(content);
};

module.exports = createTransform;
