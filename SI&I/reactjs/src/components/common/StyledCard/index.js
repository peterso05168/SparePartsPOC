// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import StyledStepper from '../StyledStepper/';

import { styles } from './makeup.js';
import { Divider } from '@material-ui/core';

type StyledCardProps = {
	classes: object,
	handleOpenCard: (id: string) => any,
	title: string,
	content: object,
	contentKeys: array
};

class StyledCard extends React.Component<StyledCardProps> {

	render() {
		const { classes, title, content, contentKeys, handleOpenCard} = this.props;
		return (
			<Card className={classes.card} onClick={() => console.log('aaa')}>
				<CardContent className={classes.card}>
					<Typography variant="h5" component="h2" className={classes.noSelectionTitle}>
						{title}
					</Typography>
					{
						contentKeys.map((value, index) => (
							<Typography key={index} component="p" className={classes.noSelection}>
								{`${value}: ${content[value]}`}
								<br />
							</Typography>
						))
					}
				</CardContent>
				<CardActions className={classes.cardAction}>
					<StyledStepper />
				</CardActions>
			</Card>
		);
	}
}

export default withStyles(styles)(StyledCard);