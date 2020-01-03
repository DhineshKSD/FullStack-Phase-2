import React from 'react';  
import axios from 'axios';  
import '../AddEmployee.css';  
import '../App.css';
import '../Navigation.css';
import ButtonMat from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Employeelist from './EmployeeList';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import PrimarySearchAppBar from '../components/Header';
import Navigation from '../components/Navigation';
import { Container, Col, Form, row, FormGroup, Label, Input, Button } from 'reactstrap';  
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar';

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
  snackbaropen :false, snackbarmsg:''  
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
    ReportingTo:this.state.ReportingTo})  
.then(json => {  
if(json.data.Status==='Success')
{
  this.setState({snackbaropen:true , snackbarmsg : "New Hires Detail's Saved Successfully"})  
  //alert("New Hires Detail's Saved Successfully"); 
  console.log(json.data.Status);  
  window.location.href='/Employeelist'; 
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
} 
clearform = (e) =>{
  window.location.href="/AddEmployee";
}
 
render() {  
return (  
  <div id="card">
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
     <PrimarySearchAppBar/>
     <Navigation/>

    <Card id="EmployeeCard" elevation={7}>
      <CardContent elevation={7}> 
      <h3 className="PageHeading">Enter New-Hires Details</h3> 
      <Form className="form" required>  
        <div id="formemp">
          <Col>  
                <TextField type="text" required id="standard-required" label="FirstName" autoComplete="off" placeholder="FirstName" fullWidth margin="normal" name="FirstName" value={this.state.FirstName} onChange={this.handleChange}/>

                <TextField type="text" required id="standard-required" label="LastName"autoComplete="off" placeholder="LastName" fullWidth margin="normal" name="LastName" value={this.state.LastName} onChange={this.handleChange}/>

                <TextField type="email" required id="standard-required" label="PersonalEmail"autoComplete="off" placeholder="PersonalEmail" fullWidth margin="normal" name="PersonalEmail" value={this.state.PersonalEmail} onChange={this.handleChange}/>

                <TextField type="number" required id="standard-required" onInput={(e)=>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}  
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
          
          <TextField id="date"label="Joining Date" type="date"defaultValue="2017-05-24" fullWidth margin="normal"name="DOJ" value={this.state.DOJ} onChange={this.handleChange}InputLabelProps={{shrink: true, }}/>
          
          <TextField type="text" required id="standard-required" label="UserName" autoComplete="off" placeholder="UserName" fullWidth margin="normal" name="UserName" inputProps={{ maxLength: 4 }} value={this.state.UserName} onChange={this.handleChange}/>

          <TextField type="text" required id="standard-required" label="Password" autoComplete="off" placeholder="Password" fullWidth margin="normal" name="Password" InputProps={{ readOnly: true, }} value={this.state.Password} />

          <TextField type="text" required id="standard-required" label="ReportingTo" autoComplete="off" placeholder="ReportingTo" fullWidth margin="normal" name="ReportingTo" value={this.state.ReportingTo} onChange={this.handleChange}/>
        </Col>
        </div>
        <Col>  
          <FormGroup row id="button">  
            <Col sm={5} >  
            </Col>  
            <Col sm={1} id="AddEmpButton">  
            <ButtonMat id="submit"type="button" onClick={this.AddEmployee} variant="contained" color="primary">
            Submit
            </ButtonMat> 
            </Col>  
            <Col sm={1} id="AddEmpButton">  
            <ButtonMat variant="contained" color="secondary" onClick={this.clearform}>Cancel</ButtonMat>{' '} 
            </Col>  
            <Col sm={5}>  
            </Col>  
          </FormGroup>    
        </Col>  
    </Form>
    </CardContent></Card> 
  </div>
);  
}  
}  

export default AddEmployee;