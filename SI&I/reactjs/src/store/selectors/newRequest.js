// @flow
import createImmutableSelector from '../../utils/createImmutableSelector';
import { Map } from 'immutable';
import { clearError, getSparePart, getSparePartToProjectSiteBySparePartId, postContract,
	setSelectedSparePart, setSelectedProjectSite, setSelectedQuantity } from '../../actions';

export const selectProps = createImmutableSelector(
	state => state.getIn(['newRequest', 'error']),
	state => state.getIn(['newRequest', 'loading']),
	state => state.getIn(['newRequest', 'sparePartList'], Map()).toJS(),
	state => state.getIn(['newRequest', 'selectedSparePart']),
	state => state.getIn(['newRequest', 'sparePartToProjectSiteList'], Map()).toJS(),
	state => state.getIn(['newRequest', 'selectedProjectSite']),
	state => state.getIn(['newRequest', 'selectedQuantity']),
	state => state.getIn(['login', 'projectSiteList'], Map()).toJS(),
	state => state.getIn(['login', 'username']),
	(error,loading, sparePartList, selectedSparePart, sparePartToProjectSiteList, selectedProjectSite, selectedQuantity, projectSiteList, username) =>
		({ error, loading, sparePartList, selectedSparePart, sparePartToProjectSiteList, selectedProjectSite, selectedQuantity, projectSiteList, username })
);

export const selectActions = (dispatch: any) => ({
	handleClearError: () => dispatch(clearError()),
	handleSelectSparePart: (id: string) => dispatch(setSelectedSparePart(id)),
	handleSelectProjectSite: (id: string) => dispatch(setSelectedProjectSite(id)),
	handleSelectQuantity: (quantity: number) => dispatch(setSelectedQuantity(quantity)),
	getSparePart: (method: string, path: string) => dispatch(getSparePart(method, path)),
	getSparePartToProjectSiteBySparePartId: (method: string, path: string, query: object) => 
		dispatch(getSparePartToProjectSiteBySparePartId(method, path, query)),
	postContract: (method: string, path: string, body: string) => dispatch(postContract(method, path, body)),
});