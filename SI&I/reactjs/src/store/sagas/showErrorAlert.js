import { put } from 'redux-saga/effects';

import { showAlert } from '../../actions';

export default function* showErrorAlert(action) {
	const { payload: { error } } = action;
	yield put(showAlert(error.name, error.message));
}