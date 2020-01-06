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
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar';

export class Login extends Component {
constructor(props){  
super(props)  
this.state = {  
UserName:'',  
Password:'', 
grant_type: 'Password',   
snackbaropen :false, snackbarmsg:'',
isAvailable:false
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
  window.location.href='/';  
}
else
{
  this.setState({snackbaropen:true , snackbarmsg : "Logging in"});
  window.location.href='/UserHome';  
}
}).catch(error => { 
  console.log(error);
  this.setState({snackbaropen:true , snackbarmsg : "Login Failed... Invalid Credential."});
  window.location.href='/Login';
})
}  

handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value}); 
this.setState( {isAvailable: true }); 
}  

componentDidMount() { 
localStorage.removeItem('Token');
localStorage.removeItem('User');
localStorage.removeItem('FirstName');
}

handleSubmit = event => {
  event.preventDefault();
  this.Login();
};

  render() {
    return (
      <div id="LoginCard">
          <Snackbar 
          anchorOrigin={{vertical:'bottom',horizontal:'left'}}
          open = {this.state.snackbaropen}
          autoHideDuration = {500000}
          onClose={this.snackbarClose}
          message = {<span id="message-id">{this.state.snackbarmsg}</span>}
          action ={[
            <IconButton 
            key="close"
            arial-label="close"
            color="secondary"
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

                        <TextField type="password" required id="standard-required" inputProps={{ maxLength: 9 }} label="Password"autoComplete="off" placeholder="Password" fullWidth margin="normal" name="Password" value={this.state.Password} onChange={this.handleChange}/>
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
