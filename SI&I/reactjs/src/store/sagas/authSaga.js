import { select, put, call, fork } from 'redux-saga/effects';
import { checkLocalToken, refreshToken, handleLogin, initializeAuthState, handleLogout } from './authService';
import { replace } from 'react-router-redux';

import mainSaga from './mainSaga';

export default function* authSaga() {
	let token = null;
	while(!token) {
		let authState = yield select(state => state.get('auth'));
		console.log('auth-------');
		console.log(authState.toJS());
		if (!authState.get('initialized')) {
			token = yield call(checkLocalToken);
			token = token ? yield call(refreshToken, token): token;
		} else {
			token = yield call(handleLogin);
		}
		if (!token)
			yield call(initializeAuthState);
	}
	let main = yield fork(mainSaga);
	yield call(initializeAuthState, token);
	if (window.location.pathname == '/login')
		yield put(replace('/'));


	yield call(handleLogout, main);
}
