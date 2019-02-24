// @flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { styles } from './requestCardMakeup';
import { Divider } from '@material-ui/core';

type RequestCardProps = {
	classes: object,
	loading: boolean,
	handleOpenCard: (id: string) => any,
	title: string,
	content: object,
	contentKeys: array,
	dropdownLabel: string,
	projectSiteList: object,
	sparePartList: object,
	selectedSparePart: string,
	sparePartToProjectSiteList: object,
	selectedProjectSite: string,
	selectedQuantity: number,
	quantity: number,
	handleSelectSparePart: (id: string) => any,
	handleSelectProjectSite: (id: string) => any,
	handleSelectQuantity: (quantity: number) => any,
	onSelectProjectSite: (projectSiteId: string, quantity: number) => any,
	onConfirmInsertion: () => any
};

const getQuantity = (availableQuantity) => {
	let availableQuantityArray = [];
	for (let i = 1; i <= availableQuantity; i++) {
		availableQuantityArray.push(i);
	}
	return availableQuantityArray;
};

class RequestCard extends React.Component<RequestCardProps> {


	render () {
		const { classes, loading, title, onConfirmInsertion,
			dropdownLabel, handleSelectSparePart, handleSelectProjectSite,
			handleSelectQuantity, onSelectProjectSite, projectSiteList, sparePartList, sparePartToProjectSiteList,
			selectedSparePart, selectedProjectSite, selectedQuantity, quantity} = this.props;

		return (
			<Card className={classes.card}>
				<CardContent className={classes.card}>
					<Typography variant="h5" component="h2" className={classes.noSelectionTitle}>
						{title}
					</Typography>
					<Grid container spacing={24}>
						<Grid item xs={12} sm={6}>
							<FormControl className={classes.select}>
								<InputLabel htmlFor={dropdownLabel.toLowerCase()}>{'Spart Part'}</InputLabel>
								<Select
									className={classes.select}
									autoWidth={true}
									value={selectedSparePart}
									onChange={(event) => handleSelectSparePart(event.target.value)}
									inputProps={{
										id: dropdownLabel.toLowerCase(),
									}}
								>
									{
										Object.keys(sparePartList).map((key) => {
											return (<MenuItem key={key} value={key}>{sparePartList[key]['displayName']}</MenuItem>);
										})
									}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
						</Grid>
						<Grid item xs={12} sm={6}>
							{
								selectedProjectSite || !selectedSparePart?
									<TextField className={classes.projectSiteTF}
										id={selectedProjectSite}
										name={selectedProjectSite}
										value={projectSiteList[selectedProjectSite]? 
											projectSiteList[selectedProjectSite]['name']: ''}
										disabled={!selectedSparePart}
										label={'ProjectSite'}
										fullWidth
										autoComplete="billing address-line2"
										onClick={() => handleSelectProjectSite('')}
									/> :
									<List component="nav" className={classes.list}>
										{
											!loading && Object.keys(sparePartToProjectSiteList).length > 0 ?
												Object.keys(sparePartToProjectSiteList).map((key) => {
													const projectSiteId = sparePartToProjectSiteList[key]['ownerProjectSite'].split('#')[1];
													const projectSiteName = projectSiteList[projectSiteId] ? projectSiteList[projectSiteId]['name']: null;
													const availableQuantity = sparePartToProjectSiteList[key]? sparePartToProjectSiteList[key]['noOfAvailable']: null;
													if(!projectSiteId || !projectSiteName || !availableQuantity) {
														return (<ListItem key={key}>
															<ListItemText inset primary={'Not Avaliable'} />
														</ListItem>);
													}
													return (
														<ListItem key={key} button onClick={() =>  onSelectProjectSite(projectSiteId, availableQuantity)}>
															<ListItemText inset primary={projectSiteName} />
															<Typography color="textSecondary" className={classes.noSelectionTitle}>
																{`Avaliable: ${availableQuantity}`}
															</Typography>
														</ListItem>
													);
												})
												: <ListItem>
													<ListItemText inset primary={'Not Avaliable'} />
												</ListItem>
										}
									</List>
							}
						</Grid>
						<Grid item xs={12} sm={6}>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl className={classes.quantitySelect}>
								<InputLabel htmlFor={dropdownLabel.toLowerCase()}>{'Quantity'}</InputLabel>
								<Select
									className={classes.quantitySelect}
									autoWidth={true}
									value={selectedQuantity ? selectedQuantity: ''}
									disabled={!(selectedSparePart && selectedProjectSite)}
									onChange={(event) => handleSelectQuantity(event.target.value)}
									inputProps={{
										id: dropdownLabel.toLowerCase(),
									}}
								>
									{
										getQuantity(quantity).map((key) => {
											return (<MenuItem key={key} value={key}>{key}</MenuItem>);
										})
									}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							
						</Grid>
						
					</Grid>
				</CardContent>
				<CardActions className={classes.confirmDiv}>
					<Button variant="contained" color="secondary" onClick={onConfirmInsertion} className={classes.confirmButton}>
					Confirm
					</Button>
				</CardActions>
			</Card>
		);
	}
}

export default withStyles(styles)(RequestCard);