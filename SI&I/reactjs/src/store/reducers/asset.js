import createReducer from 'utils/createReducer';
import { Map, fromJS } from 'immutable';
import _ from 'lodash';
import getUID from '../../constants/uid';
import postBody from '../../constants/postBody';

import { insertMode, clearError, setRefresh, modifyAsset, setSelectedAsset, getAsset, postAsset, putAsset, deleteAsset, getAssetById } from '../../actions';

const initialState = new Map({
	loading: false,
	isNew: false,
	needRefresh: true,
	selectedType: '',
	newAsset: Map(),
	assets: Map(),
	searchById: '',
	error: ''
});

const getAction = {
	post: 'Insert',
	put: 'Update',
	delete: 'Delete'
};

const handleSuccessfulResponse = (state, data, method) => {
	const selectedType = state.get('selectedType');
	return state.set('loading', false)
		.set('needRefresh', true)
		.set('error', `${getAction[method]} ${selectedType} "${data[getUID[selectedType]]}" succeeded.`);
};

export default createReducer(initialState, {
	[setSelectedAsset.type]: (state, { payload }) => state.set('needRefresh', true)
		.set('isNew', false)
		.set('selectedType', payload.selectedType)
		.set('assets', Map()),
	[clearError.type]: (state) => state.set('error', ''),
	[modifyAsset.type]: (state, { payload: { modifiedAsset, recordId, isNew } }) => (
		isNew ? state.set('newAsset', fromJS(modifiedAsset))
			: state.setIn(['assets', recordId], fromJS(modifiedAsset))
	),
	[insertMode.type]: (state) => {
		const selectedType = state.get('selectedType');
		return selectedType ? state.set('isNew', true).set('newAsset', fromJS(postBody[selectedType])): state;
	},
	[setRefresh.type]: (state) => state.set('needRefresh', true).set('isNew', false),
	[getAsset.type]: (state) => state.set('loading', true).set('needRefresh', false),
	[getAsset.success.type]: (state, { payload: { data } }) => {
		let returnAssets = {};
		const selectedType = state.get('selectedType');
		_.forEach(data, (value) => {
			returnAssets[value[getUID[selectedType]]]= value;
		});
		return state.set('assets', fromJS(returnAssets)).set('loading', false);
	},
	[getAsset.failure.type]: (state, { payload }) => state.set('error', payload.error)
		.set('loading', false).set('needRefresh', true),
	[postAsset.type]: (state) => state.set('loading', true),
	[postAsset.success.type]: (state, { payload: { data } }) => handleSuccessfulResponse(state, data, 'post'),
	[postAsset.failure.type]: (state, { payload }) => state.set('error', payload.error)
		.set('loading', false),
	[putAsset.type]: (state) => state.set('loading', true),
	[putAsset.success.type]: (state, { payload: { data } }) => handleSuccessfulResponse(state, data, 'put'),
	[putAsset.failure.type]: (state, { payload }) => state.set('error', payload.error)
		.set('loading', false),
	[deleteAsset.type]: (state) => state.set('loading', true),
	[deleteAsset.success.type]: (state, { payload: { data } }) => handleSuccessfulResponse(state, data, 'delete'),
	[deleteAsset.failure.type]: (state, { payload }) => state.set('error', payload.error)
		.set('loading', false),
});
