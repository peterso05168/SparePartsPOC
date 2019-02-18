// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

import { styles } from './makeup';

type StyledDropdownProps = {
	classes: object, //from material ui
	dropdownLabel: string,
	dropdownList: object,
	seletedValue: string,
	helperText: string,
	handleChange: (string) => any

};

class StyledDropdown extends React.Component<StyledDropdownProps> {

	render () {
		const { dropdownLabel, dropdownList, seletedValue, classes, helperText, handleChange} = this.props;
		const { root, formControl, selectEmpty } = classes;
		return (
			<div style={{ padding: 0}}>
				<Select
					className={selectEmpty}
					autoWidth={false}
					value={seletedValue}
					onChange={(event) => handleChange(event.target.value)}
					inputProps={{
						id: dropdownLabel.toLowerCase(),
						classes: {
							icon: classes.icon
						}
					}}
				>
					{
						Object.keys(dropdownList).map((key) => {
							return (<MenuItem key={key} value={key}>{dropdownList[key]['name']}</MenuItem>);
						})
					}
				</Select>
			</div>
		);
	}
}

export default withStyles(styles)(StyledDropdown);
