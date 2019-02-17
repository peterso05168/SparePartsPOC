import purple from '@material-ui/core/colors/purple';
import lightGreen from '@material-ui/core/colors/lightGreen';

export const styles = theme => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(20),
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(20),
		color: theme.palette.text.secondary,
	},
	icon: {
		verticalAlign: 'bottom',
		height: 20,
		width: 20,
	},
	details: {
		alignItems: 'center',
	},
	column: {
		flexBasis: '50%',
	},
	helper: {
		borderLeft: `2px solid ${theme.palette.divider}`,
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '100%',
		height: '100%'
	},
	button: {
		margin: theme.spacing.unit,
	},
	margin: {
		margin: theme.spacing.unit,
	},
	purple: {
		color: theme.palette.getContrastText(purple[500]),
		backgroundColor: purple[500],
		'&:hover': {
			backgroundColor: purple[700],
		},
	},
	green: {
		color: theme.palette.getContrastText(purple[500]),
		backgroundColor: lightGreen[500],
		'&:hover': {
			backgroundColor: lightGreen[700],
		},
	},
	row: {
		'display': 'flex',
		'flexDirection': 'row',
		'position': 'relative',
		'flexShrink': 0,
		'padding': '5px',
		'paddingRight': '30px',
		'justifyContent': 'space-between'
	},
	insertButtonDiv: {
		display: 'flex',
		alignItems: 'center',
		width: '20%',
	},
	searchText: {
		paddingTop: '4px',
		display: 'flex',
		width: '40%',
		alignItems: 'center'
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
	},
});