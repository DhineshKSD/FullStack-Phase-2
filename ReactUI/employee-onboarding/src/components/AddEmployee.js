import React from 'react';  
import axios from 'axios';  
import '../AddEmployee.css';  
import '../App.css';
import ButtonMat from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Employeelist from './EmployeeList';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { Container, Col, Form, row, FormGroup, Label, Input, Button } from 'reactstrap';  
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
  Compensation:'',  
  DOJ:'',
  UserName:'',  
  Password:'',  
  ReportingTo:''  
}  
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
  alert("New Hires Detail's Saved Successfully"); 
  console.log(json.data.Status);  
  this.props.history.push('/Employeelist')  
}  
else
{  
alert('Data not Saved');  
debugger;  
this.props.history.push('/Employeelist')  
}  
})  
}  
handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});  
} 

 
render() {  
return (  
   <Container className="EmployeeCardContainer">  
    
    <Paper elevation={3}>
    <Card id="EmployeeCard" >
      <CardContent> 
      <h3 className="PageHeading">Enter New-Hires Informations</h3> 
      <Form className="form" >  
        <div id="formemp">
          <Col>  
                <TextField type="text" required id="standard-required" label="FirstName" autoComplete="off" placeholder="FirstName" fullWidth margin="normal" name="FirstName" value={this.state.FirstName} onChange={this.handleChange}/>

                <TextField type="text" required id="standard-required" label="LastName"autoComplete="off" placeholder="LastName" fullWidth margin="normal" name="LastName" value={this.state.LastName} onChange={this.handleChange}/>

                <TextField type="email" required id="standard-required" label="PersonalEmail"autoComplete="off" placeholder="PersonalEmail" fullWidth margin="normal" name="PersonalEmail" value={this.state.PersonalEmail} onChange={this.handleChange}/>

                <TextField type="number" required id="standard-required" label="Contact"autoComplete="off" placeholder="Contact" fullWidth margin="normal" name="Contact" value={this.state.Contact} onChange={this.handleChange}/>

                <TextField type="text" required id="standard-required" label="JobTitle"autoComplete="off" placeholder="JobTitle" fullWidth margin="normal" name="JobTitle" value={this.state.JobTitle} onChange={this.handleChange}/>

                <TextField id="standard-required"
                select
                label="Department" fullWidth margin="normal"
                name="Department"
                value={this.state.Department} onChange={this.handleChange}
                  helperText="Please select your Department"
                >
                {Department.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
                 </TextField>
          </Col>
        </div>
        <div id="formemp1">
          <Col>
          <TextField type="number" required id="standard-required" label="Compensation" autoComplete="off" placeholder="Compensation" fullWidth margin="normal" name="Compensation" value={this.state.Compensation} onChange={this.handleChange}/>

          
          <TextField id="date"label="Joining Date" type="date"defaultValue="2017-05-24" fullWidth margin="normal"name="DOJ" value={this.state.DOJ} onChange={this.handleChange}InputLabelProps={{shrink: true, }}/>
          <TextField type="text" required id="standard-required" label="UserName" autoComplete="off" placeholder="UserName" fullWidth margin="normal" name="UserName" value={this.state.UserName} onChange={this.handleChange}/>

          <TextField type="text" required id="standard-required" label="Password" autoComplete="off" placeholder="Password" fullWidth margin="normal" name="Password" value={this.state.Password} onChange={this.handleChange}/>

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
          <ButtonMat variant="contained" color="secondary">Cancel</ButtonMat>{' '}  
          </Col>  
          <Col sm={5}>  
          </Col>  
        </FormGroup>    
      </Col>  
    </Form>
    </CardContent></Card>
    </Paper>
  </Container>  
);  
}  
}  

export default AddEmployee;