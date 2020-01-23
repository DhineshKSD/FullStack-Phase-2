import React from 'react';  
import { BrowserRouter as Router, NavLink } from 'react-router-dom'; 
import '../App.css'; 
import '../Navigation.css'
import '../Login.css'

export class Navigation extends React.Component {
    render() {
        return (
            <Router>  
            <div>
                <div className="container1"> 
                    <div className="position-fixed">
                        <nav className="navbar navbar-expand-lg navheader">  
                        <div className="collapse navbar-collapse" >  
                            <ul className="navbar-nav mr-auto"> 
                            <li className="nav-item">  
                                <NavLink to={'/'} exact={true} activeClassName="activeNav" onClick={event =>  window.location.href='/'} className="nav-link">Home</NavLink>  
                            </li> 
                            <li className="nav-item">  
                                <NavLink to={'/AddEmployee'} activeClassName="activeNav" onClick={event =>  window.location.href='/AddEmployee'}className="nav-link">Add Employee</NavLink>  
                            </li>  
                            <li className="nav-item">  
                                <NavLink to={'/Employeelist'} activeClassName="activeNav" onClick={event =>  window.location.href='/Employeelist'}className="nav-link">Employee List</NavLink>  
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
