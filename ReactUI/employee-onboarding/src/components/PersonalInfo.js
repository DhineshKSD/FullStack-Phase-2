import React from 'react';  
import axios from 'axios';  
import '../AddEmployee.css';  
import ButtonMat from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Container, Col, Form, row, FormGroup, Label, Input, Button } from 'reactstrap';  
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import '../PersonalInfo.css'
const Gender = [
  {
    value: 'Male',
    name: 'Male',
  },
  {
    value: 'Female',
    name: 'Female',
  },
  {
    value: 'Transgender',
    name: 'Transgender',
  },
];
const MaritalStatus = [
  {
    value: 'Single',
    name: 'Single',
  },
  {
    value: 'Married',
    name: 'Married',
  },
];
class PersonalInfo extends React.Component{  
constructor(props){  
super(props)  
this.state = { 
  FirstName:'',
  LastName:'', 
  Gender:'',  
  DateOfBirth:'',  
  PlaceOfBirth:'',  
  MaritalStatus:'',  
  BloodGroup:'',  
  Address1:'',  
  City1:'',  
  State1:'',
  Country1:'',    
  Address2:'',  
  City2:'',  
  State2:'',
  Country2:'', 
}  
}  
componentDidMount() {  
  axios.get('https://localhost:44319/api/GetEmployee/'+this.props.match.params.id)  
      .then(response => {  
          this.setState({   
            FirstName: response.data.FirstName,   
            LastName: response.data.LastName,   
        });  
        console.log(response.data);
      })  
      .catch(function (error) {  
          console.log(error);  
      })  
}  
AddPersonalInfo=()=>{  
  axios.post('https://localhost:44319/api/signup/addEmployee', {
    Gender:this.state.Gender,
    DateOfBirth:this.state.DateOfBirth,  
    PlaceOfBirth:this.state.PlaceOfBirth, 
    MaritalStatus:this.state.MaritalStatus,
    BloodGroup:this.state.BloodGroup, 
    Address1:this.state.Address1,
    City1:this.state.City1,
    State1:this.state.State1, 
    Country1:this.state.Country1,
    Address2:this.state.Address2, 
    City2:this.state.City2,
    State2:this.state.State2, 
    Country2:this.state.Country2, 
  })  
.then(json => {  
if(json.data.Status==='Success')
{  
  alert("Data Save Successfully"); 
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
   <Container className="PersonalInfoContainer"> 
                <Form className="form" > 
                
                <Card elevation={3} id="PersonalInfoCard">
                    <CardContent>  
                    <h3 className="PersonalInfoPageHeading">Personal Information Section</h3>  
                  <div id="FormPersonalInfo">
                  <Col>  
                        <TextField type="text" required id="standard-required" label="FirstName" autoComplete="off" placeholder="FirstName" fullWidth margin="normal" name="FirstName" value={this.state.FirstName} onChange={this.handleChange}/>

                        <TextField type="text" required id="standard-required" label="LastName" autoComplete="off" placeholder="LastName" fullWidth margin="normal" name="LastName" value={this.state.LastName} onChange={this.handleChange}/>

                        <TextField id="standard-required"
                        select
                        label="Gender" fullWidth margin="normal"
                        name="Gender"
                        value={this.state.Gender} onChange={this.handleChange}
                          helperText="Please select your Gender"
                        >
                        {Gender.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.name}
                          </MenuItem>
                        ))}
                        </TextField>
                        <TextField id="text"label="Blood Group" type="text"fullWidth margin="normal"name="BloodGroup" value={this.state.BloodGroup} onChange={this.handleChange}/>
                  </Col>
                  </div>
                  <div id="FormPersonalInfo1">
                        <Col> 
                        <TextField type="text" required id="standard-required" label="Place.of.Birth" autoComplete="off" placeholder="Place of Birth" fullWidth margin="normal" name="PlaceOfBirth" value={this.state.PlaceOfBirth} onChange={this.handleChange}/>

                        <TextField id="date" label="Date.of.Birth" type="date" fullWidth margin="normal"name="DateOfBirth" value={this.state.DateOfBirth} onChange={this.handleChange}InputLabelProps={{shrink: true, }}/>

                  
                        <TextField id="standard-required"
                        select
                        label="Marital Status" fullWidth margin="normal"
                        name="MaritalStatus"
                        value={this.state.MaritalStatus} onChange={this.handleChange}
                          helperText="Please select your Marital Status"
                        >
                        {MaritalStatus.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.name}
                          </MenuItem>
                        ))}
                        </TextField></Col></div>
                        </CardContent>
                </Card>   
                 
                   
                <Card elevation={3} id="AddressInfoCard">
                      <CardContent> 
                      <h3 className="AddressInfoPageHeading">Address Information Section</h3>  
                       <div id="FormAddressInfo">
                         <p id="PermanentAddress">Permanent Address</p>
                            <Col>                   
                            <TextField type="text" required id="standard-required" label="Permanent Address" autoComplete="off" placeholder="Permanent Address" fullWidth margin="normal" name="Address1" value={this.state.Address1} onChange={this.handleChange}/>
                            <TextField type="text" required id="standard-required" label="City" autoComplete="off" placeholder="City" fullWidth margin="normal" name="City1" value={this.state.City1} onChange={this.handleChange}/> 
                            <TextField type="text" required id="standard-required" label="State" autoComplete="off" placeholder="State" fullWidth margin="normal" name="State1" value={this.state.State1} onChange={this.handleChange}/>
                            <TextField type="text" required id="standard-required" label="Country" autoComplete="off" placeholder="Country" fullWidth margin="normal" name="Country1" value={this.state.Country1} onChange={this.handleChange}/>   
                            </Col>
                      </div>
                      <div id="FormAddressInfo1">
                      <p id="PresentAddress">Present Address</p>
                            <Col>                   
                            <TextField type="text" required id="standard-required" label="Present Address" autoComplete="off" placeholder="Present Address" fullWidth margin="normal" name="Address2" value={this.state.Address2} onChange={this.handleChange}/>
                            <TextField type="text" required id="standard-required" label="City" autoComplete="off" placeholder="City" fullWidth margin="normal" name="City2" value={this.state.City2} onChange={this.handleChange}/> 
                            <TextField type="text" required id="standard-required" label="State" autoComplete="off" placeholder="State" fullWidth margin="normal" name="State2" value={this.state.State2} onChange={this.handleChange}/>
                            <TextField type="text" required id="standard-required" label="Country" autoComplete="off" placeholder="Country" fullWidth margin="normal" name="Country2" value={this.state.Country2} onChange={this.handleChange}/>   
                             </Col>
                      </div>
                     </CardContent>
              </Card>
            
              <Col>  
              <FormGroup row id="button">  
                <Col sm={5} >  
                </Col>  
                <Col sm={1} id="PersonalButton">  
                <ButtonMat id="submit"type="button" onClick={this.AddPersonalInfo} variant="contained" color="primary">
                Submit
                </ButtonMat> 
                </Col>  
                <Col sm={1} id="PersonalButton">  
                <ButtonMat variant="contained" color="secondary">Cancel</ButtonMat>{' '}  
                </Col>  
                <Col sm={5}>  
                </Col>  
              </FormGroup>    
          </Col> 
          </Form>
  </Container>  
);  
}  
}  
const formContainer = {
  display: 'flex',
  flexFlow: 'row wrap'
};

const style ={
  display: 'flex',
  justifyContent: 'center'
}
export default PersonalInfo;