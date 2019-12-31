import React, { Component } from 'react'
import '../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Employee from '../Assets/EmployeeEntry.png';
import PrimarySearchAppBar from '../components/Header';
import '../Navigation.css';
import Navigation from '../components/Navigation';
import '../Home.css';
import axios from 'axios';
import ThanksAvatar from '../Assets/ThanksAvatar.png'; 


var Name;
export class Home extends Component {
    componentDidMount() {  
        var userId = localStorage.getItem("User");
        axios.get('https://localhost:44319/api/GetEmployeeById/'+userId)  
            .then(response => {  
                this.setState({   
                  FirstName: response.data.FirstName,   
                   }); 
              localStorage.setItem('FirstName',response.data.FirstName);
            })  
            .catch(function (error) {  
                console.log(error);  
            })  
      }  
    render() {
        Name = localStorage.getItem('FirstName');
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
                                <img src={ThanksAvatar} className="ThanksAvatarWelcome" alt="ThanksAvatar" />

                                <p id="WelcomeUser"> "Hello {Name}"</p>
                                <p id="Welcome">Welcome To Psiog's Employee On-Boarding Hub</p>
                                </CardContent>
                                </Card>
                        </Card>   
            </div>
        )
    }
}

export default Home
