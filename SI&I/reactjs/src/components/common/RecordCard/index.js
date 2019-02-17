//@flow
import React, { Fragment } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ReactJson from 'react-json-view';
import getUID from '../../../constants/uid';

import { styles } from './makeup';

type RecordCardProps = {
	classes: object,
	isNew: boolean,
	selectedType: string,
	recordId: string,
	detailJSON: string,
	onJSONChange: (obj: object, recordId: string, isNew: boolean) => any,
	onSubmit: (method: string) => any
}

class RecordCard extends React.Component<RecordCardProps> {

	onChange = ({ updated_src }) => {
		const { recordId, onJSONChange, isNew } = this.props;
		onJSONChange(updated_src, recordId, isNew);
	}

	render() {
		const { classes, selectedType, isNew, recordId, detailJSON, onSubmit } = this.props;
		return (
			<div>
				<ExpansionPanel defaultExpanded={isNew}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className={classes.column}>
							<Typography className={classes.heading}>{getUID[selectedType]}</Typography>
						</div>
						<div className={classes.column}>
							<Typography className={classes.secondaryHeading}>{recordId}</Typography>
						</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={classes.details}>
						<div className={classNames(classes.column)}>
							<ReactJson
								src={detailJSON}
								onEdit={selectedType != 'MoveProduct' || isNew? this.onChange: false}
							/>
						</div>
					</ExpansionPanelDetails>
					<Divider />
					<ExpansionPanelActions>
						{!isNew?
							selectedType != 'MoveProduct'?
								<Fragment>
									<Button
										variant="contained"
										color="secondary"
										className={classNames(classes.margin, classes.green)}
										onClick={() => onSubmit('PUT', recordId, detailJSON)}
									>
                            Update
									</Button>
									<Button
										variant="contained" 
										color="secondary"
										className={classNames(classes.margin, classes.purple)}
										onClick={() => onSubmit('DELETE', recordId)}
									>
                            Delete
									</Button>
								</Fragment>
								: <div />
							: 
							<Button
								variant="contained"
								color="secondary"
								className={classNames(classes.margin, classes.cyan)}
								onClick={() => onSubmit('POST', recordId, detailJSON)}
							>
								INSERT

							</Button>
						}
					</ExpansionPanelActions>
				</ExpansionPanel>
			</div>
		);
	}
}

export default withStyles(styles)(RecordCard);