import { takeEvery, fork } from 'redux-saga/effects';
import { getContractCaller, postTransactionCaller } from './mainboardService';
import { getContract, postTransaction } from '../../actions';


export default function* newRequestSaga () {
	yield fork(function* handleGetContract () {
		yield takeEvery(getContract.type, getContractCaller);
	});

	yield fork(function* handlePostTransaction () {
		yield takeEvery(postTransaction.type, postTransactionCaller);
	});
}