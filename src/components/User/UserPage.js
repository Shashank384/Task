import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {Typography,Paper, FormControl} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import firebase from '../firebase'
import { withRouter} from 'react-router-dom'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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
    userContainer: {
        margin: theme.spacing(5)
    }
  }));

 const UserPage = (props) => {
    const classes = useStyles();
    const name = firebase.getCurrentUsername();
    // const [currPassword, setCurrPassword] = useState(name)
    const [newPassword, setNewPassword] = useState(name)
    const [btnText,setBtnText] = useState('Change Password')
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
    
    const buttonAction=(e)=>{
        if(btnText === 'Change Password'){    
            setNewPassword('')
            setBtnText('Save Password');
        }
        else if(btnText === 'Save Password'){
            setNewPassword(e.target.value)
            setBtnText('Change Password');
            changePassword();
            setNewPassword('')
        }
    }

    const pwd = (
        <React.Fragment>
        <form className={classes.root} onSubmit={e => e.preventDefault() && false}>
        <FormControl margin="normal" required fullWidth>
                <TextField
                    name="password"
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
        </FormControl>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="sprimary"
                    onClick={buttonAction}
                    className={classes.submit}
                >
                {btnText}
              </Button>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                onClick={logout}
                className={classes.submit}>
                Logout
                </Button>  
            </form>
        </React.Fragment>
    )
    return (
        <main className={classes.main}>
			<Paper className={classes.paper}>
            
            <Typography component="h1" variant="h5">
                Username :  { name }
            </Typography>
                { pwd }

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                  Password changed Succesully! 
                </Alert>
              </Snackbar>
        
        </Paper>         
        </main>    
    )

    async function logout() {
      await firebase.logout()
      props.history.push('/')
    } 
    async function changePassword() {
        try {
            await firebase.changePassword(newPassword)
            handleClick()
        } catch (error) {
            alert(error.message)
        }
    }
}
export default withRouter(UserPage)