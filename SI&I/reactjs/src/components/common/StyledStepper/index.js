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
	return ['Pending', 'Approved', 'Received', 'Tested'];
}

const buttonLabel = {
	1: 'Approve',
	2: 'Deliver',
	3: 'Finish Test'
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
		console.log(activeStep);
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
