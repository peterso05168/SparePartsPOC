// @flow
import createImmutableSelector from '../../utils/createImmutableSelector';
import { push } from 'react-router-redux';
import {
	inputUsername,
	setDisplayName
} from '../../actions';

export const selectProps = createImmutableSelector(
	state => state.getIn(['login', 'username']),
	state => state.getIn(['login', 'displayName']),
	(username, displayName) => ({ username, displayName })
);

export const selectActions = (dispatch: any) => ({
	goto: (route: string) => dispatch(push(route)),
	setUsername: (username: string) => dispatch(inputUsername(username)),
	setDisplayName: (displayName: string) => dispatch(setDisplayName(displayName)),
});