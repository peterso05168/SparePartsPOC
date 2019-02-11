import { call, cancel, fork, takeEvery, take } from 'redux-saga/effects';
import authSaga from './authSaga';
import mainSaga from './mainSaga';
import showErrorAlert from './showErrorAlert';

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

export default function* rootSaga() {
	yield takeEvery(action => !!action.payload && !!action.payload.error, showErrorAlert);
	yield call(authSaga, mainSaga);
}

function createAbortableSaga (saga) {
	if (process.env.NODE_ENV === 'development') {
		return function* main () {
			const sagaTask = yield fork(saga);

			yield take(CANCEL_SAGAS_HMR);
			yield cancel(sagaTask);
		};
	} else {
		return saga;
	}
}

export class SagaManager {

	static startSaga(middleware, saga) {
		middleware.run(createAbortableSaga(saga));
	}

	static cancelSaga(store) {
		store.dispatch({
			type: CANCEL_SAGAS_HMR
		});
	}
}
