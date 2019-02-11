import createReducer from 'utils/createReducer';
import { Map } from 'immutable';

import { inputEmail, inputPassword } from 'actions';

const initialState = new Map({
	email: '',
	password: ''
});

export default createReducer(initialState, {
	[inputEmail.type]: (state, { payload }) => state.set('email', payload.email),
	[inputPassword.type]: (state, { payload }) => state.set('password', payload.password),
});
