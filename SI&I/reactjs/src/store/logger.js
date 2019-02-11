import { createLogger } from 'redux-logger';

export default createLogger({
	stateTransformer: (state) => {
		return state.toJS();
	}
});
