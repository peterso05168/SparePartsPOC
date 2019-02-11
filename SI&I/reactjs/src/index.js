// @flow
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
import BBPromise from 'bluebird';

import App from './components/App';
import 'react-infinite-calendar/styles.css';

import createHistory from 'history/createBrowserHistory';
import { type Store } from 'redux';
import configureStore from './store';

import * as theme from './theme';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const preloadState: any = window.___PRELOAD_STATE___;

delete window.___PRELOAD_STATE___;

const history: History = createHistory();
export const store: Store = configureStore(history, preloadState);

global.Promise = BBPromise;

const rootElm: HTMLElement | null = document.getElementById('root');

if (rootElm)
	render(
		<App store={store} theme={theme} history={history} />,
		rootElm
	);