import { put, call } from 'redux-saga/effects';
import APIService from './APIService';
import { getProjectSites, setRefresh, getAsset, postAsset, putAsset, deleteAsset, getAssetById } from '../../actions';

export function* getAssetCaller ({ payload }) {
	try {
		const assets = yield call(APIService, payload);
		yield put(getAsset.success(assets));
	} catch (error) {
		yield put(getAsset.failure(error));
	}
}

export function* getProjectSitesCaller ({ payload }) {
	try {
		const projectSites = yield call(APIService, payload);
		yield put(getProjectSites.success(projectSites));
	} catch (error) {
		console.log(error);
	}
}

export function* postAssetCaller ({ payload }) {
	try {
		const assets = yield call(APIService, payload);
		yield put(postAsset.success(assets));
		yield put(setRefresh());
	} catch (error) {
		yield put(postAsset.failure(error));
	}
}

export function* putAssetCaller ({ payload }) {
	try {
		const assets = yield call(APIService, payload);
		yield put(putAsset.success(assets));
		yield put(setRefresh());
	} catch (error) {
		yield put(putAsset.failure(error));
	}
}

export function* deleteAssetCaller ({ payload }) {
	try {
		console.log('payload------');
		console.log(payload);
		const assets = yield call(APIService, payload);
		yield put(deleteAsset.success(assets));
		yield put(setRefresh());
	} catch (error) {
		yield put(deleteAsset.failure(error));
	}
}
