// @flow
import createImmutableSelector from '../../utils/createImmutableSelector';
import {
	inputEmail,
	inputPassword,
	login
} from '../../actions';

export const selectProps = createImmutableSelector(
	state => state.getIn(['login', 'email']),
	state => state.getIn(['login', 'password']),
	(email, password) => ({ email, password })
);

export const selectActions = (dispatch: any) => ({
	login: (email: string, password: string) => dispatch(login(email, password)),
	inputEmail: (tempEmail: string) => dispatch(inputEmail(tempEmail)),
	inputPassword: (tempPassword: string) => dispatch(inputPassword(tempPassword)),
});