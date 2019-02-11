// @flow
import { createStore, applyMiddleware, type Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';
import logger from './logger';
import rootSaga, { SagaManager } from './sagas';
import { Map } from 'immutable';
// create the saga middleware
import 'react-select/dist/react-select.css';

declare var __DEV__: boolean;
declare var __DEBUG__: boolean;
declare var module: {
	hot: {
		accept(path: string, callback: () => void): void;
	};
};

const sagaMiddleware = createSagaMiddleware();

export default (history: History, initialState: any = new Map()): Store => {

	const middlewares = [routerMiddleware(history), sagaMiddleware];

	if (__DEV__ || __DEBUG__) {
		middlewares.unshift(logger);
	}

	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(...middlewares),
		// compose(
		// batchedSubscribe(debounceNotify)
		// )
	);

	SagaManager.startSaga(sagaMiddleware, rootSaga);

	if ((__DEV__ || __DEBUG__) && module.hot) {
		module.hot.accept('./reducers', () => {
			const reducer = require('./reducers').default;
			store.replaceReducer(reducer);
		});

		module.hot.accept('./sagas', () => {
			SagaManager.cancelSagas(store);
			require('./sagas').SagaManager.startSagas(sagaMiddleware, require('./sagas').default);
		});
	}

	return store;
};
