import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LockIcon from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import firebase from './firebase'
import { withRouter } from 'react-router-dom'
import logo from './Images/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
      height: "3.5em"
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    textTransform: "none",
    fontWeight:"400",
    fontSize: "1.1rem",
    minWidth: 10,
    marginLeft: "75px"  
  }, 
}));

function DashboardPage(props) {
  
  const classes = useStyles();
  const [value,setValue] = useState(0);
  const {history} = props
  const handleChange = (e, newValue) => {
      setValue(newValue);
  };
    let flag = firebase.getCurrentUsername();
	
const tabs = (
    <React.Fragment>
        <Tabs value={value} onChange={handleChange}>
            <Tab className={classes.tab} label="Home" component={Link} to="/home"/>
            <Tab className={classes.tab} label="Task" component={Link} to="/task"/>
            <Tab className={classes.tab} label="User" component={Link} to="/user"/> 
        </Tabs>
        <IconButton aria-label="logout" style={{marginLeft:"auto"}} color="secondary">
            <LockIcon  onClick={logout}/>
        </IconButton>
    </React.Fragment>
)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Button component={Link} to="/" className={classes.logoContainer}  disableRipple>
              <img className={classes.logo} alt="company logo" src={logo}/>  
            </Button> 
        {   flag ?  tabs: ''}
 
        </Toolbar>
      </AppBar>
    </div>
  );

  async function logout() {
    await firebase.logout()
    history.push('/')
    setValue(0)
    
}
}

export default withRouter(DashboardPage)