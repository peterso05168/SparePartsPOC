// @flow
import React from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import StyledStepper from '../../common/StyledStepper';

import { styles } from './makeup.js';
import { Divider } from '@material-ui/core';

import { stepperStatus, displayName } from '../../../constants/sampleContract';

type StyledCardProps = {
	classes: object,
	handleOpenCard: (id: string) => any,
	loading: boolean,
	title: string,
	content: object,
	contentKeys: array,
	stepperLabel: string,
	sparePartName: string,
	projectSiteName: string,
	updateStatus: (method: string, path: string, body: string) => any
};


const getActiveStep = (content) => {
	let returnStep = 0;
	_.forEach(stepperStatus, (obj, key) => {
		if (content[obj.field] == obj.value && parseInt(key) > returnStep)
			returnStep = key;
	});
	return parseInt(returnStep) + 1;
};

class StyledCard extends React.Component<StyledCardProps> {

	getDisplayName = (value) => {
		const { sparePartName, projectSiteName, content } = this.props;
		if (value == 'sparePartId') {
			return sparePartName;
		} else if (value == 'respondorProjectSite' || value == 'requestorProjectSite') {
			return projectSiteName;
		}
		return content[value];
	}

	handleStepNext = (newStatus, field, updateAvaliability, target) => {
		console.log('update status');
		const { content, updateStatus } = this.props;
		const { id, requestorProjectSite, respondorProjectSite, sparePartId, noOfSparePart } = content;
		const path = field == 'requestorStatus' ? 'UpdateReqContract' : 'UpdateRespContract';
		const body = {
			newStatus,
			contract : `resource:org.hyperledger_composer.scms.Contract#${id}`,
		};
		const method = 'POST';
		updateStatus(method, path, body);

		if (updateAvaliability) {
			console.log('update noOfSparePart');
			const updatePath = 'UpdateAvailNoOfSparePartToProjSite';
			const noOfAvailable = updateAvaliability == '+' ? noOfSparePart : -noOfSparePart;
			const projectSite = target == 'requestor' ? requestorProjectSite : respondorProjectSite;
			const updateBody = {
				noOfAvailable,
				projectSite,
				sparePartId
			};
			updateStatus(method, updatePath, updateBody);
		}
	}

	handleRejected = (rejectUpdateAvaliability, target) => {
		const { content, updateStatus } = this.props;
		const { id, noOfSparePart, requestorProjectSite, respondorProjectSite, sparePartId } = content;
		const path = 'terminatedContract';
		const body = {
			contract: `resource:org.hyperledger_composer.scms.Contract#${id}`,
		};
		const method = 'POST';
		updateStatus(method, path, body);

		if (rejectUpdateAvaliability) {
			console.log('update rejectnoOfSparePart');
			const updatePath = 'UpdateAvailNoOfSparePartToProjSite';
			const noOfAvailable = rejectUpdateAvaliability == '+' ? noOfSparePart : -noOfSparePart;
			const projectSite = target == 'requestor' ? requestorProjectSite : respondorProjectSite;
			const updateBody = {
				noOfAvailable,
				projectSite,
				sparePartId
			};
			updateStatus(method, updatePath, updateBody);
		}
	}

	render() {
		const { classes, title, content, contentKeys, stepperLabel, loading } = this.props;
		return (
			<Card className={classes.card} onClick={() => console.log('aaa')}>
				<CardContent className={classes.card}>
					<Typography variant="h5" component="h2" className={classes.noSelectionTitle}>
						{title}
					</Typography>
					{
						contentKeys.map((value, index) => (
							<Typography key={index} component="p" className={classes.noSelection}>
								{`${displayName[value]}:   ${this.getDisplayName(value)}`}
								<br />
							</Typography>
						))
					}
				</CardContent>
				<CardActions className={classes.cardAction}>
					<StyledStepper 
						handleStepNext={this.handleStepNext} 
						handleRejected={this.handleRejected}
						label={stepperLabel} 
						loading={loading}
						activeStep={getActiveStep(content)}
						isTerminated={content.isTerminated == 'Y'}/>
				</CardActions>
			</Card>
		);
	}
}

export default withStyles(styles)(StyledCard);