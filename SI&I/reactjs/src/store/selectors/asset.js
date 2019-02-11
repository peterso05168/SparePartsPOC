// @flow
import createImmutableSelector from '../../utils/createImmutableSelector';
import { Map } from 'immutable';
import { insertMode, clearError, setRefresh, modifyAsset, setSelectedAsset, getAsset, postAsset, putAsset, deleteAsset, getAssetById } from '../../actions';
import typeEnums from '../../constants/typeEnums';

export const selectProps = createImmutableSelector(
	state => state.getIn(['asset', 'loading']),
	state => state.getIn(['asset', 'selectedType']),
	state => state.getIn(['asset', 'needRefresh']),
	state => state.getIn(['asset', 'assets'], Map()).toJS(),
	state => state.getIn(['asset', 'searchById']),
	state => state.getIn(['asset', 'error']),
	state => state.getIn(['asset', 'isNew']),
	state => state.getIn(['asset', 'newAsset'], Map()).toJS(),
	() => typeEnums,
	(loading, selectedType, needRefresh, assets, searchById, error, isNew, newAsset, typeEnums) => 
		({ loading, selectedType, needRefresh, assets, searchById, error, isNew, newAsset, typeEnums})
);

export const selectActions = (dispatch: any) => ({
	getSelectedTypeAsset: (method: string, path: string) => dispatch(getAsset(method, path)),
	handleJSONChange: (obj: object, recordId: string, isNew: boolean) => dispatch(modifyAsset(obj, recordId, isNew)),
	handleInsertMode: () => dispatch(insertMode()),
	handleSearch: (searchId: string) => null,
	handleRefresh: () => dispatch(setRefresh()),
	handleClearError: () => dispatch(clearError()),
	handleSelectType: (selectedType: string) => dispatch(setSelectedAsset(selectedType)),
	handleInsert: (method: string, path: string, body: string) => dispatch(postAsset(method, path, body)),
	handleUpdate: (method: string, path: string, body: string) => dispatch(putAsset(method, path, body)),
	handleDelete: (method: string, path: string) => dispatch(deleteAsset(method, path))
});