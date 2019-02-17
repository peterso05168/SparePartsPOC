// @flow
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';

import { selectProps, selectActions } from '../../store/selectors/navbar';
import StyledCard from '../common/StyledCard/';

import { styles } from './makeup';
import { data, requiredKeys} from '../../constants/sampleContract';

const connector = connect(selectProps, selectActions);

type MainBoardProps = {
	classes: object,
	username: string,
	loading: boolean,
	goto: (route: string) => any,
	setUsername: (username: string) => any,
	setDisplayName: (displayName: string) => any,
}

class MainBoard extends React.Component<MainBoardProps> {

	constructor() {
		super();
		this.state = {
		};
	}

	render () {
		const { classes, username, displayName, goto, loading } = this.props;
		const { buttonList,
			dropdownLabel, dropdownList, open } = this.state;
		console.log('MainBoard render');
		console.log(Object.keys(data));
		return (
			<div className={classes.wrapper}>
				<div className={classes.divider} >
					<div className={classes.header} >
						<Typography variant="headline" color="inherit">
					Requests By Others
						</Typography>
						<Divider />
					</div>
					<div className={classes.refreshButton} >
						<Button variant="contained" color="secondary" onClick={null} className={classNames(classes.margin)}>
						Refresh
						</Button>
					</div>
				</div>
				{
					loading ?
						<LinearProgress />
						: null
				}
				{
					Object.keys(data).map((value, index) =>(
						<div key={index}>
							<StyledCard 
								title={`Contract Id: ${value}`} 
								content={data[value]} 
								contentKeys={requiredKeys}/>
							<div className={classes.seperater} />
						</div>
					))
				}

				<div className={classes.divider} >
					<div className={classes.header} >
						<Typography variant="headline" color="inherit">
							Our Requests
						</Typography>
						<Divider />
					</div>
					<div className={classes.refreshButton} >
						<Button variant="contained" color="secondary" onClick={null} className={classNames(classes.margin)}>
							Refresh
						</Button>
					</div>
				</div>
				{
					loading ?
						<LinearProgress />
						: null
				}
				{
					Object.keys(data).map((value, index) => (
						<div key={index}>
							<StyledCard
								title={`Contract Id: ${value}`}
								content={data[value]}
								contentKeys={requiredKeys} />
							<div className={classes.seperater} />
						</div>
					))
				}
			</div>
		);
	}
}

export default withStyles(styles)(connector(MainBoard));