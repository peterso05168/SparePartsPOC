// @flow
import React, { PureComponent, type ComponentType, Fragment } from 'react';
import { connect, type Connector } from 'react-redux';
import createSelector, { type Selector } from 'utils/createImmutableSelector';
import { Route, Switch, Redirect, withRouter } from 'react-router';

import Login from './Login';
import Dashboard from './Dashboard';

type PrivateRouteProps = {
	component: any,
	token: string,
	initialized: boolean
};

class PrivateRoute extends PureComponent<PrivateRouteProps> {
	render() {
		const { component: Target, token, initialized, ...rest } = this.props;
		return (
		// initialized
		// 	? token ?
			<Route {...rest} component={Target} />
			// 	: <Redirect to="/login"/>
			// : <PageLoader />;
		);
	}
}

type RootProps = {
	token: string,
	initialized: boolean
};

const mapStateToProps: Selector<any, RootProps> = createSelector(
	state => state.getIn(['auth', 'token']),
	state => state.getIn(['auth', 'initialized']),
	(token, initialized) => ({ token, initialized })
);

const connector: Connector<{}, RootProps> = connect(mapStateToProps);

class Root extends PureComponent<RootProps> {
	render() {
		const { token, initialized } = this.props;
		return (
			<Fragment>
				<Switch>
					<Route exact path="/login" component={Login} />
					<PrivateRoute token={token} initialized={initialized} path="/" component={Dashboard} />
				</Switch>
			</Fragment>
		);
	}
}

export default withRouter(connector(Root));
