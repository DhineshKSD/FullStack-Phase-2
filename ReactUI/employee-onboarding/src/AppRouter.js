import React from 'react';  
import AddEmployee from '../src/components/AddEmployee';  
import Employeelist from '../src/components/EmployeeList';  
import EditEmployee from '../src/components/EditEmployee';  
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 
import Home from '../src/components/Home';
import '../src/App.css'; 
const AppRouter = () => {
    return(
        <Router>  
      <div className="container"> 
      <div class="position-fixed">
        <nav className="navbar navbar-expand-lg navheader">  
          <div className="collapse navbar-collapse" >  
            <ul className="navbar-nav mr-auto"> 
              <li className="nav-item">  
                <Link to={'/Home'} className="nav-link">Home</Link>  
              </li> 
              <li className="nav-item">  
                <Link to={'/AddEmployee'} className="nav-link">AddEmployee</Link>  
              </li>  
              <li className="nav-item">  
                <Link to={'/Employeelist'} className="nav-link">Employee List</Link>  
              </li>  
            </ul>  
          </div>  
        </nav> 
        </div> <br />  
        <Switch>  
          <Route exact path='/Home' component={Home} /> 
          <Route path='/AddEmployee' component={AddEmployee} />  
          <Route path='/edit/:id' component={EditEmployee} />  
          <Route path='/Employeelist' component={Employeelist} />  
        </Switch>  
      </div>  
    </Router>  
    )
}

const style={
    marginTop:'20px'
}
export default AppRouter;