import Promise from 'bluebird';

export default (type, ...fields) => {
	const actionCreator = (...args) => {
		return {
			type,
			payload: fields.length
				? fields.reduce((result, field, i) => ({ ...result, [field]: args[i] }), {})
				: args[0]
		};
	};
	actionCreator.type = type;
	return actionCreator;
};

export const createResolvableAction = (type, ...fields) => {
	const actionCreator = (...args) => {
		let resolve, reject;
		let promise = new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		});
		return {
			type,
			payload: fields.length
				? fields.reduce((result, field, i) => ({ ...result, [field]: args[i] }), {})
				: args[0],
			promise,
			p: {
				resolve,
				reject
			}
		};
	};
	actionCreator.type = type;
	return actionCreator;
};