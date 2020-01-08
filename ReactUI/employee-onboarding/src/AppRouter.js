import React from 'react'; 
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';  
import AddEmployee from '../src/components/AddEmployee';  
import Employeelist from '../src/components/EmployeeList';  
import EditEmployee from '../src/components/EditEmployee'; 
import PersonalInfo from '../src/components/PersonalInfo'; 
import Home from '../src/components/Home';
import Login from '../src/components/Login';
import Thanks from '../src/components/Thanks';
import UserHome from '../src/components/UserHome'
import '../src/App.css'; 
import '../src/Navigation.css';
import '../src/Login.css';
import Education from '../src/components/Education';
import Employment from '../src/components/Employment';
import View from '../src/components/View'

const AppRouter = () => {
    return(
        <Router>      
                <Switch>  
                        <Route path='/Login' component={Login} /> 
                        <Route exact path='/' component={Home} /> 
                        <Route path='/AddEmployee' component={AddEmployee} />  
                        <Route path='/edit/:id' component={EditEmployee} />  
                        <Route path='/Employeelist' component={Employeelist} />
                        <Route path='/PersonalInfo' component={PersonalInfo} />  
                        <Route path='/Thanks' component={Thanks} /> 
                        <Route path='/Education' component={Education} /> 
                        <Route path='/UserHome' component={UserHome} /> 
                        <Route path='/Employment' component={Employment} /> 
                        <Route path='/view/:id' component={View}/>
                </Switch>  
        </Router>  
    )
}

export default AppRouter;