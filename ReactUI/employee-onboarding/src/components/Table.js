import React, { Component } from 'react';  
import axios from 'axios';  
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';  
import ButtonMat from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/icons/Cancel';
import Snackbar from '@material-ui/core/Snackbar';
import Checkbox from '@material-ui/core/Checkbox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Fab from '@material-ui/core/Fab';
import ReactTooltip from 'react-tooltip';
import HelpIcon from '@material-ui/icons/Help';

var tempDate = new Date();
var date = tempDate.getFullYear() + '-' + ("0"+tempDate.getMonth()+1).slice(-2);
var date1 = tempDate.getDate()+7;
console.log(date+'-'+date1);
var dateCheck = date+'-'+date1;

class Table extends Component {  
  constructor(props) {  
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
        Password:'',  
        ReportingTo:'',
        MailStatus:'',
        snackbaropen :false, snackbarmsg:'',Salt:'',HashedPassword:'',
        SubmissionStatus:'',check: false
    }; 
    this.SendMail = this.SendMail.bind(this);   
    } 

snackbarClose = (e) =>{
  this.setState({snackbaropen:false});
} 
    
SendMail=(e)=>{
          const obj = {  
            Employee_id:this.props.obj.Employee_id,
            FirstName:this.props.obj.FirstName,
            LastName:this.props.obj.LastName,  
            PersonalEmail:this.props.obj.PersonalEmail, 
            Contact:this.props.obj.Contact,
            JobTitle:this.props.obj.JobTitle, 
            Department:this.props.obj.Department,
            Compensation:this.props.obj.Compensation,
            DOJ:this.props.obj.DOJ, 
            UserName:this.props.obj.UserName,
            Password:this.props.obj.Password, 
            ReportingTo:this.props.obj.ReportingTo,
            MailStatus:"Initiated",
            isAdmin: "false",
            Salt:this.props.obj.Salt,
            HashedPassword:this.props.obj.HashedPassword,
            SubmissionStatus:this.props.obj.SubmissionStatus,
        }; 
        console.log(obj); 
        axios.put('https://localhost:44319/api/PutEmployee/'+this.props.obj.Employee_id, obj)  
        .then(res => console.log(res.data));  

        axios.get('https://localhost:44319/api/SendMail/'+this.props.obj.Employee_id)  
        .then(json => {  
          if(json.data.Status==='Success')
          {
          this.setState({snackbaropen:true , snackbarmsg : "On-Boarding Mail Sent Successfully"}) 
          window.setTimeout(function(){
          window.location.href='/Employeelist'; 
          },1500);
          }
        })  
        .catch(function (error) {  
          console.log(error);  
        })   
}  

DeleteStudent= () =>{  
    axios.delete('https://localhost:44319/api/removeEmployee/'+this.props.obj.Employee_id)  
  .then(json => {  
    this.setState({snackbaropen:true , snackbarmsg : "Employee Record Deleted Successfully"})
    window.setTimeout(function(){ 
    window.location.href='/Employeelist';
    },1500);
  })  
} 
handleCheckClick = () => {
  this.setState({ checked: !this.state.checked });
  this.setState({ check: !this.state.check});
}

render() {
    return (
        <tr>  
          <td style={{ padding:'7px'}}>  
           <Avatar data-tip data-for='happyFace5' style={this.props.obj.DOJ.split('T')[0]===dateCheck ?{backgroundColor: '#388e3c',color: '#f3e5f5'}:{backgroundColor: '#3f51b5',color: '#f3e5f5'}}>{this.props.obj.FirstName.charAt(0)}</Avatar>  
           {
          this.state.check?
          <ReactTooltip id='happyFace5' type='dark' effect='solid'>
            <span> Note: Avatar Color Turns To Green When<br/> Current Date is 7 Days Before The NewHire<br/> Date.of.Joining</span>
          </ReactTooltip>:null
          }
          </td>
          <td style={{ paddingTop:'15px',paddingBottom:'6px'}}>  
            {this.props.obj.FirstName}  
          </td>  
          <td style={{ paddingTop:'15px',paddingBottom:'6px'}}>  
            {this.props.obj.DOJ.split('T')[0]}  
          </td>  
          <td style={{ paddingTop:'15px',paddingBottom:'6px'}}>  
            {this.props.obj.JobTitle}  
          </td>  
          <td style={{ paddingTop:'15px',paddingBottom:'6px'}}>  
            {this.props.obj.Department}  
          </td>
          <td style={{ paddingTop:'8px',paddingBottom:'6px'}}>
          <Checkbox
          checked={this.props.obj.SubmissionStatus===true}
          inputProps={{ 'aria-label': 'primary checkbox' }} data-tip data-for='happyFace4' style={{ color: '#4caf50' }}
          />
          {
            this.state.check?
          <ReactTooltip id='happyFace4' type='dark' effect='solid'>
            <span>Checkbox Will Be Checked When NewHire Submitted The Pre-Joining Form.</span>
          </ReactTooltip>:null
          }  
          </td>  
          <td style={{ padding:'8px'}}>  
          <Link to={"/edit/"+this.props.obj.Employee_id} style={{ textDecoration: 'none' }}><Fab size="small" elevation={3} variant="contained" data-tip data-for='happyFace' color="primary"><EditIcon fontSize="small" /></Fab></Link>  
          {
          this.state.check?
          <ReactTooltip id='happyFace' type='dark' effect='solid'>
            <span>Click Here To Edit The NewHire Details</span>
          </ReactTooltip>:null
          }
          </td>  
          <td style={{ padding:'8px'}}>  
          <Fab size="small" elevation={3} type="button" data-tip data-for='happyFace1' onClick={this.DeleteStudent} disabled={this.props.obj.MailStatus==="Initiated"} variant="contained" style={this.props.obj.MailStatus==="Initiated"?{backgroundColor: '#969696',color: '#f3e5f5'}:{backgroundColor: '#e91e63',color: '#f3e5f5'}}><DeleteIcon fontSize="small"/></Fab> 
          {
          this.state.check?
          <ReactTooltip id='happyFace1' type='dark' effect='solid'>
            <span>Click Here To Delete NewHire Details. <br/> Note: Details Can't Be Able To Delete When OnBoading Has Been Initiated</span>
          </ReactTooltip>:null
          }
          </td>  
          <td style={{ padding:'8px'}}>  
          <Fab size="small" elevation={3} type="button" variant="contained"  data-tip data-for='happyFace2' disabled={this.props.obj.MailStatus==="Initiated"} onClick={this.SendMail} style={this.props.obj.MailStatus==="Initiated"?{backgroundColor: '#969696',color: '#f3e5f5'}:{backgroundColor: '#3f51b5',color: '#f3e5f5'}}><SendIcon fontSize="small"/></Fab>
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
            {
            this.state.check?
            <ReactTooltip id='happyFace2' type='dark' effect='solid'>
            <span>Click Here To Initiate Onboarding For NewHire</span>
          </ReactTooltip>:null
          }
          </td>
          <td style={{ padding:'8px'}}>  
          <Link to={"/view/"+this.props.obj.Employee_id} data-tip data-for='happyFace3' style={{ textDecoration: 'none' }}><Fab size="small" elevation={3} type="button" variant="contained" style={this.props.obj.SubmissionStatus?{backgroundColor: '#e91e63',color: '#f3e5f5'}:{backgroundColor: '#969696',color: '#f3e5f5'}}><VisibilityIcon fontSize="small"/></Fab></Link>
          {
            this.state.check?
          <ReactTooltip id='happyFace3' type='dark' effect='solid'>
            <span>Click Here To View The Details Submitted By NewHire. <br/> Note: View Button Will Be Enabled Only When Employee Submits The Form.</span>
          </ReactTooltip>:null
          }
          </td>
          <Checkbox
         inputProps={{ 'aria-label': 'primary checkbox' }} size="small" checked={this.state.checked} onChange={this.handleCheckClick} style={{ position:'absolute',top:'4.9%',zIndex:'+2',left:'45em',color: '#3f51b5' }}
         /> 
        </tr>
           
    );  
  }  
}  
export default Table;