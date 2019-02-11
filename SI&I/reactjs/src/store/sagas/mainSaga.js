import { fork } from 'redux-saga/effects';

import assetSaga from './assetSaga';

export default function* main() {
	yield fork(assetSaga);
}
