import React, { Component } from 'react';
import PrimarySearchAppBar from '../components/Header'; 
import IconButton from '@material-ui/icons/Cancel';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'; 
import ButtonMat from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { BrowserRouter as Router} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import '../Employment.css';
import Avatar from '@material-ui/core/Avatar';

const ExperienceType=[
    {
        value: false,
        name: 'Fresher',
    },
    {
      value: true,
      name: 'Experienced',
    }];

export class Employment extends Component {
    constructor(props){  
        super(props)  
        this.state = {  
        ExperienceType:'',
        EmployerName:'',  
        StartDate:'',  
        EndDate:'',  
        Designation:'',  
        Compensation:'',  
        snackbaropen :false, snackbarmsg:'',
        isAvailable:false,
        }
    }
    snackbarClose = (e) =>{
        this.setState({snackbaropen:false});
    }

    handleChange= (e)=> {  
        this.setState({[e.target.name]:e.target.value});
        this.setState( {isAvailable: true });    
    }

    AddEmployment=()=>{
        var userId = localStorage.getItem("User");  
        axios.post('https://localhost:44319/api/AddPreviousEmployment/'+userId, {
            EmployerName:this.state.EmployerName,  
            StartDate:this.state.StartDate,  
            EndDate:this.state.EndDate,  
            Designation:this.state.Designation, 
            Compensation:this.state.Compensation,})  
        .then(json => {  
        if(json.data.Status==='Success')
        {  
        this.setState({snackbaropen:true , snackbarmsg : "Employee PreviousEmployments Details Successfully Saved"}) 
        //alert("Education Detail's Saved Successfully"); 
        window.location.href='/Employment';   
        }  
        else
        { 
        this.setState({snackbaropen:true , snackbarmsg : "Data not Saved"})  
        //alert('Data not Saved');  
        debugger;   
        }  
        })
    }

    Next=()=>{
        var id = localStorage.getItem('User');
        axios.get('https://localhost:44319/api/SubmissionMail/'+id)  
        .then(json => {  
          if(json.data.Status==='Success')
          {
          window.location.href='/Thanks';  
          }
        })  
        .catch(function (error) {  
          console.log(error);  
        })  
         
    }
    
    render() {
        return (
            <div>
                <Router><PrimarySearchAppBar/></Router>
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
                <Avatar id="Empline1" style={{backgroundColor: '#e91e63',color: '#f3e5f5'}}>1</Avatar><div class="Emphr-line"></div><Avatar id="Empline2" style={{backgroundColor: '#e91e63',color: '#f3e5f5'}}>2</Avatar><div class="Emphr-line1"></div><Avatar id="Empline3" style={{backgroundColor: '#969696',color: '#f3e5f5'}}>3</Avatar>
                <Card id="EmploymentCard" elevation={10}>
                        <CardContent id="EmpCard">
                            <h6 id="EmpHeading">Employment Details</h6>
                            <div id="EmpCard1">
                                <div id="EmpSection1">
                            <TextField id="standard-required" style={{textAlign: 'left'}}
                            select
                            label="Experience Type" fullWidth margin="normal"
                            name="ExperienceType"
                            value={this.state.CourseCode} onChange={this.handleChange}
                            >
                            {ExperienceType.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.name}
                                </MenuItem>
                            ))}
                            </TextField>    
                        
                            <TextField type="text" InputProps={!this.state.ExperienceType?{ readOnly: true, }:{ readOnly: false, }} required id="standard-required" label="EmployerName" autoComplete="off" placeholder="EmployerName" fullWidth margin="normal" name="EmployerName" value={this.state.EmployerName} onChange={this.handleChange}/>

                            <TextField type="text" InputProps={!this.state.ExperienceType?{ readOnly: true, }:{ readOnly: false, }} required id="standard-required" label="Designation"autoComplete="off" placeholder="Designation" fullWidth margin="normal" name="Designation" value={this.state.Designation} onChange={this.handleChange}/>
                            
                            </div>
                            <div id="EmpSection2">
                            <TextField id="date" InputProps={!this.state.ExperienceType?{ readOnly: true, }:{ readOnly: false, }} label="StartDate" type="date"  fullWidth margin="normal" name="StartDate" value={this.state.StartDate} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                            <TextField id="date" InputProps={!this.state.ExperienceType?{ readOnly: true, }:{ readOnly: false, }} label="EndDate" type="date"  fullWidth margin="normal" name="EndDate" value={this.state.EndDate} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                            <TextField type="number" InputProps={!this.state.ExperienceType?{ readOnly: true, }:{ readOnly: false, }} required id="standard-required" label="Compensation"autoComplete="off" placeholder="Compensation" fullWidth margin="normal" name="Compensation" value={this.state.Compensation} onChange={this.handleChange}/>
                            </div>
                            </div>
                            <ButtonMat id="Empsubmit"type="button" onClick={this.AddEmployment} disabled={this.state.ExperienceType===''} variant="contained" color="primary">
                                Save
                            </ButtonMat>
                            <ButtonMat id="EmpFinish" type="button" onClick={this.Next} variant="contained" color="secondary">
                                Submit
                            </ButtonMat>  
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Employment
