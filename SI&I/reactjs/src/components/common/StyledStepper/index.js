import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { styles } from './makeup';

function getSteps () {
	return ['Pending', 'Approved', 'Contract Signed', 'Received By Requester', 'Tested by Requester',
		'Arranged New part', 'Received By Respondor', 'Tested by Respondor'];
}

const buttonLabel = {
	1: 'Approve (Responder)',
	2: 'Sign & Deliver (Responder)',
	3: 'Comfirm Received (Requestor)',
	4: 'Finish Test (Requestor)',
	5: 'Arrange and Deliver (Requestor)',
	6: 'Comfirm Received (Responder)',
	7: 'Finish Test (Responder)',
};

class HorizontalLabelPositionBelowStepper extends React.Component {
	state = {
		activeStep: 1,
	};

	handleNext = () => {
		this.setState(state => ({
			activeStep: state.activeStep + 1,
		}));
	};

	handleBack = () => {
		this.setState(state => ({
			activeStep: state.activeStep - 1,
		}));
	};

	handleReset = () => {
		this.setState({
			activeStep: 0,
		});
	};

	render () {
		const { classes } = this.props;
		const steps = getSteps();
		const { activeStep } = this.state;
		return (
			<div className={classes.root}>
				<Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
					{steps.map(label => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<div>
					{
						activeStep != steps.length?
							<div>
								<Button 
									variant="contained" 
									color="primary" 
									onClick={this.handleNext} 
									className={classes.progressButton}>
									{buttonLabel[activeStep]}
								</Button>
							
							</div>
							: null
					}
				</div>
			</div>
		);
	}
}

HorizontalLabelPositionBelowStepper.propTypes = {
	classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);
