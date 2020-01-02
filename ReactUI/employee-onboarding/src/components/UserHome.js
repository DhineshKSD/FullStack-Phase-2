import React, { Component } from 'react'
import '../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Employee from '../Assets/EmployeeEntry.png';
import PrimarySearchAppBar from '../components/Header';
import ButtonMat from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 
import { Container, Col, Form, row, FormGroup, Label, Input, Button } from 'reactstrap';
import '../Navigation.css';
import Navigation from '../components/Navigation';
import '../Home.css';
import axios from 'axios';
import ThanksAvatar from '../Assets/ThanksAvatar.png'; 


var Name;
export class UserHome extends Component {
    constructor(props){  
        super(props)  
        this.state = {  
        FirstName:'' ,
        disp:''  
        }
    }
    componentDidMount() {  
        var userId = localStorage.getItem("User");
        axios.get('https://localhost:44319/api/GetEmployeeById/'+userId)  
            .then(response => {  
                this.setState({   
                  FirstName: response.data.FirstName,
                  disp : localStorage.setItem('FirstName',response.data.FirstName)   
                   }); 
              localStorage.setItem('FirstName',response.data.FirstName);
            })  
            .catch(function (error) {  
                console.log(error);  
            })  
      }  
    render() {
        return (
            <div id="UserHomecard" >
               <PrimarySearchAppBar/>
               <Col sm={1} id="Instructions">  
                <ButtonMat variant="contained" color="secondary">Instructions</ButtonMat>{' '}
                </Col>
                <Col sm={1} id="StartFilling">  
                <Link to={'/PersonalInfo'} style={{ textDecoration: 'none' }}><ButtonMat variant="contained" color="secondary">StartFilling</ButtonMat>{' '}  </Link>
                </Col> 
                        <Card id="UserCardMessage">
                           
                                <Card id="card1" elevation={7}>
                                <CardContent>
                                <img src={Employee} className="Employee-logo" alt="logo" />
                                </CardContent>
                                </Card>
                        
                                <Card id="card2" elevation={7}>
                                <CardContent>
                                <img src={ThanksAvatar} className="ThanksAvatarWelcome" alt="ThanksAvatar" />

                                <p id="WelcomeUser"> "Hello {localStorage.getItem('FirstName')}"</p>
                                <p id="Welcome">Welcome To Psiog's Employee On-Boarding Hub</p>
                                </CardContent>
                                </Card>
                        </Card>   
            </div>
        )
    }
}

export default UserHome
