// @flow
import createImmutableSelector from '../../utils/createImmutableSelector';
import {
	closeSnackbar
} from '../../actions';

export const selectProps = createImmutableSelector(
	state => state.getIn(['snackbar', 'message']),
	state => state.getIn(['snackbar', 'open']),
	(message, open) => ({ message, open })
);

export const selectActions = (dispatch: any) => ({
	closeSnackbar: () => dispatch(closeSnackbar())
});