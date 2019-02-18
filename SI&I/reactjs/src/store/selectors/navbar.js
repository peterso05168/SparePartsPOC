// @flow
import createImmutableSelector from '../../utils/createImmutableSelector';
import { push } from 'react-router-redux';
import { Map, fromJS } from 'immutable';
import {
	inputUsername,
	setDisplayName,
	getProjectSites
} from '../../actions';

export const selectProps = createImmutableSelector(
	state => state.getIn(['login', 'username']),
	state => state.getIn(['login', 'displayName']),
	state => state.getIn(['login', 'loading']),
	state => state.getIn(['login', 'initialized']),
	state => state.getIn(['login', 'projectSiteList'], Map()).toJS(),
	(username, displayName, loading, initialized, projectSiteList) => 
		({ username, displayName, loading, initialized, projectSiteList})
);

export const selectActions = (dispatch: any) => ({
	goto: (route: string) => dispatch(push(route)),
	setUsername: (username: string) => dispatch(inputUsername(username)),
	setDisplayName: (displayName: string) => dispatch(setDisplayName(displayName)),
	getProjectSites: (method: string, path: string) => dispatch(getProjectSites(method, path))
});