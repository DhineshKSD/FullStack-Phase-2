import React from 'react';  
import axios from 'axios';  
import '../AddEmployee.css';  
import '../App.css';
import '../Navigation.css';
import ButtonMat from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import PrimarySearchAppBar from '../components/Header';
import Navigation from '../components/Navigation';
import { Col, Form, FormGroup} from 'reactstrap';  
import IconButton from '@material-ui/icons/Cancel';
import Snackbar from '@material-ui/core/Snackbar';
import DarkTheme, { createTheme } from 'react-dark-theme';
import NavTab from '../NavTab'

const lightTheme = {
  background: '#c5cae965',
  text:'black'
}
 
const darkTheme = {
  background: '#a9aaa9',
  text: '#FFFFFF',
}

const myTheme = createTheme(darkTheme, lightTheme)

const Department = [
  {
    value: 'IT',
    name: 'Information Technology',
  },
  {
    value: 'HR',
    name: 'Human Resource',
  },
  {
    value: 'BT',
    name: 'Business Technology',
  },
  {
    value: 'BD',
    name: 'Business Development',
  },
  {
    value: 'QA',
    name: 'Quality Assurance',
  },
  {
    value: 'TAC',
    name: 'Technology Advisory Council',
  },
];

const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var tempDate = new Date();
var currentdate = tempDate.getFullYear() + '-' + ("0"+tempDate.getMonth()+1).slice(-2) + '-' + tempDate.getDate();
console.log(currentdate)
class AddEmployee extends React.Component{  
constructor(props){  
super(props)  
this.state = {  
  FirstName:'',  
  LastName:'',  
  PersonalEmail:'',  
  Contact:'',  
  JobTitle:'',  
  Department:'',  
  Compensation:'450000',  
  DOJ:'',
  UserName:'',  
  Password:("Psiog"+(((1+Math.random())*0x10000)|0).toString(16).substring(1)),  
  ReportingTo:'',
  MailStatus:'Initiate',
  snackbaropen :false, snackbarmsg:'',
  isAvailable:false,
  SubmissionStatus:false,  
}; 
this.handleChange = this.handleChange.bind(this); 
} 

snackbarClose = (e) =>{
  this.setState({snackbaropen:false});
}

AddEmployee=()=>{  
  axios.post('https://localhost:44319/api/signup/addEmployee', {
    FirstName:this.state.FirstName,
    LastName:this.state.LastName,  
    PersonalEmail:this.state.PersonalEmail, 
    Contact:this.state.Contact,
    JobTitle:this.state.JobTitle, 
    Department:this.state.Department,
    Compensation:this.state.Compensation,
    DOJ:this.state.DOJ, 
    UserName:this.state.UserName,
    Password:this.state.Password, 
    ReportingTo:this.state.ReportingTo,
    MailStatus:this.state.MailStatus,
    SubmissionStatus:this.state.SubmissionStatus})  
.then(json => {  
if(json.data.Status==='Success')
{
  this.setState({snackbaropen:true , snackbarmsg : "New Hires Detail's Saved Successfully"})  
  //alert("New Hires Detail's Saved Successfully"); 
  console.log(json.data.Status);  
  window.setTimeout(function(){
  window.location.href='/Employeelist'; 
  },1500);
}
else if(json.data.Status==='UserNameCheck')
{  
this.setState({snackbaropen:true , snackbarmsg : "Employee UserName Already Exist"})    
//alert('Data not Saved');  
debugger;  
//window.location.href='/Employeelist'; 
}  
else if(json.data.Status==='EmailCheck')
{  
this.setState({snackbaropen:true , snackbarmsg : "Employee Email Already Exist"})    
//alert('Data not Saved');  
debugger;  
//window.location.href='/Employeelist'; 
}  
else
{  
this.setState({snackbaropen:true , snackbarmsg : "Data not Saved"})    
//alert('Data not Saved');  
debugger;  
window.location.href='/Employeelist'; 
}
})  
}  

handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});
this.setState( {isAvailable: true });   
} 

handleSubmit=(e)=>{
  if (regexp.test(this.state.PersonalEmail)) 
  { 
    this.AddEmployee();
  }
  else
  {
    this.setState({snackbaropen:true , snackbarmsg : 'Enter a Valid Email Id'});
  }
}

clearform = (e) =>{
  window.location.href="/AddEmployee";
}
 
render() {  
return (  
  <div id="card" style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
      <Snackbar 
      anchorOrigin={{vertical:'bottom',horizontal:'right'}}
      open = {this.state.snackbaropen}
      autoHideDuration = {1500}
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
      <PrimarySearchAppBar/>
      <Navigation/>
      <Card id="EmployeeCard" elevation={7} >
              <CardContent elevation={7}> 
              <h3 className="PageHeading">Enter New-Hire's Details</h3> 
                    <Form className="form" required>  
                          <div id="formemp">
                            <Col>  
                                  <TextField type="text" required id="standard-required" label="FirstName" autoComplete="off" placeholder="FirstName" fullWidth margin="normal" name="FirstName" value={this.state.FirstName} onChange={this.handleChange}/>

                                  <TextField type="text" required id="standard-required" label="LastName"autoComplete="off" placeholder="LastName" fullWidth margin="normal" name="LastName" value={this.state.LastName} onChange={this.handleChange}/>

                                  <TextField type="email" required id="standard-required" label="PersonalEmail"autoComplete="off" placeholder="PersonalEmail" fullWidth margin="normal" name="PersonalEmail" value={this.state.PersonalEmail} onChange={this.handleChange}/>

                                  <TextField type="tel" required id="standard-required" onInput={(e)=>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}  
                                  label="Contact"autoComplete="off" placeholder="Contact" fullWidth margin="normal" name="Contact" value={this.state.Contact} onChange={this.handleChange}/>

                                  <TextField type="text" required id="standard-required" label="JobTitle"autoComplete="off" placeholder="JobTitle" fullWidth margin="normal" name="JobTitle" value={this.state.JobTitle} onChange={this.handleChange}/>    
                            </Col>
                          </div>

                          <div id="formemp1">
                            <Col>
                                  <TextField id="standard-required"
                                  select
                                  label="Department" fullWidth margin="normal"
                                  name="Department"
                                  value={this.state.Department} onChange={this.handleChange}
                                  >
                                  {Department.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                      {option.name}
                                    </MenuItem>
                                  ))}
                                  </TextField>
                            
                                  <TextField id="date" inputProps={{min: currentdate}} label="Joining Date" type="date" fullWidth margin="normal" name="DOJ" value={this.state.DOJ} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>
                                  
                                  <TextField type="text" required id="standard-required" label="UserName" autoComplete="off" placeholder="UserName" fullWidth margin="normal" name="UserName" inputProps={{ maxLength: 4 }} value={this.state.UserName} onChange={this.handleChange}/>

                                  <TextField type="Password" required id="standard-required" label="Password" autoComplete="off" placeholder="Password" fullWidth margin="normal" name="Password" InputProps={{ readOnly: true, }} value={this.state.Password} />

                                  <TextField type="text" required id="standard-required" label="ReportingTo" autoComplete="off" placeholder="ReportingTo" fullWidth margin="normal" name="ReportingTo" value={this.state.ReportingTo} onChange={this.handleChange}/>
                            </Col>
                          </div>
                          <Col>  
                              <FormGroup row id="button">  
                                <Col sm={5} >  
                                </Col>  
                                <Col sm={1} id="AddEmpButton1">  
                                <ButtonMat id="submit"type="button" disabled={!this.state.UserName||!this.state.Password||!this.state.PersonalEmail||!this.state.Contact||!this.state.JobTitle||
                                !this.state.Department||!this.state.DOJ||!this.state.UserName||!this.state.ReportingTo} onClick={this.handleSubmit} variant="contained" color="primary">
                                Submit
                                </ButtonMat> 
                                </Col>  
                                <Col sm={1} id="AddEmpButton2">  
                                <ButtonMat variant="contained" color="secondary" onClick={this.clearform}>Cancel</ButtonMat>{' '} 
                                </Col>  
                                <Col sm={5}>  
                                </Col>  
                              </FormGroup>    
                          </Col>  
                  </Form>
            </CardContent>
      </Card> 
  </div>
);  
}  
}  

export default AddEmployee;