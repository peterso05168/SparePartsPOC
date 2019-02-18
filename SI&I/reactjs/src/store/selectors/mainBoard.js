// @flow
import createImmutableSelector from '../../utils/createImmutableSelector';
import { Map } from 'immutable';
import {
	clearError, getContract
} from '../../actions';

export const selectProps = createImmutableSelector(
	state => state.getIn(['mainboard', 'initialized']),
	state => state.getIn(['mainboard', 'error']),
	state => state.getIn(['mainboard', 'loading']),
	state => state.getIn(['login', 'username']),
	state => state.getIn(['mainboard', 'requestorContractList'], Map()).toJS(),
	state => state.getIn(['mainboard', 'respondorContractList'], Map()).toJS(),
	(initialized, error, loading, username, requestorContractList, respondorContractList) =>
		({ initialized, error, loading, username, requestorContractList, respondorContractList })
);

export const selectActions = (dispatch: any) => ({
	handleClearError: () => dispatch(clearError()),
	getContract: (method: string, path: string, query: object) =>
		dispatch(getContract(method, path, query)),
});