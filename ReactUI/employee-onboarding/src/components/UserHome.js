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
import Psiog from '../Assets/Psiog.jpg'; 
import WelcomeOnboard from '../Assets/WelcomeOnboard.jpg';
import Instruction from '../components/Instruction';
import decode from 'jwt-decode';
import Delayed from '../components/Delayed';
import Loader from 'react-loader-spinner';
import Carousel from 'react-bootstrap/Carousel';
import DarkTheme, { createTheme } from 'react-dark-theme';
import ReactTooltip from 'react-tooltip';

const lightTheme = {
  background: '#c5cae965',
  text:'black'
}
 
const darkTheme = {
  background: '#a9aaa9',
  text: 'black',
}
const myTheme = createTheme(darkTheme, lightTheme)

export class UserHome extends Component {
    constructor(props){  
        super(props)  
        this.state = {  
        FirstName:'' ,
        SubmissionStatus:true,
        DOJ:'',
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
                SubmissionStatus :response.data.SubmissionStatus,
                DOJ : response.data.DOJ,
                disp : localStorage.setItem('FirstName',response.data.FirstName)   
                }); 
            localStorage.setItem('FirstName',response.data.FirstName);
            localStorage.setItem('DOJ',response.data.DOJ.split('T')[0]);
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
    
    //localStorage.setItem('key',time)
    if(time){
    window.location.href='/Login';
    localStorage.removeItem('Token');
    localStorage.removeItem('User');
    localStorage.removeItem('FirstName');
    }
}
      
render() {
    return (
        <div id="UserHomecard" style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
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
            {
                this.state.SubmissionStatus?null:<div class="box1">
                <span></span>
                <span></span>
                <span></span>
                </div>
            }
            
            <Col sm={1} id="Instructions">  
            <ButtonMat color="secondary" data-tip data-for='happyFace' disabled={this.state.SubmissionStatus}><Instruction /><ReactTooltip id='happyFace' place="left" type='dark' effect='solid'>
            <span> Note: Click Here To Start Filling Your Pre-Joining Forms </span>
            </ReactTooltip></ButtonMat>
            </Col> 
            
                
                    <Card id="card3" elevation={10}>
                    <CardContent>
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="WelcomeOnboard"
                            src={WelcomeOnboard} 
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
            
                    <Card id="card4" elevation={10}>
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

export default UserHome
