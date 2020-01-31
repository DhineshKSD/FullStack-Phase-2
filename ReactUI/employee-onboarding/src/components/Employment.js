import React, { Component } from 'react';
import PrimarySearchAppBar from '../components/Header'; 
import IconButton from '@material-ui/icons/Cancel';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'; 
import ButtonMat from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { BrowserRouter as Router,Link} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import '../Employment.css';
import Avatar from '@material-ui/core/Avatar';
import DarkTheme, { createTheme } from 'react-dark-theme';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const lightTheme = {
  background: '#c5cae965',
  text:'black'
}
 
const darkTheme = {
  background: '#a9aaa9',
  text: 'black',
}
const myTheme = createTheme(darkTheme, lightTheme)
var tempDate = new Date();
var Year=tempDate.getFullYear() + '-' + ("0"+tempDate.getMonth()+1).slice(-2)+'-'+tempDate.getDate();

const ExperienceType=[
    {
        value: 'Fresher',
        name: 'Fresher',
    },
    {
      value: 'Experienced',
      name: 'Experienced',
    }];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });

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
        setOpen: false
        }
    }

snackbarClose = (e) =>{
    this.setState({snackbaropen:false});
}

handleChange= (e)=> {  
    this.setState({[e.target.name]:e.target.value});
    this.setState( {isAvailable: true });    
}

handleClickOpen = (e) => {
    this.setState({setOpen:true});
};
    
handleClose = (e) => {
    this.setState({setOpen:false});
};

AddEmployment=()=>{
    var userId = localStorage.getItem("User");  
    if(this.state.ExperienceType==="Fresher")
    {
    axios.post('https://localhost:44319/api/AddPreviousEmployment/'+userId, {
        EmployerName:this.state.EmployerName,  
        StartDate:this.state.StartDate,  
        EndDate:this.state.EndDate,  
        Designation:this.state.Designation, 
        Compensation:this.state.Compensation,})  
    .then(json => {  
    if(json.data.Status==='Success')
    {  
    this.setState({snackbaropen:true , snackbarmsg : "Employment Details Successfully Saved"}) 
    //alert("Education Detail's Saved Successfully"); 
    this.Next();   
    }  
    else
    { 
    this.setState({snackbaropen:true , snackbarmsg : "Data not Saved"})  
    //alert('Data not Saved');  
    debugger;   
    }  
    })
    }
    else{
        axios.post('https://localhost:44319/api/AddPreviousEmployment/'+userId, {
            EmployerName:this.state.EmployerName,  
            StartDate:this.state.StartDate,  
            EndDate:this.state.EndDate,  
            Designation:this.state.Designation, 
            Compensation:this.state.Compensation,}) 
            .then(json => {  
                if(json.data.Status==='Success')
                {  
                this.setState({snackbaropen:true , snackbarmsg : "Employment Details Successfully Saved"}) 
                //alert("Education Detail's Saved Successfully"); 
                window.setTimeout(function(){
                window.location.href='/Employment'; 
                },1500);   
                }  
                else
                { 
                this.setState({snackbaropen:true , snackbarmsg : "Data not Saved"})  
                //alert('Data not Saved');  
                debugger;   
                }  
                })   
    }
}

Next=()=>{
    var id = localStorage.getItem('User');
    if(this.state.ExperienceType==="Fresher")
    {
        window.setTimeout(function(){
        window.location.href='/Thanks'; 
        },1000); 
    }
    else
    {
        axios.post('https://localhost:44319/api/AddPreviousEmployment/'+id, {
            EmployerName:this.state.EmployerName,  
            StartDate:this.state.StartDate,  
            EndDate:this.state.EndDate,  
            Designation:this.state.Designation, 
            Compensation:this.state.Compensation,}) 
            .then(json => {  
                if(json.data.Status==='Success')
                {  
                this.setState({snackbaropen:true , snackbarmsg : "Employment Details Successfully Saved"}) 
                window.setTimeout(function(){
                    window.location.href='/Thanks'; 
                    },1500);   
                //alert("Education Detail's Saved Successfully");    
                }  
                else
                { 
                this.setState({snackbaropen:true , snackbarmsg : "Data not Saved"})  
                //alert('Data not Saved');  
                debugger;   
                }  
                })   
    }       
}
    
render() {
    return (
        <div id='emp'style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
            <Router><PrimarySearchAppBar/></Router>
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
            <Dialog
                open={this.state.setOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">{"Please Read Me!"}</DialogTitle>
            <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <b>Note: </b><br/><br/>
                    1.) <b>Fresher's :</b><br/><br/>  - Click <b>'Submit'</b> button to complete this section. <br/>  
                    <br/>
                    2.) <b>Experienced :</b><br/><br/>  - Click <b>'Submit'</b> button to save your employment details and proceed with filling another employment details(In case of Multiple Work Experience).<br/><br/>
                              - Click <b>'Finish'</b> button to save save your employment details and complete this section and .
                  </DialogContentText>
            </DialogContent>
            <DialogActions>
            </DialogActions>
            <ButtonMat variant="contained" color="primary" onClick={this.AddEmployment} style= {{position:'relative',width:'15%',left:'32%',top:'1.6em'}}>Submit</ButtonMat>{' '}
            <ButtonMat variant="contained" color="secondary" disabled={this.state.ExperienceType==='Fresher'} onClick={this.Next} style= {{position:'relative',width:'15%',left:'48%',bottom:'1em'}}>Finish</ButtonMat>{' '}
            <br/><br/>
      </Dialog>
            <Avatar id="Empline1" style={{backgroundColor: '#e91e63',color: '#f3e5f5'}}>1</Avatar><div class="Emphr-line"></div><Avatar id="Empline2" style={{backgroundColor: '#e91e63',color: '#f3e5f5'}}>2</Avatar><div class="Emphr-line1"></div><Avatar id="Empline3" style={{backgroundColor: '#e91e63',color: '#f3e5f5'}}>3</Avatar>
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
                        
                            <TextField type="text" disabled={this.state.ExperienceType==='Fresher'} required id="standard-required" label="EmployerName" autoComplete="off" placeholder="EmployerName" fullWidth margin="normal" name="EmployerName" value={this.state.EmployerName} onChange={this.handleChange}/>

                            <TextField type="text" disabled={this.state.ExperienceType==='Fresher'} required id="standard-required" label="Designation"autoComplete="off" placeholder="Designation" fullWidth margin="normal" name="Designation" value={this.state.Designation} onChange={this.handleChange}/>
                            
                            </div>
                            <div id="EmpSection2">
                            <TextField id="date" disabled={this.state.ExperienceType==='Fresher'} label="StartDate" type="date" inputProps={{max: Year}} fullWidth margin="normal" name="StartDate" value={this.state.StartDate} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                            <TextField id="date" inputProps={{min: this.state.StartDate}} inputProps={{max: Year,min:this.state.StartDate}} disabled={this.state.ExperienceType==='Fresher'} label="EndDate" type="date"  fullWidth margin="normal" name="EndDate" value={this.state.EndDate} onChange={this.handleChange} InputLabelProps={{shrink: true, }}/>

                            <TextField type="number" disabled={this.state.ExperienceType==='Fresher'} required id="standard-required" label="Compensation" autoComplete="off" placeholder="Compensation" fullWidth margin="normal" name="Compensation" value={this.state.Compensation} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <ButtonMat id="Empsubmit"type="button" onClick={this.handleClickOpen} disabled={this.state.ExperienceType==='Fresher'?!this.state.ExperienceType:(!this.state.EmployerName||!this.state.Designation||!this.state.StartDate||!this.state.EndDate||!this.state.Compensation)} variant="contained" color="primary">
                            Save
                        </ButtonMat>
                </CardContent>
            </Card>
        </div>
    )
}
}

export default Employment
