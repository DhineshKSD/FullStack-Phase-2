import React, { Component } from 'react';
import LoginImage from '../Assets/3.png';
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
export class Login extends Component {
constructor(props){  
super(props)  
this.state = {  
UserName:'',  
Password:'', 
grant_type: 'Password',   
}  
} 
Login=()=>{  
axios.post('https://localhost:44319/token', this.state)  
.then(res =>  {localStorage.setItem('Token',res.data);
localStorage.setItem('User',this.state.UserName);
console.log(res);
if(this.state.UserName==="P100")
{
  this.props.history.push('/')   
}
else
{
  this.props.history.push('/PersonalInfo')   
}
})}  
handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});  
}    
componentDidMount() { 
localStorage.removeItem('Token');
localStorage.removeItem('User');
}
  render() {
    return (
      <div id="LoginCard">
                <Card id="LoginCard1" elevation={7}>
                <CardContent>
                <img src={LoginImage} className="LoginImage" alt="LoginImage" />
                </CardContent>
                </Card>
                <Card id="LoginCard2" elevation={7}>
                  <CardContent>
                      <div id="Avatar">
                      <img src={Avatar} className="Avatar" alt="Avatar" />
                      </div>
                      <header id = "Login">Login</header>
                      <div id="LoginContent">
                      <TextField type="text" required id="standard-required" label="UserName" autoComplete="off" placeholder="UserName" fullWidth margin="normal" name="UserName" value={this.state.UserName} onChange={this.handleChange}/>

                      <TextField type="password" required id="standard-required" label="Password"autoComplete="off" placeholder="Password" fullWidth margin="normal" name="Password" value={this.state.Password} onChange={this.handleChange}/>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Grid container id="ForgotPassword">
                        <Grid item xs>
                          <Link href="" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                      </Grid>
                      </div>
                      <ButtonMat id="SignIn" type="button" onClick={this.Login} variant="contained" color="primary">
                      Login
                      </ButtonMat>
                  </CardContent>
                </Card>
        </div>
    )
  }
}

export default Login
