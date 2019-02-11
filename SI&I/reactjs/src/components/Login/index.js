//@flow
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

import { selectProps, selectActions } from '../../store/selectors/login';

type LoginProps = {
	classes: object,
	email: string,
	password: string,
	login: (email: string, password: string) => any,
	inputEmail: (email: string) => any,
	inputPassword: (password: string) => any,
}

const connector = connect(selectProps, selectActions);

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	}
});

class Login extends React.Component<LoginProps> {
	
	handleLogin = () => {
		const { login, email, password } = this.props;
		if(!email || !password) return;
		login(email, password);
	}

	render() {
		const { email, password, inputEmail, inputPassword } = this.props;
		const { main, paper, avatar, form } = this.props.classes;

		return (
			<div className={main}>
				<CssBaseline />
				<Paper className={paper}>
					<Avatar className={avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
                    Sign in
					</Typography>
					<form className={form}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email Address</InputLabel>
							<Input 
								id="email" 
								name="email" 
								autoComplete="email" 
								placeholder='example: abc@email.com'
								value={email}
								onChange={(event) => inputEmail(event.target.value)}
								autoFocus />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input 
								name="password" 
								type="password" 
								id="password"
								value={password}
								onChange={(event) => inputPassword(event.target.value)}
								autoComplete="current-password" />
						</FormControl>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="button"
							fullWidth
							variant="contained"
							color="primary"
							onClick={this.handleLogin}
						>
                        Sign in
						</Button>
					</form>
				</Paper>
			</div>
		);
	}
}

export default connector(withStyles(styles)(Login));