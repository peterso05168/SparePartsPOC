import createReducer from 'utils/createReducer';
import { Map, fromJS } from 'immutable';
import _ from 'lodash';

import { getProjectSites, inputUsername, inputPassword, setDisplayName } from '../../actions';

const initialState = new Map({
	loading: false,
	initialized: false,
	username: '',
	displayName: '',
	password: '',
	projectSiteList: Map()
});

export default createReducer(initialState, {
	[inputUsername.type]: (state, { payload }) => state.set('username', payload.username),
	[inputPassword.type]: (state, { payload }) => state.set('password', payload.password),
	[setDisplayName.type]: (state, { payload }) => state.set('displayName', payload.displayName),
	[getProjectSites.type]: (state, { payload }) => state.set('loading', true),
	[getProjectSites.success.type]: (state, { payload: { data } }) => {
		let returnProjectSites = {};
		_.forEach(data, (value) => {
			returnProjectSites[value['id']] = value;
		});
		return state.set('projectSiteList', fromJS(returnProjectSites))
			.set('loading', false)
			.set('initialized', true);
	},
});
