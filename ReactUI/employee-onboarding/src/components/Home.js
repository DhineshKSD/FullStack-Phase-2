import React, { Component } from 'react'
import '../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Employee from '../Assets/EmployeeEntry.png';
import PrimarySearchAppBar from '../components/Header';
import '../Navigation.css';
import Navigation from '../components/Navigation';
import '../Home.css';
import axios from 'axios';
import ThanksAvatar from '../Assets/ThanksAvatar.png'; 
import decode from 'jwt-decode';
import Delayed from '../components/Delayed';
import Loader from 'react-loader-spinner';

export class Home extends Component {
    constructor(props){  
        super(props)  
        this.state = {  
        FirstName:'' ,
        disp:'',
        spin:true  
        }
    }
    componentDidMount() {  
        this.setState({spin:true})
        setTimeout(() => { 
            this.setState({spin:false})
        }, 2000);
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
           
           //localStorage.setItem('key',time)
           if(time){
            window.location.href='/Login';
           }
      }
    
    render() {
        return ( 
            <div id="Homecard">
                <Loader 
                    type="Circles"
                    color="#e91e63"
                    height={100}
                    width={100}
                    //timeout={3000} //3 secs
                    visible = {this.state.spin}
                    style={{position:'relative',height:'55vh',top:'15em',left:'45%',zIndex: '2'}}
                />
                <Delayed waitBeforeShow={2000}>
                <PrimarySearchAppBar/>
                <Navigation/>
                <Card id="CardMessage" elevation={0}>
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
                </Delayed>  
            </div>
        )
    }
}

export default Home
