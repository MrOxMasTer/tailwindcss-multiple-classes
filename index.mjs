const regExp = /(?:(^|["'`]|\s))((\w+?):\((.+)\))(?:(["'`]|\s|$))/g;

const splitClasses = (content = '', separator = ' ') => findPseudo(content).split(separator);

const findPseudo = (content) => {
	return content.replaceAll(regExp, (match, p1, p2, p3, p4, p5) => {
		const classes = p4.trim();
		const arrClasses = splitClasses(classes, ' ');

		const transformClasses = arrClasses.map((item) => p3 + ':' + item);
		const joinClasses = transformClasses.join(' ');

		return p1 + joinClasses + p5;
	});
};

const createTransform = () => {
	return (content) => findPseudo(content);
};

export default createTransform;
