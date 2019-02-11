import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};


class MenuAppBar extends React.Component {

	constructor() {
		super();
		this.state = {
			anchorEl: null,
			value: 0
		};
	}

	handleTabChange = (event, value) => {
		console.log(value);
		this.setState({ value });
	}

	handleMenu = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render () {
		const { classes } = this.props;
		const { anchorEl , value } = this.state;
		const open = Boolean(anchorEl);

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" className={classes.grow}>
						Spare Parts
						</Typography>
						<Tabs value={value} onChange={this.handleTabChange}>
							<Tab label="Asset" />
							<Tab label="Participant" />
							<Tab label="Transaction" />
						</Tabs>
						{
							<div>
								<IconButton
									aria-owns={open ? 'menu-appbar' : undefined}
									aria-haspopup="true"
									onClick={this.handleMenu}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={open}
									onClose={this.handleClose}
								>
									<MenuItem onClick={this.handleClose}>Profile</MenuItem>
									<MenuItem onClick={this.handleClose}>Logout</MenuItem>
								</Menu>
							</div>
						}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

MenuAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);