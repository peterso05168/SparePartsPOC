import { fork } from 'redux-saga/effects';

import assetSaga from './assetSaga';
import newRequestSaga from './newRequestSaga';
import mainboardSaga from './mainboardSaga';

export default function* main() {
	yield fork(assetSaga);
	yield fork(newRequestSaga);
	yield fork(mainboardSaga);
}
