import { takeEvery, fork } from 'redux-saga/effects';
import { getSparePartCaller, getSparePartToProjectSiteBySparePartIdCaller, postContractCaller } from './newRequestService';
import { getSparePart, getSparePartToProjectSiteBySparePartId, postContract } from '../../actions';


export default function* newRequestSaga () {
	yield fork(function* handleGetSparePart () {
		yield takeEvery(getSparePart.type, getSparePartCaller);
	});

	yield fork(function* handleGetSparePartToProjectSiteBySparePartId () {
		yield takeEvery(getSparePartToProjectSiteBySparePartId.type, getSparePartToProjectSiteBySparePartIdCaller);
	});

	yield fork(function* handleContract () {
		yield takeEvery(postContract.type, postContractCaller);
	});

}