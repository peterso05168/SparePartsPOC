import createReducer from 'utils/createReducer';
import { Map } from 'immutable';

import { inputUsername, inputPassword, setDisplayName } from '../../actions';

const initialState = new Map({
	username: '',
	displayName: '',
	password: ''
});

export default createReducer(initialState, {
	[inputUsername.type]: (state, { payload }) => state.set('username', payload.username),
	[inputPassword.type]: (state, { payload }) => state.set('password', payload.password),
	[setDisplayName.type]: (state, { payload }) => state.set('displayName', payload.displayName),
});
