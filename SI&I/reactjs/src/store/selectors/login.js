// @flow
import createImmutableSelector from '../../utils/createImmutableSelector';
import {
	inputUsername,
	inputPassword,
	login
} from '../../actions';

export const selectProps = createImmutableSelector(
	state => state.getIn(['login', 'username']),
	state => state.getIn(['login', 'password']),
	(email, password) => ({ email, password })
);

export const selectActions = (dispatch: any) => ({
	login: (username: string, password: string) => dispatch(login(username, password)),
	inputEmail: (tempUsername: string) => dispatch(inputUsername(tempUsername)),
	inputPassword: (tempPassword: string) => dispatch(inputPassword(tempPassword)),
});