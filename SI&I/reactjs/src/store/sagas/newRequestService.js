import { put, select, call } from 'redux-saga/effects';
import APIService from './APIService';
import { getSparePart, getSparePartToProjectSiteBySparePartId, postContract } from '../../actions';

export function* getSparePartCaller ({ payload }) {
	try {
		const assets = yield call(APIService, payload);
		yield put(getSparePart.success(assets));
	} catch (error) {
		yield put(getSparePart.failure(error));
	}
}

export function* getSparePartToProjectSiteBySparePartIdCaller ({ payload }) {
	try {
		const projectSites = yield call(APIService, payload);
		const username = yield select(state => state.getIn(['login', 'username']));
		yield put(getSparePartToProjectSiteBySparePartId.success(projectSites, username));
	} catch (error) {
		yield put(getSparePartToProjectSiteBySparePartId.failure(error));
	}
}

export function* postContractCaller ({ payload }) {
	try {
		const assets = yield call(APIService, payload);
		yield put(postContract.success(assets));
	} catch (error) {
		yield put(postContract.failure(error));
	}
}

