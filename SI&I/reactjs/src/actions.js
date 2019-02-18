import createAction, { createResolvableAction } from 'utils/createAction';

export const authenticate = createAction('AUTHENTICATE', 'token');
export const login = createAction('LOGIN', 'email', 'password');
login.failure = createAction('LOGIN_FAILURE', 'error');

export const logout = createAction('LOGOUT');

//login
export const inputUsername = createAction('INPUT_USERNAME', 'username');
export const inputPassword = createAction('INPUT_PASSWORD', 'password');
export const getProjectSites = createAction('GET_PROJECT_SITES', 'method', 'path');
getProjectSites.success = createAction('GET_PROJECT_SITES_SUCCESS', 'data');
export const setDisplayName = createAction('SET_DISPLAY_NAME', 'displayName');

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

//new request
export const getSparePart = createAction('GET_SPARE_PART', 'method', 'path', 'query');
getSparePart.success = createAction('GET_SPARE_PART_SUCCESS', 'data');
getSparePart.failure = createAction('GET_SPARE_PART_FAILURE', 'error');

export const getSparePartToProjectSiteBySparePartId = createAction('GET_SPARE_PART_TO_PROJECTSITE_BY_SPARE_PART_ID', 'method', 'path', 'query');
getSparePartToProjectSiteBySparePartId.success = createAction('GET_SPARE_PART_TO_PROJECTSITE_BY_SPARE_PART_ID_SUCCESS', 'data', 'username');
getSparePartToProjectSiteBySparePartId.failure = createAction('GET_SPARE_PART_TO_PROJECTSITE_BY_SPARE_PART_ID_FAILURE', 'error');

export const postContract = createAction('POST_CONTRACT', 'method', 'path', 'body');
postContract.success = createAction('POST_CONTRACT_SUCCESS', 'data');
postContract.failure = createAction('POST_CONTRACT_FAILURE', 'error');

export const setSelectedSparePart = createAction('SET_SELECTED_SPARE_PART', 'id');
export const setSelectedProjectSite = createAction('SET_SELECTED_PROJECT_SITE', 'id');
export const setSelectedQuantity = createAction('SET_SELECTED_QUANTITY', 'quantity');

//main board
export const getContract = createAction('GET_CONTRACT', 'method', 'path', 'query');
getContract.success = createAction('GET_CONTRACT_SUCCESS', 'data', 'username');
getContract.failure = createAction('GET_CONTRACT_FAILURE', 'error');