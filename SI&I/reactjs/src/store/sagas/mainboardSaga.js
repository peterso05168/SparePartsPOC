import { takeEvery, fork } from 'redux-saga/effects';
import { getContractCaller } from './mainboardService';
import { getContract } from '../../actions';


export default function* newRequestSaga () {
	yield fork(function* handleGetSparePart () {
		yield takeEvery(getContract.type, getContractCaller);
	});

}