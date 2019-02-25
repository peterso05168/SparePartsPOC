// @flow
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import uuidv4 from 'uuid/v4';


import { connect } from 'react-redux';

import { selectProps, selectActions } from '../../store/selectors/newRequest';
import RequestCard from './RequestCard';

import { styles } from './makeup';

const connector = connect(selectProps, selectActions);

type NewRequestProps = {
	username: string,
	classes: object,
	error: string,
	loading: boolean,
	projectSiteList: object,
	sparePartList: object,
	selectedSparePart: string,
	sparePartToProjectSiteList: object,
	selectedProjectSite: string,
	selectedQuantity: number,
	handleClearError: () => any,
	handleSelectSparePart: (id: string) => any,
	handleSelectProjectSite: (id: string) => any,
	handleSelectQuantity: (quantity: number) => any,
	getSparePart: (method: string, path: string) => any,
	getSparePartToProjectSiteBySparePartId: (method: string, path: string, query: object) => any,
	postContract: (method: string, path: string, body: string) => any
}

class NewRequest extends React.Component<NewRequestProps> {

	constructor() {
		super();
		this.state = {
			dropdownLabel: 'sparePart',
			quantity: 0
		};
	}

	onSelectProjectSite = (projectSiteId, quantity) => {
		const { handleSelectProjectSite } = this.props;
		this.setState({ quantity });
		handleSelectProjectSite(projectSiteId);
	}

	onSelectSparePart = (id) => {
		const { handleSelectSparePart, getSparePartToProjectSiteBySparePartId } = this.props;
		handleSelectSparePart(id);
		getSparePartToProjectSiteBySparePartId('GET', 
			'queries/getSparePartToProjectSiteBySparePartId', { sparePartId: id });
	}

	onConfirmInsertion = () => {
		const { postContract, selectedSparePart, selectedProjectSite, username, selectedQuantity } = this.props;
		const body = {
			'id': uuidv4(),
			'sparePartId': selectedSparePart,
			'noOfSparePart': selectedQuantity,
			'requestorStatus': 'P',
			'respondorStatus': 'N',
			'amiToken': 'N',
			'isTerminated': 'N',
			'paymentToRespondor': 'N',
			'requestorProjectSite': `resource:org.hyperledger_composer.scms.ProjectSite#${username}`,
			'respondorProjectSite': `resource:org.hyperledger_composer.scms.ProjectSite#${selectedProjectSite}`
		};
		postContract('POST', 'Contract', body);
	}

	componentDidMount () {
		const { getSparePart } = this.props;
		getSparePart('GET', 'SparePart');
	}

	componentDidUpdate () {
		const { error, handleClearError } = this.props;
		// if (error) {
		// 	alert(error);
		// 	handleClearError();
		// }
	}

	render () {
		const { classes, loading, handleSelectProjectSite,
			handleSelectQuantity, projectSiteList, sparePartList, sparePartToProjectSiteList,
			selectedSparePart, selectedProjectSite, selectedQuantity } = this.props;
		const { dropdownLabel, quantity} = this.state;
		console.log('MainBoard render');
		return (
			<div className={classes.wrapper}>
				{
					loading ?
						<LinearProgress />
						: null
				}
				<RequestCard
					title={'New Request'}
					loading={loading}
					dropdownLabel={dropdownLabel}
					projectSiteList={projectSiteList}
					sparePartList={sparePartList}
					sparePartToProjectSiteList={sparePartToProjectSiteList}
					selectedSparePart={selectedSparePart}
					selectedProjectSite={selectedProjectSite}
					selectedQuantity={selectedQuantity}
					handleSelectSparePart={this.onSelectSparePart}
					handleSelectProjectSite={handleSelectProjectSite}
					handleSelectQuantity={handleSelectQuantity}
					quantity={quantity}
					onSelectProjectSite={this.onSelectProjectSite}
					onConfirmInsertion={this.onConfirmInsertion}
				/>

				<Divider variant='middle' />
			</div>
		);
	}
}

export default withStyles(styles)(connector(NewRequest));