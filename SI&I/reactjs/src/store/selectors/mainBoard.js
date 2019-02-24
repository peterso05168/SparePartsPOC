// @flow
import createImmutableSelector from '../../utils/createImmutableSelector';
import { Map } from 'immutable';
import {
	clearError, getContract, postTransaction
} from '../../actions';

export const selectProps = createImmutableSelector(
	state => state.getIn(['mainboard', 'initialized']),
	state => state.getIn(['mainboard', 'error']),
	state => state.getIn(['mainboard', 'loading']),
	state => state.getIn(['login', 'username']),
	state => state.getIn(['mainboard', 'requestorContractList'], Map()).toJS(),
	state => state.getIn(['mainboard', 'respondorContractList'], Map()).toJS(),
	state => state.getIn(['login', 'projectSiteList'], Map()).toJS(),
	state => state.getIn(['newRequest', 'sparePartList'], Map()).toJS(),
	(initialized, error, loading, username, requestorContractList, respondorContractList, projectSiteList, sparePartList) =>
		({ initialized, error, loading, username, requestorContractList, respondorContractList, projectSiteList, sparePartList })
);

export const selectActions = (dispatch: any) => ({
	handleClearError: () => dispatch(clearError()),
	getContract: (method: string, path: string, query: object) =>
		dispatch(getContract(method, path, query)),
	updateStatus: (method: string, path: string, body: string) => 
		dispatch(postTransaction(method, path, body)),
});