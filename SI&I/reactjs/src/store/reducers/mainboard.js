import createReducer from 'utils/createReducer';
import { Map, fromJS } from 'immutable';
import _ from 'lodash';

import getUID from '../../constants/uid';
import { getContract, clearError, postTransaction } from '../../actions';

const initialState = new Map({
	initialized: false,
	loading: false,
	requestorContractList: Map(),
	respondorContractList: Map(),
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
	[postTransaction.type]: (state) => state.set('loading', true),
	[getContract.type]: (state) => state.set('loading', true)
		// .set('requestorContractList', Map())
		// .set('respondorContractList', Map())
		.set('initialized', true),
	[getContract.success.type]: (state, { payload: { data, username } }) => {
		let requestorContractList = {};
		let respondorContractList = {};
		_.forEach(data, (value) => {
			if (value['requestorProjectSite'].split('#')[1] == username) {
				requestorContractList[value['id']] = value;
			} else if (value['respondorProjectSite'].split('#')[1] == username) {
				respondorContractList[value['id']] = value;
			}
		});
		return state.set('requestorContractList', fromJS(requestorContractList))
			.set('respondorContractList', fromJS(respondorContractList))
			.set('loading', false)
			.set('initialized', true);
	},
	[getContract.failure.type]: (state, { payload }) => state.set('error', payload.error)
		.set('loading', false).set('initialized', true),
	[postTransaction.failure.type]: (state, { payload }) => state.set('error', payload.error)
		.set('loading', false).set('initialized', true)
});
