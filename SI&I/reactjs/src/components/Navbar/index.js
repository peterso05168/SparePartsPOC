// @flow
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';

import { selectProps, selectActions } from '../../store/selectors/navbar';
import StyleDropdown from '../common/StyledDropdown';
import { styles } from './makeup';

const connector = connect(selectProps, selectActions);

type NavBarProps = {
	classes: object,
	username: string,
	displayName: string,
	loading: boolean, 
	initialized: boolean, 
	projectSiteList: object,
	goto: (route: string) => any,
	setUsername: (username: string) => any,
	setDisplayName: (displayName: string) => any,
	getProjectSites: () => any
}

class NavBar extends React.Component<NavBarProps> {

	constructor() {
		super();
		this.state = {
			dropdownLabel: 'company',
			open: false,
			buttonList: {
				mainBoard: 'Main Board',
				newRequest: 'New Request'
			}
		};
	}

	handleSelectDrawer = (route) => {
		const { goto } = this.props;
		goto(route);
		this.handleDrawerAction();
	}

	handleDrawerAction = () => {
		const { open } = this.state;
		this.setState({ open: !open });
	}

	handleUserChange = (value) => {
		const { projectSiteList } = this.props;
		const { setUsername, setDisplayName } = this.props;
		setUsername(value);
		setDisplayName(projectSiteList[value]['name']);
	}

	// handleMenu = (event) => {
	// 	this.setState({ anchorEl: event.currentTarget });
	// };

	// handleClose = () => {
	// 	this.setState({ anchorEl: null });
	// };

	componentDidMount () {
		const { initialized, getProjectSites } = this.props;
		if(!initialized) getProjectSites('GET', 'ProjectSite');
	}

	render () {
		const { classes, username, displayName, loading, projectSiteList } = this.props;
		const { buttonList,
			dropdownLabel, open } = this.state;
		console.log('navbar render');
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
						<div className={classes.selector}>
							<StyleDropdown
								dropdownLabel={dropdownLabel}
								seletedValue={username}
								dropdownList={projectSiteList}
								handleChange={this.handleUserChange}
							/>
						</div>
						{
							loading ? 
								<div style={{ flexGrow: 1 }}>
									<CircularProgress 
										style={{color: '#FFFFFF'}}
										disableShrink /> 
								</div>
								: null
						}
						<Typography variant="h5" color="inherit" className={classes.grow}>
							Spare Parts
						</Typography>
						<Typography variant="subtitle1" color="inherit" className={classes.welcomeMsg}>
							{`Welcome, ${displayName}`}
						</Typography>
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
					</div>
					<Divider />
					<List>
						{Object.keys(buttonList).map((text) => (
							<ListItem button key={buttonList[text]} onClick={() => this.handleSelectDrawer(`/${text}`)}>
								<ListItemIcon>{text == 'mainBoard' ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={buttonList[text]} />
							</ListItem>
						))}
					</List>
				</Drawer>
			</div>
		);
	}
}

export default withStyles(styles)(connector(NavBar));