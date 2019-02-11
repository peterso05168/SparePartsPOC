import createReducer from 'utils/createReducer';
import { Map } from 'immutable';
import jwtDecode from 'jwt-decode';

import { login, logout, authenticate } from 'actions';
const initialState = new Map({
	token: null,
	message: '',
	loading: false,
	initialized: false,
	resetSuccess: null
});

export default createReducer(initialState, {
	[login.type]: state => state.set('loading', true),
	[authenticate.type]: (state, { payload }) => {
		// let decodedMetadata = payload.token ? JSON.parse(atob(payload.token.split('.')[0])): {};
		let decodedData = payload.token ? jwtDecode(payload.token): {};
		return state.merge({
			token: payload.token,
			initialized: true,
			loading: false,
			message: '',
			// ...decodedMetadata,
			...decodedData
		});
	},
	[login.failure.type]: (state, { payload }) =>state.merge({
		token: null,
		loading: false,
		username: '',
		message: payload.message
	}),
	[logout.type]: state => state.set('token', null)
});
