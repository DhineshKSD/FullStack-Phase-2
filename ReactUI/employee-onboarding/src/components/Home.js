import React, { Component } from 'react'
import '../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Employee from '../Assets/EmployeeEntry.png';
import PrimarySearchAppBar from '../components/Header';
import '../Navigation.css';
import Navigation from '../components/Navigation';
import '../Home.css'
export class Home extends Component {
    render() {
        return (
            
            <div id="card">
               <PrimarySearchAppBar/>
                    <Navigation/>
                        <Card id="CardMessage" elevation={7}>
                           
                                <Card id="card1" elevation={7}>
                                <CardContent>
                                <img src={Employee} className="Employee-logo" alt="logo" />
                                </CardContent>
                                </Card>
                        
                                <Card id="card2" elevation={7}>
                                <CardContent>
                                <p id="Welcome">Welcome To Psiog's Employee On-Boarding Hub</p>
                                </CardContent>
                                </Card>
                        </Card>   
            </div>
        )
    }
}

export default Home
