import React from 'react';  
import AddEmployee from '../components/AddEmployee';  
import Employeelist from '../components/EmployeeList';  
import EditEmployee from '../components/EditEmployee'; 
import PersonalInfo from '../components/PersonalInfo'; 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 
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
                                <Link to={'/'} onClick={event =>  window.location.href='/'}className="nav-link">Home</Link>  
                            </li> 
                            <li className="nav-item">  
                                <Link to={'/AddEmployee'} onClick={event =>  window.location.href='/AddEmployee'}className="nav-link">AddEmployee</Link>  
                            </li>  
                            <li className="nav-item">  
                                <Link to={'/Employeelist'} onClick={event =>  window.location.href='/Employeelist'}className="nav-link">Employee List</Link>  
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
