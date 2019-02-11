import { is } from 'immutable';
import { createSelectorCreator, defaultMemoize  } from 'reselect';

const checkAndLog = (a, b) => {
	let result = is(a, b);
	if (!result) {
		console.log(
			a && a.toJS ? a.toJS() : a,
			b && b.toJS ? b.toJS() : b,
			result
		);
	}
	return result;
};

export default (...args) => args[0] === true
	? createSelectorCreator(defaultMemoize, checkAndLog)(...args.slice(1))
	: createSelectorCreator(defaultMemoize, is)(...args);
