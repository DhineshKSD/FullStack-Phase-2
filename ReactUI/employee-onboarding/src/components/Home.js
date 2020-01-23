import React, { Component } from 'react'
import '../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Employee from '../Assets/EmployeeEntry.png';
import PrimarySearchAppBar from '../components/Header';
import '../Navigation.css';
import Navigation from '../components/Navigation';
import NavTab from '../NavTab'
import '../Home.css';
import axios from 'axios';
import ThanksAvatar from '../Assets/ThanksAvatar.png'; 
import Psiog from '../Assets/Psiog.jpg'; 
import WelcomeOnboard from '../Assets/WelcomeOnboard.jpg';
import decode from 'jwt-decode';
import Delayed from '../components/Delayed';
import Loader from 'react-loader-spinner';
import Carousel from 'react-bootstrap/Carousel';
import Onboarding from '../Assets/LoginImage.png'; 
import DarkTheme, { createTheme } from 'react-dark-theme';

const lightTheme = {
  background: '#c5cae965',
  text:'black'
}
 
const darkTheme = {
  background: '#a9aaa9',
  text: 'black',
}
const myTheme = createTheme(darkTheme, lightTheme)

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
    }, 1500);
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
    localStorage.removeItem('Token');
    localStorage.removeItem('User');
    localStorage.removeItem('FirstName');
    }
}z
    
render() {
    return ( 
        <div id="Homecard" style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
            <Loader 
                type="Circles"
                color="#e91e63"
                height={100}
                width={100}
                //timeout={3000} //3 secs
                visible = {this.state.spin}
                style={{position:'relative',height:'55vh',top:'15em',left:'45%',zIndex: '2'}}
            />
            <Delayed waitBeforeShow={1500}>
            <PrimarySearchAppBar/>
            <Navigation/>
                    <Card id="card1" elevation={10}>
                        <CardContent>
                        <Carousel>
                        <Carousel.Item>
                            <img
                            className="WelcomeOnboard"
                            src={Onboarding} 
                            alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="Employee-logo"
                            src={Employee}
                            alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="Psiog"
                            src={Psiog}
                            alt="Third slide"
                            />
                        </Carousel.Item>
                        </Carousel>
                        </CardContent>
                    </Card>

                    <Card id="card2" elevation={10}>
                        <CardContent>
                            <img src={ThanksAvatar} className="WelcomeAvatar" alt="WelcomeAvatar" />

                            <p id="WelcomeUser"> "Hello {localStorage.getItem('FirstName')}"</p>
                            <p id="Welcome">Welcome To Psiog's Employee On-Boarding Hub</p>
                        </CardContent>
                    </Card>
            
            </Delayed>  
        </div>
    )
    }
}

export default Home
