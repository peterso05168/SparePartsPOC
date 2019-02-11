// @flow
import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Asset from './Asset';
import Transaction from './Transaction';
import Participant from './Participant';
import Navbar from './Navbar';

export default class Main extends PureComponent<any> {
	render() {
		return (
			<div style={{
				'display': 'flex',
				'flexDirection': 'column',
				'position': 'relative',
				'flexShrink': 0,
				'flex': 1,
				'paddingLeft': '10px',
				'paddingRight': '10px' }}>
				<Navbar />
				<Switch>
					<Redirect exact from="/" to="/asset" />
					<Route path="/asset" component={Asset} />
					<Route path="/transaction" component={Transaction} />
					<Route path="/participant" component={Participant} /> 
				</Switch>
			</div>
		);
	}
}
