import React, { Component } from 'react'
import '../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Employee from '../Assets/EmployeeEntry.png'
export class Home extends Component {
    render() {
        return (
            <div id="card">
               
                        <Card id="CardMessage" elevation={3}>
                           
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
