import indigo from '@material-ui/core/colors/indigo';
export const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		minWidth: 100,
	},
	selectEmpty: {
		width: '85%',
		maxWidth: '150px',
		color: '#FFFFFF',
		backgroundColor: indigo[500],
		'&:before': {
			borderColor: '#FFFFFF',
		},
		// '&:hover:not($disabled)': {
		// 	borderColor: '#FFFFFF',
		// 	backgroundColor: '#FFFFFF',
		// 	underline: {
		// 		backgroundColor: '#FFFFFF !important'
		// 	}
		// },
		'&:after': {
			borderColor: '#FFFFFF',
		}
	},
	icon: {
		fill: '#FFFFFF',
	}
});