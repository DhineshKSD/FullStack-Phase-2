import React from 'react';  
import axios from 'axios';  
import '../AddEmployee.css';  
import ButtonMat from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Container, Col, Form, FormGroup } from 'reactstrap';
import PrimarySearchAppBar from '../components/Header';  
import MenuItem from '@material-ui/core/MenuItem';
import '../PersonalInfo.css';
import IconButton from '@material-ui/icons/Cancel';
import Snackbar from '@material-ui/core/Snackbar';
import State1 from '../components/State';
import Avatar from '@material-ui/core/Avatar';
import DarkTheme, { createTheme } from 'react-dark-theme'

const lightTheme = {
  background: '#f7f8f7',
  text:'black'
}
 
const darkTheme = {
  background: '#a9aaa9',
  text: 'black',
}
const myTheme = createTheme(darkTheme, lightTheme)

var id = localStorage.getItem("User");
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
    value: 'Others',
    name: 'Others',
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
  {
    value: 'Divorced',
    name: 'Divorced',
  },
  {
    value: 'Widow',
    name: 'Widow',
  },
];
const BloodGroup = [
  {
    value: 'O+',
    name: 'O+',
  },
  {
    value: 'O-',
    name: 'O-',
  },
  {
    value: 'A+',
    name: 'A+',
  },
  {
    value: 'A-',
    name: 'A-',
  },
  {
    value: 'B+',
    name: 'B+',
  },
  {
    value: 'B-',
    name: 'B-',
  },
  {
    value: 'AB+',
    name: 'AB+',
  },
  {
    value: 'AB-',
    name: 'AB-',
  },
];
var tempDate = new Date();
var Year=(tempDate.getFullYear()-21);
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
  Country1:'India',    
  Address2:'',  
  City2:'',  
  State2:'',
  Country2:'India', 
  snackbaropen :false, snackbarmsg:'',
  isAvailable:false    
}; 
this.handleChange = this.handleChange.bind(this);   
} 

snackbarClose = (e) =>{
  this.setState({snackbaropen:false});
} 

componentDidMount() {  
  axios.get('https://localhost:44319/api/GetEmployeeById/'+id)  
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
  axios.post('https://localhost:44319/api/AddPersonalInfo/'+id, {
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
  this.setState({snackbaropen:true , snackbarmsg : "Personal Details Saved Successfully"}) 
  //alert("Personal Details Saved Successfully"); 
  window.location.href='/Education';      
} 
else if(json.data.Status==='PersonalInfoCheck')
{  
this.setState({snackbaropen:true , snackbarmsg : "Personalinfo Detail's Already Exist"}) 
//alert("Education Detail's Saved Successfully"); 
window.location.href='/Education';   
}  
else
{
  this.setState({snackbaropen:true , snackbarmsg : "Data not Saved"})   
//alert('Data not Saved');  
debugger;  
}  
})  
}  

handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});
this.setState( {isAvailable: true });    
} 

clearform = (e) =>{
  window.location.href="/PersonalInfo";
}
 
render() {  
return (  
  <div>
     <PrimarySearchAppBar/>
      <Snackbar 
        anchorOrigin={{vertical:'bottom',horizontal:'left'}}
        open = {this.state.snackbaropen}
        autoHideDuration = {100000}
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
        <Container className="PersonalInfoContainer">
        <Avatar id="line1" style={{backgroundColor: '#969696',color: '#f3e5f5'}}>1</Avatar><div class="hr-line"></div><Avatar id="line2" style={{backgroundColor: '#969696',color: '#f3e5f5'}}>2</Avatar><div class="hr-line1"></div><Avatar id="line3" style={{backgroundColor: '#969696',color: '#f3e5f5'}}>3</Avatar>
              <Form className="form" autoComplete="off"> 
                  <Card elevation={10} id="PersonalInfoCard" style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
                      <CardContent>  
                        <h3 className="PersonalInfoPageHeading">Personal Information Section</h3>  
                        <div id="FormPersonalInfo">
                            <Col>  
                                <TextField type="text" required id="standard-required" label="FirstName" autoComplete="off" placeholder="FirstName" fullWidth margin="normal" name="FirstName" InputProps={{ readOnly: true, }} value={this.state.FirstName}/>

                                <TextField type="text" required id="standard-required" label="LastName" autoComplete="off" placeholder="LastName" fullWidth margin="normal" name="LastName" InputProps={{ readOnly: true, }} value={this.state.LastName}/>

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
                                <TextField id="standard-required"
                                select
                                label="BloodGroup" fullWidth margin="normal"
                                name="BloodGroup"
                                value={this.state.BloodGroup} onChange={this.handleChange}
                                  helperText="Please select your BloodGroup"
                                >
                                {BloodGroup.map(option => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                                </TextField>   
                            </Col>
                          </div>
                          <div id="FormPersonalInfo1">
                                <Col> 
                                    <TextField type="text" required id="standard-required" label="Place.of.Birth" autoComplete="off" placeholder="Place of Birth" fullWidth margin="normal" name="PlaceOfBirth" value={this.state.PlaceOfBirth} onChange={this.handleChange}/>

                                    <TextField id="date" inputProps={{max: Year+"-12-31"}} label="Date.of.Birth" type="date" fullWidth margin="normal"name="DateOfBirth" value={this.state.DateOfBirth} onChange={this.handleChange}InputLabelProps={{shrink: true, }}/>

                              
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
                                    </TextField>
                                </Col>
                            </div>
                          </CardContent>
                  </Card>   
                  
                    
                  <Card elevation={10} id="AddressInfoCard" style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
                        <CardContent> 
                            <h3 className="AddressInfoPageHeading">Address Information Section</h3>  
                            <div id="FormAddressInfo">
                              <p id="PermanentAddress">Permanent Address</p>
                                  <Col>                   
                                  <TextField type="text" required id="standard-required" label="Permanent Address" autoComplete="off" placeholder="Permanent Address" fullWidth margin="normal" name="Address1" value={this.state.Address1} onChange={this.handleChange}/>
                                  <TextField type="text" required id="standard-required" label="City" autoComplete="off" placeholder="City" fullWidth margin="normal" name="City1" value={this.state.City1} onChange={this.handleChange}/> 
                                  <TextField id="standard-required"
                                  select
                                  label="State" fullWidth margin="normal"
                                  name="State1"
                                  value={this.state.State1} onChange={this.handleChange}
                                    helperText="Please select your State"
                                  >
                                  {State1.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                      {option.name}
                                    </MenuItem>
                                  ))}
                                  </TextField>
                                  <TextField type="text" InputProps={{ readOnly: true, }} required id="standard-required" label="Country" autoComplete="off" placeholder="Country" fullWidth margin="normal" name="Country1" value={this.state.Country1} onChange={this.handleChange}/>   
                                  </Col>
                            </div>
                            <div id="FormAddressInfo1">
                            <p id="PresentAddress">Present Address</p>
                                  <Col>                   
                                  <TextField type="text" required id="standard-required" label="Present Address" autoComplete="off" placeholder="Present Address" fullWidth margin="normal" name="Address2" value={this.state.Address2} onChange={this.handleChange}/>
                                  <TextField type="text" required id="standard-required" label="City" autoComplete="off" placeholder="City" fullWidth margin="normal" name="City2" value={this.state.City2} onChange={this.handleChange}/> 
                                  <TextField id="standard-required"
                                  select
                                  label="State" fullWidth margin="normal"
                                  name="State2"
                                  value={this.state.State2} onChange={this.handleChange}
                                    helperText="Please select your State"
                                  >
                                  {State1.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                      {option.name}
                                    </MenuItem>
                                  ))}
                                  </TextField>
                                  <TextField type="text" InputProps={{ readOnly: true, }} required id="standard-required" label="Country" autoComplete="off" placeholder="Country" fullWidth margin="normal" name="Country2" value={this.state.Country2} onChange={this.handleChange}/>   
                                  </Col>
                            </div>
                      </CardContent>
                </Card>
              
                <Col>  
                    <FormGroup row id="button">  
                      <Col sm={5} >  
                      </Col>  
                      <Col sm={1} id="PersonalButton">  
                      <ButtonMat id="submit"type="button" disabled={!this.state.Gender||!this.state.DateOfBirth||!this.state.PlaceOfBirth||!this.state.MaritalStatus||!this.state.BloodGroup||
                    !this.state.Address1||!this.state.City1||!this.state.State1||!this.state.Country1||!this.state.Address2||!this.state.City2||!this.state.State2||!this.state.Country2} 
                      onClick={this.AddPersonalInfo} variant="contained" color="primary">
                      Submit
                      </ButtonMat> 
                      </Col>  
                      <Col sm={1} id="PersonalButton">  
                      <ButtonMat variant="contained" color="secondary" onClick={this.clearform}>Cancel</ButtonMat>{' '}  
                      </Col>  
                      <Col sm={5}>  
                      </Col>  
                    </FormGroup>    
                 </Col> 
            </Form>
        </Container>
  </div>  
);  
}  
}  

export default PersonalInfo;