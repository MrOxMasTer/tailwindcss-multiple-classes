// const regExp = /(?:(^|["'`]|\s))((\w+?):\((.+)\))(?:(["'`]|\s|$))/g;

const createTransform = ({ separator, opBracket, clBracket } = {}) => {
	const opts = {
		separator: ',',
		opBracket: '(',
		clBracket: ')',
	};

	let regExp = /(?:(^|["'`]|\s))((\w+?):\((.+)\))(?:(["'`]|\s|$))/g;

	separator && (opts.separator = separator);
	opBracket && (opts.opBracket = opBracket);
	clBracket && (opts.clBracket = clBracket);

	if (opBracket || clBracket) {
		regExp = new RegExp(`(?:(^|[\"\'\`]|\\s))((\\w+?):\\${opts.opBracket}(.+)\\${opts.clBracket})(?:([\"\'\`]|\\s|$))`, 'g');
	}

	const splitClasses = (content = '') => findPseudo(content).split(opts.separator);

	const findPseudo = (content = '') => {
		return content.replaceAll(regExp, (match, p1, p2, p3, p4 = '', p5) => {
			const classes = p4.trim();
			const arrClasses = splitClasses(classes);

			const transformClasses = arrClasses.map((item) => p3 + ':' + item);
			const strClasses = transformClasses.join(' ');

			return p1 + strClasses + p5;
		});
	};

	return (content = '') => findPseudo(content);
};

module.exports = createTransform;
