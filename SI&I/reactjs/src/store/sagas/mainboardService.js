import { put, select, call } from 'redux-saga/effects';
import APIService from './APIService';
import { getContract, postTransaction } from '../../actions';

export function* getContractCaller ({ payload }) {
	try {
		const contracts = yield call(APIService, payload);
		const username = yield select(state => state.getIn(['login', 'username']));
		yield put(getContract.success(contracts, username));
	} catch (error) {
		yield put(getContract.failure(error));
	}
}

export function* postTransactionCaller ({ payload }) {
	try {
		console.log('postTransactionCaller');
		yield call(APIService, payload);
		console.log('postTransactionCaller2');
		const username = yield select(state => state.getIn(['login', 'username']));
		console.log('usernmae');
		yield put(getContract('GET', 'queries/getContractByProjSite',
			{ projSite: `resource:org.hyperledger_composer.scms.ProjectSite#${username}` }));
		console.log('end');
	} catch (error) {
		yield put(postTransaction.failure(error));
	}
}