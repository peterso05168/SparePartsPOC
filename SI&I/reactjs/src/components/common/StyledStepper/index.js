import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/CancelRounded';
import { steps, stepperStatus } from '../../../constants/sampleContract';
import { styles } from './makeup';

class StyledStepper extends React.Component {

	render () {
		const { classes, loading, label, activeStep, handleStepNext, handleRejected, isTerminated } = this.props;
		return (
			<div className={classes.root}>
				<Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
					{
						steps.map((label, index) => {
							const stepProps = {};
							if (isTerminated && index == activeStep) 
								stepProps.icon = (
									<CancelIcon color="secondary" fontSize="large" className={classes.cancelIcon}/>
								);
							return (
								<Step key={label}>
									<StepLabel {...stepProps} >{label}</StepLabel>
								</Step>
							);})
					}
				</Stepper>
				<div>
					{
						activeStep != steps.length && label == stepperStatus[activeStep].enable && !isTerminated?
							stepperStatus[activeStep]['rejectLabel']?
								<div>
									<Button 
										variant="contained"
										color="primary"
										disabled={loading}
										onClick={() => handleStepNext(stepperStatus[activeStep]['value'], 
											stepperStatus[activeStep]['field'], 
											stepperStatus[activeStep]['updateAvaliability'],
											stepperStatus[activeStep].enable)} 
										className={classes.progressButton}>
										{stepperStatus[activeStep]['label']}
									</Button>
									<Button
										variant="contained"
										color="secondary"
										disabled={loading}
										onClick={() => handleRejected(stepperStatus[activeStep]['rejectUpdateAvaliability'], stepperStatus[activeStep].enable)}
										className={classes.progressButton}>
										{stepperStatus[activeStep]['rejectLabel']}
									</Button>
								</div>
								: <div>
									<Button
										variant="contained"
										color="primary"
										disabled={loading}
										onClick={() => handleStepNext(stepperStatus[activeStep]['value'],
											stepperStatus[activeStep]['field'],
											stepperStatus[activeStep]['updateAvaliability'],
											stepperStatus[activeStep].enable)}
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
