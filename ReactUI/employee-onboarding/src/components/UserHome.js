import React, { Component } from 'react'
import '../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Employee from '../Assets/EmployeeEntry.png';
import PrimarySearchAppBar from '../components/Header';
import ButtonMat from '@material-ui/core/Button'; 
import { Col } from 'reactstrap';
import '../Navigation.css';
import '../Home.css';
import axios from 'axios';
import ThanksAvatar from '../Assets/ThanksAvatar.png'; 
import Instruction from '../components/Instruction';
import decode from 'jwt-decode';

export class UserHome extends Component {
    constructor(props){  
        super(props)  
        this.state = {  
        FirstName:'' ,
        SubmissionStatus:true,
        disp:''  
        }
    }
    componentDidMount() {  
        var userId = localStorage.getItem("User");
        axios.get('https://localhost:44319/api/GetEmployeeById/'+userId)  
            .then(response => {  
                this.setState({   
                  FirstName: response.data.FirstName,
                  SubmissionStatus :response.data.SubmissionStatus,
                  disp : localStorage.setItem('FirstName',response.data.FirstName)   
                   }); 
              localStorage.setItem('FirstName',response.data.FirstName);
              console.log(this.state.SubmissionStatus);
            })  
            .catch(function (error) {  
                console.log(error);  
            })  
            this.IsTokenAvailable();
      } 
      
      IsTokenAvailable(){
        if (localStorage.getItem("Token") === null) {
            return (window.location.href='/Login');
          }
          else{
              this.IsTokenExpired();
          }
      }
      IsTokenExpired(){
            var Token = localStorage.getItem("Token");
            var DecodedToken = decode(Token);
            var time = (DecodedToken.exp < Date.now() / 1000);
           
           localStorage.setItem('key',time)
           if(time){
            window.location.href='/Login';
           }
      }
      
    render() {
        return (
            <div id="UserHomecard" >
               <PrimarySearchAppBar/>
               <Col sm={1} id="Instructions">  
               <ButtonMat color="secondary" disabled={this.state.SubmissionStatus}><Instruction /></ButtonMat>
                </Col> 
                <Card id="UserCardMessage"elevation={0}>
                    
                        <Card id="card1" elevation={10}>
                        <CardContent>
                        <img src={Employee} className="Employee-logo" alt="logo" />
                        </CardContent>
                        </Card>
                
                        <Card id="card2" elevation={10}>
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
