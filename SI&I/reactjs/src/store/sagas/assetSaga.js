import { takeEvery, fork } from 'redux-saga/effects';
import { getAssetCaller, postAssetCaller, putAssetCaller, deleteAssetCaller } from './assetService';
import { getAsset, postAsset, putAsset, deleteAsset, getAssetById } from '../../actions';


export default function* assetSaga () {
	yield fork(function* handleGetAsset () {
		yield takeEvery(getAsset.type, getAssetCaller);
	});

	yield fork(function* handlePostAsset () {
		yield takeEvery(postAsset.type, postAssetCaller);
	});

	yield fork(function* handlePutAsset () {
		yield takeEvery(putAsset.type, putAssetCaller);
	});

	yield fork(function* handleDeleteAsset () {
		yield takeEvery(deleteAsset.type, deleteAssetCaller);
	});
}