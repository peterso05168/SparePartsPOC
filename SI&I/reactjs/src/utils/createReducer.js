import _ from 'lodash';

export default (initialState, handlers) => (state = initialState, action) => {
	if (handlers.hasOwnProperty(action.type)) {
		let handler = handlers[action.type];
		handler = _.isFunction(handler) ? handler: handlers[handler];
		if (!_.isFunction(handler))
			return state;
		return handler(state, action);
	} else {
		return state;
	}
};
