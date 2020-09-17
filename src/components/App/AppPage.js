import React from 'react'
import Landing from '../Landing'
import LoginPage from '../LoginPage'
import RegisterPage from '../RegisterPage'
import DashboardPage from '../DashboardPage'
import Home from '../HomePage/Home'
import TaskPage from '../Task/TaskPage'
import UserPage from '../User/UserPage'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import {  Switch,Route, withRouter} from 'react-router-dom'
// import firebase from '../firebase'
import './styles.css'

const theme = createMuiTheme()

function AppPage() {
	

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			
			<React.Fragment>
				<DashboardPage/>
				<Switch>
					<Route  exact path='/' component={Landing} />
					<Route  exact path='/loginpage' component={LoginPage} />
					<Route  path='/registerpage' component={RegisterPage} />
					<Route  path='/home' component={Home} />
					<Route  path='/task' component={TaskPage} />
					<Route  path='/user' component={UserPage} />	
				</Switch>
			</React.Fragment>
		</ThemeProvider>
	) 
}
export default withRouter((AppPage))