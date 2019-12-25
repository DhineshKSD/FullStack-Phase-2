import React from 'react';  
import AddEmployee from './AddEmployee';  
import Employeelist from './EmployeeList';  
import EditEmployee from './EditEmployee';  
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.css'; 
import './App.css';  
function App() {  
  return (  
    <Router>  
      <div className="container">  
        <nav className="navbar navbar-expand-lg navheader">  
          <div className="collapse navbar-collapse" >  
            <ul className="navbar-nav mr-auto">  
              <li className="nav-item">  
                <Link to={'/AddEmployee'} className="nav-link">AddEmployee</Link>  
              </li>  
              <li className="nav-item">  
                <Link to={'/Employeelist'} className="nav-link">Employee List</Link>  
              </li>  
            </ul>  
          </div>  
        </nav> <br />  
        <Switch>  
          <Route exact path='/AddEmployee' component={AddEmployee} />  
          <Route path='/edit/:id' component={EditEmployee} />  
          <Route path='/Employeelist' component={Employeelist} />  
        </Switch>  
      </div>  
    </Router>  
  );  
}  
export default App;