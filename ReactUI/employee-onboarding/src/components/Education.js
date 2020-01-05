import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import axios from 'axios'; 
import ButtonMat from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../Education.css';
import PrimarySearchAppBar from '../components/Header'; 
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar';
export class Education extends Component {
constructor(props){  
super(props)  
this.state = {  
Course:'',  
CourseCode:'UG',  
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
SubmissionStatus:'' 
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
window.location.href='/Thanks';   
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
                    color="secondary"
                    onClick={this.snackbarClose}>
                    </IconButton>
                    ]}
                    />
                <Card id="EducationCard" elevation={10}>
                <CardContent id="EduCard">
                    <p1 id="EduHeading">UnderGraduate Education</p1>
                <TextField type="text" required id="standard-required" label="Course" autoComplete="off" placeholder="Course" fullWidth margin="normal" name="Course" value={this.state.Course} onChange={this.handleChange}/>

                <TextField type="text" required id="standard-required" label="Institute"autoComplete="off" placeholder="Institute1" fullWidth margin="normal" name="Institute" value={this.state.Institute} onChange={this.handleChange}/>

                <TextField type="number" required id="standard-required" label="GradePoint"autoComplete="off" placeholder="GradePoint" fullWidth margin="normal" name="GradePoint" value={this.state.GradePoint} onChange={this.handleChange}/>

                <TextField id="date" label="From" type="date"  fullWidth margin="normal" name="From" value={this.state.From} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                <TextField id="date" label="To" type="date"  fullWidth margin="normal" name="To" value={this.state.To} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                <TextField type="number" required id="standard-required" label="YearOfPassing"autoComplete="off" placeholder="YearOfPassing" fullWidth margin="normal" name="YearOfPassing" value={this.state.YearOfPassing} onChange={this.handleChange}/> 
            
                <ButtonMat id="Educationsubmit"type="button" onClick={this.AddEducation} disabled={!this.state.Course||!this.state.Institute||!this.state.From||!this.state.To||!this.state.YearOfPassing} variant="contained" color="primary">
                    Submit
                </ButtonMat> 
                </CardContent>
                </Card>
            </div>
        )
    }
}

export default Education
