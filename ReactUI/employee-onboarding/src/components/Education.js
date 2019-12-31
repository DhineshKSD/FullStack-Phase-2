import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import axios from 'axios'; 
import ButtonMat from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../Education.css';
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
}
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
alert("Education Detail's Saved Successfully"); 
  this.props.history.push('/Thanks');   
}  
else
{  
alert('Data not Saved');  
debugger;   
}  
})}
handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});  
}
render() {
        return (
            <div>
                <Card id="EducationCard" elevation={7}>
                <CardContent id="EduCard">
                    <p1 id="EduHeading">UnderGraduate Education</p1>
                <TextField type="text" required id="standard-required" label="Course" autoComplete="off" placeholder="Course" fullWidth margin="normal" name="Course" value={this.state.Course} onChange={this.handleChange}/>

                <TextField type="text" required id="standard-required" label="Institute"autoComplete="off" placeholder="Institute1" fullWidth margin="normal" name="Institute" value={this.state.Institute} onChange={this.handleChange}/>

                <TextField type="number" required id="standard-required" label="GradePoint"autoComplete="off" placeholder="GradePoint" fullWidth margin="normal" name="GradePoint" value={this.state.GradePoint} onChange={this.handleChange}/>

                <TextField id="date" label="From" type="date"  fullWidth margin="normal" name="From" value={this.state.From} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                <TextField id="date" label="To" type="date"  fullWidth margin="normal" name="To" value={this.state.To} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                <TextField type="number" required id="standard-required" label="YearOfPassing"autoComplete="off" placeholder="YearOfPassing" fullWidth margin="normal" name="YearOfPassing" value={this.state.YearOfPassing} onChange={this.handleChange}/> 
            
                <ButtonMat id="Educationsubmit"type="button" onClick={this.AddEducation} disabled={this.state.isButtonDisabled} variant="contained" color="primary">
                    Submit
                </ButtonMat> 
                </CardContent>
                </Card>
            </div>
        )
    }
}

export default Education
