import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import firebase from './firebase'
import { withRouter} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
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
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	  },
}));

function LoginPage(props) {
	const classes = useStyles();
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = React.useState(false);
	
  	const handleClose = () => {
 		setOpen(false);
	  };
	const handleToggle = () => {
	setOpen(!open);
	};
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={()=>{login(); handleToggle();}}
						className={classes.submit}
						disable={loading}>
						Sign in
					  </Button>
					  {loading && 
						<Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
					  		<CircularProgress color="inherit" />
					  	</Backdrop>
					}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/registerpage"
						className={classes.submit}>
						Register
          			</Button>
				</form>
			</Paper>
		</main>
	)

	async function login() {
		try {
			setLoading(true)
			setTimeout(async()=> {
				setLoading(false)
			},2000)

			await firebase.login(email, password)
			props.history.replace('/home')
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter((LoginPage))