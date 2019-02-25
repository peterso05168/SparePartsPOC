import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';

function TransitionUp (props) {
	return <Slide {...props} direction="up" />;
}

class StyledSnackbar extends React.Component {
	state = {
		Transition: TransitionUp,
	};

	render () {
		const { message, open, closeSnackbar } = this.props;
		return (
			<div>
				<Snackbar
					autoHideDuration={3500}
					open={open}
					onClose={closeSnackbar}
					TransitionComponent={this.state.Transition}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id="message-id">{message}</span>}
					action={[
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={closeSnackbar}
						>
							<CloseIcon style={{fontSize: '20px'}} />
						</IconButton>,
					]}
				/>
				
			</div>
		);
	}
}

export default StyledSnackbar;