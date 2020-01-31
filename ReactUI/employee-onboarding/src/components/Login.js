import React, { Component } from 'react';
import LoginImage from '../Assets/LoginFormSide.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../Login.css';
import ButtonMat from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '../Assets/Avatar.png';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import AppRouter from '../AppRouter' 
import axios from 'axios'; 
import SnackBar from "@material-ui/core/Snackbar";
import IconButton from '@material-ui/icons/Cancel';
import Snackbar from '@material-ui/core/Snackbar';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Fab from '@material-ui/core/Fab';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export class Login extends Component {
constructor(props){  
super(props)  
this.state = {  
UserName:'',  
Password:'', 
grant_type: 'Password',   
snackbaropen :false, snackbarmsg:'',
isAvailable:false,isPasswordShown:true
} ;
this.handleChange = this.handleChange.bind(this);
}

snackbarClose = (e) =>{
  this.setState({snackbaropen:false});
}

Login=()=>{  
axios.post('https://localhost:44319/token', this.state)  
.then(res =>  {
localStorage.setItem('Token',res.data);
localStorage.setItem('User',this.state.UserName);
if(this.state.UserName==="P100")
{
  //alert("Logging In");
  this.setState({snackbaropen:true , snackbarmsg : "Logging in"});
  window.setTimeout(function(){
  window.location.href='/';
  },1000);  
}
else
{
  this.setState({snackbaropen:true , snackbarmsg : "Logging in"});
  window.setTimeout(function(){
  window.location.href='/UserHome';  
  },1000);  
}
}).catch(error => { 
  console.log(error);
  this.setState({snackbaropen:true , snackbarmsg : "Login Failed... Invalid Credential."});
  window.setTimeout(function(){
  window.location.href='/Login';
  },1000);
})
}  

handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value}); 
this.setState( {isAvailable: true }); 
}  

passwordhandleChange= (e)=> {  
  const {isPasswordShown}=this.state;
  this.setState( {isPasswordShown: !isPasswordShown }); 
} 

componentDidMount() { 
  if (localStorage.getItem("Token")) 
  {
    return (window.location.href='/');  
}
}

handleSubmit = event => {
  if (this.state.Password.length < 5) 
  { 
    event.preventDefault();
    this.setState({snackbaropen:true , snackbarmsg : 'Password length should be more than 5 letters'});
  }
  else
    {
    event.preventDefault();
    this.Login();
    }
};

  render() {
    const {isPasswordShown}=this.state;
    return (
      <div id="LoginCard">
          <Snackbar 
          anchorOrigin={{vertical:'bottom',horizontal:'right'}}
          open = {this.state.snackbaropen}
          autoHideDuration = {1000}
          onClose={this.snackbarClose}
          message = {<span id="message-id">{this.state.snackbarmsg}</span>}
          action ={[
            <IconButton 
            key="close"
            arial-label="close"
            color="#FFFFFF"
            onClick={this.snackbarClose}>
            </IconButton>
          ]}
          />
        <Card id="LoginCard1" elevation={10}>
            <CardContent>
            <img src={LoginImage} className="LoginImage" alt="LoginImage" />
            </CardContent>
        </Card>
        
        <Card id="LoginCard2" elevation={10}>
          <CardContent>
              <div id="Avatar">
              <img src={Avatar} className="Avatar" alt="Avatar" />
              </div>
              <header id = "Login">Login</header>
              <form onSubmit={this.handleSubmit}>
                    <div id="LoginContent">
                        <TextField type="text" required id="standard-required" inputProps={{ maxLength: 4 }} label="UserName" autoComplete="off" placeholder="UserName" fullWidth margin="normal" name="UserName" value={this.state.UserName} onChange={this.handleChange}/>

                        <TextField type={(isPasswordShown)?"password":"text"} required id="standard-required" inputProps={{ maxLength: 9 }} label="Password"autoComplete="off" placeholder="Password" fullWidth margin="normal" name="Password" value={this.state.Password} onChange={this.handleChange}/>
                         <ButtonMat id="eye" size="small" onClick={this.passwordhandleChange} variant="extended">{this.state.isPasswordShown?<VisibilityOffIcon/>:<VisibilityIcon/>}</ButtonMat>
                        <ButtonMat id="SignIn" type="submit" variant="contained" color="primary">
                        Login
                        </ButtonMat>
                    </div>
              </form>
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Remember me" id="Remember"
              />
              <Grid container id="ForgotPassword">
                <Grid item xs>
                  <Link href="" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
          </CardContent>
        </Card>
        <Grid container id="Copyrights">
                <p>Copyrights © 2020 All Rights Reserved On-Board Hub.</p>
        </Grid>
        </div>
    )
  }
}

export default Login
