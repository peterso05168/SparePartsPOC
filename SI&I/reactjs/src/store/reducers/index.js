import { fromJS, hash, Map }  	from 'immutable';
import { combineReducers }    	from 'redux-immutable';
import { routerReducer }      	from 'react-router-redux';
import auth                   	from './auth';
import asset 				  	from './asset';
import login                  	from './login';
import newRequest 			  	from './newRequest';
import mainboard 				from './mainboard';


const rootReducer = combineReducers({
	router: (state, action) => fromJS(routerReducer(state ? state.toJS() : state, action)),
	asset,
	auth,
	login,
	newRequest,
	mainboard
});

export default (state, action) => {
	return rootReducer(state, action);
};