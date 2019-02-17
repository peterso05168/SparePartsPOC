import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import StyleDropdown from '../common/StyledDropdown';

const drawerWidth = 180;

const styles = theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: 0,
		},
	},
	// toolbar: {
	// 	display: 'flex',
	// 	alignItems: 'center',
	// 	justifyContent: 'space-evenly',
	// 	padding: '0 8px',
	// 	...theme.mixins.toolbar,
	// },
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
	grow: {
		flexGrow: 1,
	},
	selector: {
		maxWidth: '150px',
		marginLeft: 20,
		marginRight: -50,
		color: '#FFFFFF'
	}
});

class MiniDrawer extends React.Component {
	state = {
		open: false,
		dropdownLabel: 'company',
		dropdownList: {
			companyA: 'Company A',
			companyB: 'Company B'
		},
		seletedValue: '',
		handleChange: this.handleChange,
	};

	handleChange = (seletedValue) => {
		this.setState({ seletedValue });
	}

	handleDrawerAction = () => {
		const { open } = this.state;
		this.setState({ open: !open });
	}
	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render () {
		const { classes, theme } = this.props;
		const { dropdownLabel, dropdownList, seletedValue, handleChange } = this.state;

		return (
			<div >
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classNames(classes.appBar)}
				>
					<Toolbar disableGutters={true}>
						<IconButton className={classes.menuButton}
							color="inherit"
							aria-label="Menu"
							onClick={this.handleDrawerAction}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" className={classes.selector}>
							<StyleDropdown
								dropdownLabel={dropdownLabel}
								seletedValue={seletedValue}
								dropdownList={dropdownList}
								handleChange={handleChange}
							/>
						</Typography>
						<Typography variant="h5" color="inherit" className={classes.grow}>
							Spare Parts
						</Typography>
						<Tabs value={0} onChange={this.handleTabChange}>
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
							</div>
						}
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					className={classNames(classes.drawer, {
						[classes.drawerOpen]: this.state.open,
						[classes.drawerClose]: !this.state.open,
					})}
					classes={{
						paper: classNames({
							[classes.drawerOpen]: this.state.open,
							[classes.drawerClose]: !this.state.open,
						}),
					}}
					open={this.state.open}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					<Divider />
					<List>
						{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{['All mail', 'Trash', 'Spam'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
				</Drawer>
			</div>
		);
	}
}

MiniDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);