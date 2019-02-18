import { put, select, call } from 'redux-saga/effects';
import APIService from './APIService';
import { getContract } from '../../actions';

export function* getContractCaller ({ payload }) {
	try {
		const contracts = yield call(APIService, payload);
		const username = yield select(state => state.getIn(['login', 'username']));
		yield put(getContract.success(contracts, username));
	} catch (error) {
		yield put(getContract.failure(error));
	}
}