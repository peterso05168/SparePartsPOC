//@flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';

import { styles } from './makeup';
import { selectProps, selectActions } from '../../store/selectors/asset';
import RecordCard from '../common/RecordCard';
import getUID from '../../constants/uid';

const connector = connect(selectProps, selectActions);

type AssetProps = {
	classes: object,
	loading: boolean,
	isNew: boolean,
	newAsset: object,
	needRefresh: boolean,
	selectedType: string,
	assets: object,
	searchById: string,
	error: string,
	typeEnums: object,
	getSelectedTypeAsset: (method: string, path: string) => any,
	handleSelectType: (selectedType: string) => any,
	handleSearch: (searchId: string) => any,
	handleRefresh: () => any,
	handleJSONChange: (obj: object, recordId: string, isNew: boolean) => any,
	handleInsert: (method: string, path: string, body: string) => any,
	handleUpdate: (method: string, path: string, body: string) => any,
	handleDelete: (method: string, path: string) => any,
	handleClearError: () => any,
	handleInsertMode: () => any
}

class Asset extends React.Component<AssetProps> {

	handleSubmit = (method, recordId, body) => {
		const { handleInsert, handleUpdate, handleDelete, selectedType } = this.props;
		if(method == 'POST') {
			handleInsert(method, `${selectedType}`, body);
		} else if (method == 'PUT') {
			delete body[getUID[selectedType]]; 
			handleUpdate(method, `${selectedType}/${recordId}`, body);
		} else if (method == 'DELETE') {
			handleDelete(method, `${selectedType}/${recordId}`);
		}
	}

	onSelecteType = (selectedType) => {
		const { handleSelectType } = this.props;
		if (!selectedType) return;
		handleSelectType(selectedType);
	}

	onSearch = () => {
		const { handleSearch, searchById } = this.props;
		if (!searchById) return;
		handleSearch(searchById);
	}

	componentDidUpdate() {
		const { selectedType, needRefresh, handleClearError, getSelectedTypeAsset, error } = this.props;
		if (error) {
			alert(error);
			handleClearError();
		}
		if (selectedType && needRefresh) {
			getSelectedTypeAsset('GET', `${selectedType}`);
		}
	}
	
	render () {
		const { classes, selectedType, searchById, handleJSONChange, handleInsertMode,
			handleRefresh, loading, assets, typeEnums, isNew, newAsset } = this.props;
		console.log('asset render');
		return (
			<div className={classes.root}>
				<div className={classes.row}>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="type">Type</InputLabel>
						<Select
							value={selectedType}
							onChange={(event) => this.onSelecteType(event.target.value)}
							inputProps={{
								name: 'type',
								id: 'type',
							}}
						>
							{
								Object.keys(typeEnums).map((key) => {
									return (<MenuItem key={key} value={typeEnums[key]}>{key}</MenuItem>);
								})
							}
						</Select>

					</FormControl>
					<div className={classes.searchText}>
						<TextField
							id="standard-search"
							label="Search"
							type="search"
							className={classes.textField}
							margin="normal"
							value={searchById}
							onChange={this.onSearch}
						/>
					</div>
					<div className={classes.insertButtonDiv}>
						<Button variant="contained" color="secondary" onClick={handleRefresh} className={classNames(classes.margin)}>
							Refresh
						</Button>
						<Button variant="contained" color="primary" onClick={handleInsertMode} className={classNames(classes.margin)}>
							New
						</Button>
					</div>
				</div>
				<div>
					{
						loading?
							<LinearProgress />
							: null
					}
				</div>
				<div>
					{
						isNew? 
							<RecordCard
								isNew={isNew}
								selectedType={selectedType}
								recordId={newAsset[getUID[selectedType]]}
								detailJSON={newAsset}
								onJSONChange={handleJSONChange}
								onSubmit={this.handleSubmit}
							/> :
							Object.keys(assets).map((key) => (
								<RecordCard
									key={key}
									isNew={isNew}
									selectedType={selectedType}
									recordId={key}
									detailJSON={assets[key]}
									onJSONChange={handleJSONChange}
									onSubmit={this.handleSubmit}
								/>
							))
					}
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(connector(Asset));