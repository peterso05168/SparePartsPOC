// @flow
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';

import { selectProps, selectActions } from '../../store/selectors/mainboard';
import StyledCard from '../common/StyledCard/';

import { styles } from './makeup';
import { requestorKeys, respondorKeys } from '../../constants/sampleContract';

const connector = connect(selectProps, selectActions);

type MainBoardProps = {
	classes: object,
	username: string,
	initialized: boolean,
	error: boolean,
	loading: boolean,
	requestorContractList: object,
	respondorContractList: object,
	projectSiteList: object,
	sparePartList: object,
	handleClearError: () =>  any,
	getContract: (method: string, path: string, query: object) => any,
	updateStatus: (method: string, path: string, body: string) => any
}

class MainBoard extends React.Component<MainBoardProps> {

	handleGetContract = () => {
		const { getContract, username } = this.props;
		getContract('GET', 'queries/getContractByProjSite',
			{ projSite: `resource:org.hyperledger_composer.scms.ProjectSite#${username}` });
	}

	constructor(props) {
		super(props);
		this.state = {
			oldUsername: props.username
		};
	}

	componentDidMount () {
		// this.handleGetContract();
	}

	componentDidUpdate () {
		const { error, handleClearError, initialized, username } = this.props;
		const { oldUsername } = this.state;
		if(oldUsername != username) {
			this.handleGetContract();
			this.setState({ oldUsername: username });
		}
		if (!initialized && username) {
			this.handleGetContract();
		}
		if (error) {
			alert(error);
			handleClearError();
		}
	}

	render () {
		const { classes, requestorContractList, respondorContractList, loading,
			updateStatus, projectSiteList, sparePartList } = this.props;
		// console.log('MainBoard render');
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
						<Button variant="contained" color="secondary" onClick={this.handleGetContract} className={classNames(classes.margin)}>
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
					Object.keys(respondorContractList).map((value, index) =>(
						<div key={index}>
							<StyledCard 
								sparePartName={sparePartList[respondorContractList[value]['sparePartId']]['displayName']}
								projectSiteName={projectSiteList[respondorContractList[value]['requestorProjectSite'].split('#')[1]]['name']}
								updateStatus={updateStatus}
								stepperLabel={'responder'}
								handleStepNext={updateStatus}
								title={`Contract Id: ${value}`} 
								content={respondorContractList[value]} 
								contentKeys={respondorKeys}/>
							<div className={classes.seperater} />
						</div>
					))
				}

				{
					Object.keys(respondorContractList).length == 0 ?
						<div style={{ marginTop: '10%', marginBottom: '10%' }} />
						: null
				}
				<div className={classes.divider} >
					<div className={classes.header} >
						<Typography variant="headline" color="inherit">
							Our Requests
						</Typography>
						<Divider />
					</div>
				</div>
				{/* {
					loading ?
						<LinearProgress />
						: null
				} */}
				{
					Object.keys(requestorContractList).map((value, index) => (
						<div key={index}>
							<StyledCard
								sparePartName={sparePartList[requestorContractList[value]['sparePartId']]['displayName']}
								projectSiteName={projectSiteList[requestorContractList[value]['respondorProjectSite'].split('#')[1]]['name']}
								updateStatus={updateStatus}
								stepperLabel={'requestor'}
								handleStepNext={updateStatus}
								title={`Contract Id: ${value}`}
								content={requestorContractList[value]}
								contentKeys={requestorKeys} />
							<div className={classes.seperater} />
						</div>
					))
				}
			</div>
		);
	}
}

export default withStyles(styles)(connector(MainBoard));