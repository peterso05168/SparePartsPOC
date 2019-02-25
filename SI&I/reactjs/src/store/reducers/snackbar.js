import createReducer from 'utils/createReducer';
import { Map } from 'immutable';

import getUID from '../../constants/uid';
import {
	getAsset, postAsset, putAsset, deleteAsset,
	getSparePart, getSparePartToProjectSiteBySparePartId, 
	postContract, getContract, postTransaction, closeSnackbar } from 'actions';
const initialState = new Map({
	message: '',
	open: false
});

const getAction = {
	post: 'Insert',
	put: 'Update',
	delete: 'Delete'
};

const handleFailResponse = (state, error) => {
	return state.set('open', true).set('message', error.toString());
};

const handleSuccessfulResponse = (state, data, method, type) => {
	return state.set('open', true)
		.set('message', `${getAction[method]} ${type} "${data[getUID[type]]}" succeeded.`);
};

export default createReducer(initialState, {
	[getAsset.failure.type]: (state, { payload: { error } }) => 
		handleFailResponse(state, error),
	[postAsset.failure.type]: (state, { payload: { error } }) =>
		handleFailResponse(state, error),
	[putAsset.failure.type]: (state, { payload: { error } }) =>
		handleFailResponse(state, error),
	[deleteAsset.failure.type]: (state, { payload: { error } }) =>
		handleFailResponse(state, error),
	[getSparePart.failure.type]: (state, { payload: { error } }) =>
		handleFailResponse(state, error),
	[getSparePartToProjectSiteBySparePartId.failure.type]: (state, { payload: { error } }) =>
		handleFailResponse(state, error),
	[postContract.success.type]: (state, { payload: { data } }) => 
		handleSuccessfulResponse(state, data, 'post', 'Contract'),
	[postContract.failure.type]: (state, { payload: { error } }) =>
		handleFailResponse(state, error),
	[getContract.failure.type]: (state, { payload: { error } }) =>
		handleFailResponse(state, error),
	[postTransaction.success.type]: (state, { payload: { data } }) =>
		handleSuccessfulResponse(state, data, 'post', 'Transaction'),
	[postTransaction.failure.type]: (state, { payload: { error } }) =>
		handleFailResponse(state, error),
	[closeSnackbar.type]: (state) => state.set('open', false)
	

});
