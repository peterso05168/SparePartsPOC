// @flow
import React, { PureComponent } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { hot } from 'react-hot-loader';

import Root from './Root';

class App extends PureComponent<*> {
	render() {
		return (
			<Provider store={this.props.store}>
				<ThemeProvider theme={this.props.theme}>
					<ConnectedRouter history={this.props.history}>
						<Root />
					</ConnectedRouter>
				</ThemeProvider>
			</Provider>
		);
	}
}

export default hot(module)(App);