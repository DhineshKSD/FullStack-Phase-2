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
import { Container, Col, Form, FormGroup } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import DarkTheme, { createTheme } from 'react-dark-theme';
import Checkbox from '@material-ui/core/Checkbox';

const lightTheme = {
  background: '#c5cae965',
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
var tempDate = new Date();

export class Education extends Component {
constructor(props){  
super(props)  
this.state = {  
CourseCode:'SSLC',
Course:'',  
Institute:'',  
GradePoint:'',  
From:'',  
To:'',  
YearOfPassing:'123', 
CourseCode1:'HSC',
Course1:'',  
Institute1:'',  
GradePoint1:'',  
From1:'',  
To1:'',  
YearOfPassing1:'123', 
CourseCode2:'UnderGraduate',
Course2:'',  
Institute2:'',  
GradePoint2:'',  
From2:'',  
To2:'',  
YearOfPassing2:'123', 
CourseCode3:'PostGraduate',
Course3:'',  
Institute3:'',  
GradePoint3:'',  
From3:'',  
To3:'',  
YearOfPassing3:'123',
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
DateOfBirth:'',
check: false
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
    console.log(json.data.Status);
}  
})

axios.post('https://localhost:44319/api/AddEducation1/'+userId, {
    Course:this.state.Course2,  
    CourseCode:this.state.CourseCode2,  
    Institute:this.state.Institute2,  
    GradePoint:this.state.GradePoint2, 
    From:this.state.From2,
    To:this.state.To2,  
    YearOfPassing:this.state.YearOfPassing2,
    isButtonDisabled: true})  
.then(json => {  
if(json.data.Status==='Success')
{ 
    console.log(json.data.Status) 
}  
})

axios.post('https://localhost:44319/api/AddEducation1/'+userId, {
    Course:this.state.Course3,  
    CourseCode:this.state.CourseCode3,  
    Institute:this.state.Institute3,  
    GradePoint:this.state.GradePoint3, 
    From:this.state.From3,
    To:this.state.To3,  
    YearOfPassing:this.state.YearOfPassing3,
    isButtonDisabled: true})  
.then(json => {  
if(json.data.Status==='Success')
{ 
    console.log(json.data.Status) 
}  
})

axios.post('https://localhost:44319/api/AddEducation1/'+userId, {
    Course:this.state.Course1,  
    CourseCode:this.state.CourseCode1,  
    Institute:this.state.Institute1,  
    GradePoint:this.state.GradePoint1, 
    From:this.state.From1,
    To:this.state.To1,  
    YearOfPassing:this.state.YearOfPassing1,
    isButtonDisabled: true})  
.then(json => {  
if(json.data.Status==='Success')
{  
this.setState({snackbaropen:true , snackbarmsg : "Education Detail's Saved Successfully"}) 
window.setTimeout(function(){
window.location.href='/Employment'; 
},1500);  
}  
else if(json.data.Status==='Coursecheck')
{  
this.setState({snackbaropen:true , snackbarmsg : "Education Detail's Already Exist"}) 
window.setTimeout(function(){
window.location.href='/Education'; 
},1500);    
}  
else
{ 
this.setState({snackbaropen:true , snackbarmsg : "Data not Saved"})  
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
axios.put('https://localhost:44319/api/PutEmployeeByUserId/'+userId, obj)  
.then(res => console.log(res.data))
}

Next=()=>{
    window.setTimeout(function(){
    window.location.href='/Employment';  
    },1500); 
}

handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});
this.setState( {isAvailable: true });    
}

handleCheckClick = () => {
    this.setState({ checked: !this.state.checked });
    this.setState({ check: !this.state.check});
  }

render() {
    var temp = new Date(this.state.DateOfBirth);
    var year = temp.getFullYear()+15;
    var temp1 = new Date(this.state.From);
    var year1 = temp1.getFullYear()+1;
    var temp2 = new Date(this.state.From1);
    var year2 = temp2.getFullYear()+1;
    var temp3 = new Date(this.state.From2);
    var year3 = temp3.getFullYear()+1;
    var temp4 = new Date(this.state.From3);
    var year4 = temp4.getFullYear()+1;
    var temp5 = new Date(this.state.To);
    var year5 = temp5.getFullYear();
    var temp6 = new Date(this.state.To1);
    var year6 = temp6.getFullYear();
    var temp7 = new Date(this.state.To2);
    var year7 = temp7.getFullYear();
    var temp8 = new Date(this.state.To3);
    var year8 = temp8.getFullYear();
        return (
            <div id="outer" style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
                 <PrimarySearchAppBar/>
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
                    <Avatar id="Eduline1" style={{backgroundColor: '#e91e63',color: '#f3e5f5'}}>1</Avatar><div className="Eduhr-line"></div><Avatar id="Eduline2" style={{backgroundColor: '#e91e63',color: '#f3e5f5'}}>2</Avatar><div className="Eduhr-line1"></div><Avatar id="Eduline3" style={{backgroundColor: '#969696',color: '#f3e5f5'}}>3</Avatar>
                    <Container className="EduContainer">
                    <h6 id="EduHeading">Education Details</h6>
                    <Card id="EducationCard" elevation={10} >
                            <CardContent id="EduCard">
                                <div id="EduCard1">
                                    <TextField type="text" required id="standard-required" InputProps={{ readOnly: true, }} label="CourseType" autoComplete="off" placeholder="CourseType" fullWidth margin="normal" name="CourseCode" value={this.state.CourseCode} onChange={this.handleChange}/>    
                                    
                                    <TextField type="text" required id="standard-required" label="Course" autoComplete="off" placeholder="Course" fullWidth margin="normal" name="Course" value={this.state.Course} onChange={this.handleChange}/>

                                    <TextField type="text" required id="standard-required" label="Institute"autoComplete="off" placeholder="Institute" fullWidth margin="normal" name="Institute" value={this.state.Institute} onChange={this.handleChange}/>

                                    <TextField type="number" required id="standard-required" label="GradePoint"autoComplete="off" placeholder="GradePoint" fullWidth margin="normal" name="GradePoint" value={this.state.GradePoint} onChange={this.handleChange}/>
                                </div>
                                <div id="EduCard2">
                                    <TextField id="date" label="From" type="date" inputProps={{min: year+'-01-01'}} fullWidth margin="normal" name="From" value={this.state.From} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                                    <TextField id="date" label="To" type="date" inputProps={{min: year1+'-01-01'}} fullWidth margin="normal" name="To" value={this.state.To} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                                    <TextField type="number" InputProps={{ readOnly: true, }} required id="standard-required" label="Year.of.Passing" autoComplete="off" placeholder="Year.of.Passing" fullWidth margin="normal" name="YearOfPassing" value={year5} onInput={(e)=>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)}} onChange={this.handleChange}/> 
                                </div>  
                            </CardContent>
                    </Card>
                    <Card id="EducationCarda" elevation={10} >
                            <CardContent id="EduCarda">
                                
                                <div id="EduCardb">
                                    <TextField type="text" required id="standard-required" InputProps={{ readOnly: true, }} label="CourseType" autoComplete="off" placeholder="CourseType" fullWidth margin="normal" name="CourseCode1" value={this.state.CourseCode1} onChange={this.handleChange}/>   
                                    
                                    <TextField type="text" required id="standard-required" label="Course" autoComplete="off" placeholder="Course" fullWidth margin="normal" name="Course1" value={this.state.Course1} onChange={this.handleChange}/>

                                    <TextField type="text" required id="standard-required" label="Institute"autoComplete="off" placeholder="Institute" fullWidth margin="normal" name="Institute1" value={this.state.Institute1} onChange={this.handleChange}/>

                                    <TextField type="number" required id="standard-required" label="GradePoint"autoComplete="off" placeholder="GradePoint" fullWidth margin="normal" name="GradePoint1" value={this.state.GradePoint1} onChange={this.handleChange}/>
                                </div>
                                <div id="EduCardc">
                                    <TextField id="date" label="From" type="date" inputProps={{min: this.state.To}} fullWidth margin="normal" name="From1" value={this.state.From1} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                                    <TextField id="date" label="To" type="date" inputProps={{min: year2+'-01-01'}} fullWidth margin="normal" name="To1" value={this.state.To1} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                                    <TextField type="number" InputProps={{ readOnly: true, }} required id="standard-required" label="Year.of.Passing" autoComplete="off" placeholder="Year.of.Passing" fullWidth margin="normal" name="YearOfPassing1" value={year6} onInput={(e)=>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)}} onChange={this.handleChange}/> 
                                </div>
                            </CardContent>
                            </Card>
                            <Card id="EducationCardc" elevation={10} >
                            <CardContent id="EduCardd">
                                
                                <div id="EduCarde">
                                    <TextField type="text" required id="standard-required" InputProps={{ readOnly: true, }} label="CourseType" autoComplete="off" placeholder="CourseType" fullWidth margin="normal" name="CourseCode2" value={this.state.CourseCode2} onChange={this.handleChange}/>   
                                    <TextField type="text" required id="standard-required" label="Course" autoComplete="off" placeholder="Course" fullWidth margin="normal" name="Course2" value={this.state.Course2} onChange={this.handleChange}/>

                                    <TextField type="text" required id="standard-required" label="Institute"autoComplete="off" placeholder="Institute" fullWidth margin="normal" name="Institute2" value={this.state.Institute2} onChange={this.handleChange}/>

                                    <TextField type="number" required id="standard-required" label="GradePoint"autoComplete="off" placeholder="GradePoint" fullWidth margin="normal" name="GradePoint2" value={this.state.GradePoint2} onChange={this.handleChange}/>
                                </div>
                                <div id="EduCardf">
                                    <TextField id="date" label="From" type="date" inputProps={{min: this.state.To1}} fullWidth margin="normal" name="From2" value={this.state.From2} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                                    <TextField id="date" label="To" type="date" inputProps={{min: year3+'-01-01'}} fullWidth margin="normal" name="To2" value={this.state.To2} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                                    <TextField type="number" InputProps={{ readOnly: true, }} required id="standard-required" label="Year.of.Passing" autoComplete="off" placeholder="Year.of.Passing" fullWidth margin="normal" name="YearOfPassing2" value={year7} onInput={(e)=>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)}} onChange={this.handleChange}/> 
                                </div>  
                            </CardContent>
                            </Card>
                            <Card id="EducationCardd" elevation={10} >
                            <CardContent id="EduCardg">
                            <Checkbox
                                  checked={this.state.checked} onChange={this.handleCheckClick}
                                    inputProps={{ 'aria-label': 'primary checkbox' }} style={{ color: '#e91e63',position:'relative',top:'0.5em',left:'1.3em' }}
                                    />
                                  <p id="PGText">Click and start filling the details if you have done 'PostGraduate'</p>
                                <div id="EduCardh">
                                    <TextField type="text" disabled={this.state.check===false} required id="standard-required" InputProps={{ readOnly: true, }} label="CourseType" autoComplete="off" placeholder="CourseType" fullWidth margin="normal" name="CourseCode3" value={this.state.CourseCode3} onChange={this.handleChange}/>   
                                    <TextField type="text" disabled={this.state.check===false} required id="standard-required" label="Course" autoComplete="off" placeholder="Course" fullWidth margin="normal" name="Course3" value={this.state.Course3} onChange={this.handleChange}/>

                                    <TextField type="text" disabled={this.state.check===false} required id="standard-required" label="Institute"autoComplete="off" placeholder="Institute" fullWidth margin="normal" name="Institute3" value={this.state.Institute3} onChange={this.handleChange}/>

                                    <TextField type="number" disabled={this.state.check===false} required id="standard-required" label="GradePoint"autoComplete="off" placeholder="GradePoint" fullWidth margin="normal" name="GradePoint3" value={this.state.GradePoint3} onChange={this.handleChange}/>
                                </div>
                                <div id="EduCardi">
                                    <TextField id="date" disabled={this.state.check===false} label="From" type="date" inputProps={{min: this.state.To2}} fullWidth margin="normal" name="From3" value={this.state.From3} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                                    <TextField id="date" disabled={this.state.check===false} label="To" type="date" inputProps={{min: year4+'-01-01'}} fullWidth margin="normal" name="To3" value={this.state.To3} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                                    <TextField type="number" InputProps={{ readOnly: true, }} disabled={this.state.check===false} required id="standard-required" label="Year.of.Passing" autoComplete="off" placeholder="Year.of.Passing" fullWidth margin="normal" name="YearOfPassing3" value={year8} onInput={(e)=>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)}} onChange={this.handleChange}/> 
                                </div>
                                <ButtonMat id="Educationsubmit"type="button" onClick={this.AddEducation} disabled={this.state.check===false?!this.state.CourseCode||!this.state.Course||!this.state.Institute||!this.state.From||!this.state.To||
                                                                                                                   !this.state.CourseCode1||!this.state.Course1||!this.state.Institute1||!this.state.From1||!this.state.To1||
                                                                                                                   !this.state.CourseCode2||!this.state.Course2||!this.state.Institute2||!this.state.From2||!this.state.To2:
                                                                                                                   !this.state.CourseCode||!this.state.Course||!this.state.Institute||!this.state.From||!this.state.To||
                                                                                                                   !this.state.CourseCode1||!this.state.Course1||!this.state.Institute1||!this.state.From1||!this.state.To1||
                                                                                                                   !this.state.CourseCode2||!this.state.Course2||!this.state.Institute2||!this.state.From2||!this.state.To2||
                                                                                                                   !this.state.CourseCode3||!this.state.Course3||!this.state.Institute3||!this.state.From3||!this.state.To3} variant="contained" color="primary">
                                Submit
                                </ButtonMat>  
                            </CardContent>
                            </Card>
                            </Container>    
                    </div>
               
        )
    }
}

export default Education
