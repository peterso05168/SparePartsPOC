import createReducer from 'utils/createReducer';
import { Map, fromJS } from 'immutable';
import _ from 'lodash';

import getUID from '../../constants/uid';
import { clearError, getSparePart, getSparePartToProjectSiteBySparePartId, postContract,
	setSelectedSparePart, setSelectedProjectSite, setSelectedQuantity } from '../../actions';

const initialState = new Map({
	loading: false,
	sparePartList: Map(),
	selectedSparePart: '',
	sparePartToProjectSiteList: Map(),
	selectedProjectSite: '',
	selectedQuantity: 0,
	error: ''
});

const getAction = {
	post: 'Insert',
	put: 'Update',
	delete: 'Delete'
};

const handleSuccessfulResponse = (state, data, method, type) => {
	return state.set('loading', false)
		.set('error', `${getAction[method]} ${type} "${data[getUID[type]]}" succeeded.`);
};

export default createReducer(initialState, {
	[clearError.type]: (state) => state.set('error', ''),
	[getSparePart.type]: (state) => state.set('loading', true),
	[getSparePart.success.type]: (state, { payload: { data } }) => {
		let returnSparePart = {};
		_.forEach(data, (value) => {
			returnSparePart[value[getUID['SparePart']]] = value;
		});
		return state.set('sparePartList', fromJS(returnSparePart)).set('loading', false);
	},
	[getSparePart.failure.type]: (state, { payload }) => state.set('error', payload.error)
		.set('loading', false),
	[getSparePartToProjectSiteBySparePartId.type]: (state) => state.set('loading', true)
		.set('sparePartToProjectSiteList', Map()),
	[getSparePartToProjectSiteBySparePartId.success.type]: (state, { payload: { data, username } }) => {
		let returnSparePartToProjectSite = {};
		_.forEach(data, (value) => {
			// console.log('value[getUID[]], username');
			// console.log(value['ownerProjectSite'].split('#')[1], username);
			if (value['ownerProjectSite'].split('#')[1] == username) return;
			returnSparePartToProjectSite[value[getUID['SparePartToProjectSite']]] = value;
		});
		return state.set('sparePartToProjectSiteList', fromJS(returnSparePartToProjectSite)).set('loading', false);
	},
	[getSparePartToProjectSiteBySparePartId.failure.type]: (state, { payload }) => state.set('error', payload.error)
		.set('loading', false),
	[postContract.type]: (state) => state.set('loading', true),
	[postContract.success.type]: (state, { payload: { data } }) => handleSuccessfulResponse(state, data, 'post', 'Contract'),
	[postContract.failure.type]: (state, { payload }) => state.set('error', payload.error)
		.set('loading', false),
	[setSelectedSparePart.type]: (state, { payload: { id } }) => state.set('selectedSparePart', id),
	[setSelectedProjectSite.type]: (state, { payload: { id } }) => state.set('selectedProjectSite', id),
	[setSelectedQuantity.type]: (state, { payload: { quantity } }) => state.set('selectedQuantity', quantity),
});
