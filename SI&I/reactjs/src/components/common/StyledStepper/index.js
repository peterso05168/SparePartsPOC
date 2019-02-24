import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { steps, stepperStatus } from '../../../constants/sampleContract';
import { styles } from './makeup';

class StyledStepper extends React.Component {

	render () {
		const { classes, label, activeStep, handleStepNext } = this.props;
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
									disabled={label != stepperStatus[activeStep.toString()].enable}
									onClick={() => handleStepNext(stepperStatus[activeStep]['value'], stepperStatus[activeStep]['field'])} 
									className={classes.progressButton}>
									{stepperStatus[activeStep]['label']}
								</Button>
							
							</div>
							: null
					}
				</div>
			</div>
		);
	}
}

StyledStepper.propTypes = {
	classes: PropTypes.object,
};

export default withStyles(styles)(StyledStepper);
