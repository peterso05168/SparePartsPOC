// @flow
import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { withStyles } from '@material-ui/core';

import Asset from './Asset';
import Navbar from './Navbar';

import Mainboard from './Mainboard';
import NewRequest from './NewRequest/';
import StyledSnackbar from './common/StyledSnackbar';
import { connect } from 'react-redux';

import { selectProps, selectActions } from '../store/selectors/snackbar';

const styles = theme => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
});

const connector = connect(selectProps, selectActions);

class Dashboard extends PureComponent<any> {
	render() {
		const { classes, open, message, closeSnackbar } = this.props;
		return (
			<div className={classes.root}>
				<Navbar />
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Switch>
						<Redirect exact from="/" to="/mainboard" />
						<Route path="/asset" component={Asset} />
						<Route path="/mainboard" component={Mainboard} />
						<Route path="/newRequest" component={NewRequest} />
					</Switch>
				</main>
				<StyledSnackbar open={open} message={message} closeSnackbar={closeSnackbar}/>
			</div>
		);
	}
}

export default withStyles(styles)(connector(Dashboard));
