import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import axios from 'axios'; 
import ButtonMat from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../Education.css';
import PrimarySearchAppBar from '../components/Header'; 
import IconButton from '@material-ui/icons/Cancel';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from '@material-ui/core/MenuItem';
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

const CourseCode = [
    {
        value: 'PostGraduate',
        name: 'PostGraduate',
    },
    {
      value: 'UnderGraduate',
      name: 'UnderGraduate',
    },
    {
      value: 'HSC',
      name: 'HSC',
    },
    {
      value: 'SSLC',
      name: 'SSLC',
    },
  ];

export class Education extends Component {
constructor(props){  
super(props)  
this.state = {  
CourseCode:'',
Course:'',  
Institute:'',  
GradePoint:'',  
From:'',  
To:'',  
YearOfPassing:'', 
isButtonDisabled: false,
snackbaropen :false, snackbarmsg:'',
isAvailable:false,
FirstName:'',  
LastName:'',  
PersonalEmail:'',  
Contact:'',  
JobTitle:'',  
Department:'',  
Compensation:'450000',  
DOJ:'',
UserName:'',  
Password:'',  
ReportingTo:'',
MailStatus:'',
Salt:'',HashedPassword:'',
SubmissionStatus:'' ,
DateOfBirth:''
}; 
this.handleChange = this.handleChange.bind(this);   
}

snackbarClose = (e) =>{
    this.setState({snackbaropen:false});
}

componentDidMount() {  
    var userId = localStorage.getItem("User"); 
    axios.get('https://localhost:44319/api/GetEmployeeByUserId/'+userId)  
        .then(response => {  
            this.setState({   
              FirstName: response.data.FirstName,   
              LastName: response.data.LastName,  
              PersonalEmail: response.data.PersonalEmail,  
              Contact: response.data.Contact, 
              JobTitle: response.data.JobTitle,   
              Department: response.data.Department,  
              Compensation: response.data.Compensation,  
              DOJ: response.data.DOJ,
              UserName: response.data.UserName,   
              Password: response.data.Password,  
              ReportingTo: response.data.ReportingTo, 
              MailStatus:response.data.MailStatus,
              Salt:response.data.Salt,
              HashedPassword:response.data.HashedPassword, 
              SubmissionStatus:response.data.SubmissionStatus,
          });  
          console.log(response.data);
        })  
        .catch(function (error) {  
            console.log(error);  
        }) 
        axios.get('https://localhost:44319/api/GetPersonalInfo/'+userId)
            .then(response => {  
                this.setState({ 
                    DateOfBirth:response.data[0].DateOfBirth.split('T')[0]
                });
                console.log(this.state.DateOfBirth);
        })
        .catch(function (error) {  
            console.log(error);  
        }) 
}  

AddEducation=()=>{
var userId = localStorage.getItem("User");  
axios.post('https://localhost:44319/api/AddEducation1/'+userId, {
    Course:this.state.Course,  
    CourseCode:this.state.CourseCode,  
    Institute:this.state.Institute,  
    GradePoint:this.state.GradePoint, 
    From:this.state.From,
    To:this.state.To,  
    YearOfPassing:this.state.YearOfPassing,
    isButtonDisabled: true})  
.then(json => {  
if(json.data.Status==='Success')
{  
this.setState({snackbaropen:true , snackbarmsg : "Education Detail's Saved Successfully"}) 
//alert("Education Detail's Saved Successfully"); 
window.location.href='/Education';   
}  
else if(json.data.Status==='Coursecheck')
{  
this.setState({snackbaropen:true , snackbarmsg : "Education Detail's Already Exist"}) 
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

const obj = {  
    FirstName: this.state.FirstName,   
    LastName: this.state.LastName,  
    PersonalEmail: this.state.PersonalEmail,  
    Contact: this.state.Contact, 
    JobTitle: this.state.JobTitle,   
    Department: this.state.Department,  
    Compensation: this.state.Compensation,  
    DOJ: this.state.DOJ,
    UserName: this.state.UserName,   
    Password: this.state.Password,  
    ReportingTo: this.state.ReportingTo, 
    MailStatus:this.state.MailStatus,
    Salt:this.state.Salt,
    HashedPassword:this.state.HashedPassword, 
    SubmissionStatus : true,
}; 
console.log(obj); 
axios.put('https://localhost:44319/api/PutEmployeeByUserId/'+userId, obj)  
.then(res => console.log(res.data))
}

Next=()=>{
    window.location.href='/Employment';  
}

handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});
this.setState( {isAvailable: true });    
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
                     <Avatar id="Eduline1" style={{backgroundColor: '#e91e63',color: '#f3e5f5'}}>1</Avatar><div class="Eduhr-line"></div><Avatar id="Eduline2" style={{backgroundColor: '#969696',color: '#f3e5f5'}}>2</Avatar><div class="Eduhr-line1"></div><Avatar id="Eduline3" style={{backgroundColor: '#969696',color: '#f3e5f5'}}>3</Avatar>
                <Card id="EducationCard" elevation={10} style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
                        <CardContent id="EduCard">
                            <h6 id="EduHeading">Education Details</h6>
                            <div id="EduCard1">
                                <TextField id="standard-required" style={{textAlign: 'left'}}
                                    select
                                    label="Course Type" fullWidth margin="normal"
                                    name="CourseCode"
                                    value={this.state.CourseCode} onChange={this.handleChange}
                                    >
                                    {CourseCode.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>    
                                <TextField type="text" required id="standard-required" label="Course" autoComplete="off" placeholder="Course" fullWidth margin="normal" name="Course" value={this.state.Course} onChange={this.handleChange}/>

                                <TextField type="text" required id="standard-required" label="Institute"autoComplete="off" placeholder="Institute" fullWidth margin="normal" name="Institute" value={this.state.Institute} onChange={this.handleChange}/>

                                <TextField type="number" required id="standard-required" label="GradePoint"autoComplete="off" placeholder="GradePoint" fullWidth margin="normal" name="GradePoint" value={this.state.GradePoint} onChange={this.handleChange}/>
                            </div>
                            <div id="EduCard2">
                                <TextField id="date" label="From" type="date" inputProps={{min: this.state.DateOfBirth}} fullWidth margin="normal" name="From" value={this.state.From} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                                <TextField id="date" label="To" type="date" inputProps={{min: this.state.From}} fullWidth margin="normal" name="To" value={this.state.To} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                                <TextField type="number" required id="standard-required" label="Year.of.Passing" autoComplete="off" placeholder="Year.of.Passing" fullWidth margin="normal" name="YearOfPassing" value={this.state.YearOfPassing} onInput={(e)=>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)}} onChange={this.handleChange}/> 
                            </div>
                            <ButtonMat id="Educationsubmit"type="button" onClick={this.AddEducation} disabled={!this.state.CourseCode||!this.state.Course||!this.state.Institute||!this.state.From||!this.state.To||!this.state.YearOfPassing} variant="contained" color="primary">
                                Save
                            </ButtonMat>
                            <ButtonMat id="EducationFinish" type="button" disabled={!this.state.SubmissionStatus} onClick={this.Next} variant="contained" color="secondary">
                                Submit
                            </ButtonMat>  
                        </CardContent>
                </Card>
            </div>
        )
    }
}

export default Education
