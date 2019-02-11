import { take, call, apply, put, cancel } from 'redux-saga/effects';
import { CrossStorageClient } from 'cross-storage';
import * as log from 'loglevel';

import { login, logout, authenticate } from 'actions';

export function* checkLocalToken() {
	// try {
	// 	let storage = new CrossStorageClient(AUTH_SERVER);
	// 	yield apply(storage, storage.onConnect);
	// 	let token = yield apply(storage, storage.get, ['token']);
	// 	yield apply(storage, storage.close);
	// 	return token;
	// } catch(error) {
	// 	log.error(error);
	// 	return null;
	// }
	return yield '1234';
}


export function* refreshToken(token) {
	// try {
	// 	let response = yield call(fetch, `${AUTH_SERVER}/api/token`, { method: 'GET', headers: { Authorization: `Bearer ${token}`}});
	// 	if (response.ok) {
	// 		return (yield response.json()).token;
	// 	} else {
	// 		// let message = yield response.text();
	// 		// let error = new Error(message);
	// 		// error.name = 'Login Error';
	// 		yield put(login.failure());
	// 		return null;
	// 	}
	// } catch(error) {
	// 	log.error(error);
	// 	return null;
	// }
	return yield '1234';
}

export function* handleLogin() {
	try {
		let action = yield take('LOGIN');
		let { payload } = action;
		let { username, password } = payload;
		let response = yield call(fetch, `${AUTH_SERVER}/api/token`, { method: 'GET', headers: { Authorization: `Basic ${btoa(`${username}:${password}`)}`}});
		if (response.ok) {
			return (yield response.json()).token;
		} else {
			let message = yield response.text();
			let error = new Error(message);
			error.name = 'Login Error';
			yield put(login.failure(error));
			return null;
		}
	} catch(error) {
		log.error(error);
		return null;
	}
}

export function* initializeAuthState(token) {
	// try {
	// 	let storage = new CrossStorageClient(AUTH_SERVER);
	// 	yield apply(storage, storage.onConnect);
	// 	yield apply(storage, storage.set, ['token', token]);
	// 	yield apply(storage, storage.close);
	// 	yield put(authenticate(token));
	// 	return token;
	// } catch(error) {
	// 	log.error(error);
	// 	yield put(authenticate(null));
	// 	return null;
	// }
	return yield '1234';
}

export function* handleLogout(task) {
	yield take('LOGOUT');
	yield put(logout());
	yield cancel(task);
	try {
		let storage = new CrossStorageClient(AUTH_SERVER);
		yield apply(storage, storage.onConnect);
		yield apply(storage, storage.del, ['token']);
		yield apply(storage, storage.close);
	} catch(error) {
		log.error(error);
	}
}

