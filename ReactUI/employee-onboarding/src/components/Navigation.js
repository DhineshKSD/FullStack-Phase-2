import React from 'react';  
import AddEmployee from '../components/AddEmployee';  
import Employeelist from '../components/EmployeeList';  
import EditEmployee from '../components/EditEmployee'; 
import PersonalInfo from '../components/PersonalInfo'; 
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'; 
import Home from '../components/Home';
import Login from '../components/Login'
import '../App.css'; 
import '../Navigation.css'
import '../Login.css'

export class Navigation extends React.Component {
    render() {
        return (
            <Router>  
            <div>
                <div className="container1"> 
                    <div class="position-fixed">
                        <nav className="navbar navbar-expand-lg navheader">  
                        <div className="collapse navbar-collapse" >  
                            <ul className="navbar-nav mr-auto"> 
                            <li className="nav-item">  
                                <NavLink to={'/'} exact={true} activeClassName="active" onClick={event =>  window.location.href='/'} className="nav-link">Home</NavLink>  
                            </li> 
                            <li className="nav-item">  
                                <NavLink to={'/AddEmployee'} activeClassName="active" onClick={event =>  window.location.href='/AddEmployee'}className="nav-link">Add Employee</NavLink>  
                            </li>  
                            <li className="nav-item">  
                                <NavLink to={'/Employeelist'} activeClassName="active" onClick={event =>  window.location.href='/Employeelist'}className="nav-link">Employee List</NavLink>  
                            </li>  
                            </ul>  
                        </div>  
                        </nav> 
                    </div>
                 </div>
            </div>
            </Router>
        )
    }
}

export default Navigation
