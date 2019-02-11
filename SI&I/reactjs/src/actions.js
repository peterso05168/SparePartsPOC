import createAction, { createResolvableAction } from 'utils/createAction';

export const authenticate = createAction('AUTHENTICATE', 'token');
export const login = createAction('LOGIN', 'email', 'password');
login.failure = createAction('LOGIN_FAILURE', 'error');

export const logout = createAction('LOGOUT');

export const inputEmail = createAction('INPUT_EMAIL', 'email');
export const inputPassword = createAction('INPUT_PASSWORD', 'password');

//asset
export const setSelectedAsset = createAction('SET_SELECTED_ASSET', 'selectedType');

export const setRefresh = createAction('SET_REFRESH');
export const clearError = createAction('CLEAR_ERROR');
export const insertMode = createAction('INSERT_MODE');
export const modifyAsset = createAction('MODIFY_ASSET', 'modifiedAsset', 'recordId', 'isNew');
export const getAsset = createAction('GET_ASSET', 'method', 'path', 'query');
getAsset.success = createAction('GET_ASSET_SUCCESS', 'data');
getAsset.failure = createAction('GET_ASSET_FAILURE', 'error');

export const postAsset = createAction('POST_ASSET', 'method', 'path', 'body');
postAsset.success = createAction('POST_ASSET_SUCCESS', 'data');
postAsset.failure = createAction('POST_ASSET_FAILURE', 'error');

export const putAsset = createAction('PUT_ASSET', 'method', 'path', 'body');
putAsset.success = createAction('PUT_ASSET_SUCCESS', 'data');
putAsset.failure = createAction('PUT_ASSET_FAILURE', 'error');

export const deleteAsset = createAction('DELETE_ASSET', 'method', 'path');
deleteAsset.success = createAction('DELETE_ASSET_SUCCESS', 'data');
deleteAsset.failure = createAction('DELETE_ASSET_FAILURE', 'error');

export const getAssetById = createAction('GET_ASSET_BY_ID', 'method', 'path', 'query');
getAssetById.success = createAction('GET_ASSET_BY_ID_SUCCESS', 'data');
getAssetById.failure = createAction('GET_ASSET_BY_ID_FAILURE', 'error');

//alert
export const showAlert = createAction('SHOW_ALERT', 'title', 'msg');
export const hideAlert = createAction('HIDE_ALERT');