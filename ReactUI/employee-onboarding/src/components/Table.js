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
        SubmissionStatus:'',
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
          },2000);
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
    },2000);
  })  
} 

render() {
    return (
        <tr>  
          <td>  
           <Avatar style={this.props.obj.DOJ.split('T')[0]===dateCheck ?{backgroundColor: '#388e3c',color: '#f3e5f5'}:{backgroundColor: '#3f51b5',color: '#f3e5f5'}}>{this.props.obj.FirstName.charAt(0)}</Avatar>  
          </td>
          <td>  
            {this.props.obj.FirstName}  
          </td>  
          <td>  
            {this.props.obj.DOJ.split('T')[0]}  
          </td>  
          <td>  
            {this.props.obj.JobTitle}  
          </td>  
          <td>  
            {this.props.obj.Department}  
          </td>
          <td>
          <Checkbox
          checked={this.props.obj.SubmissionStatus===true}
          inputProps={{ 'aria-label': 'primary checkbox' }} style={{ color: '#4caf50' }}
          />  
          </td>  
          <td>  
          <Link to={"/edit/"+this.props.obj.Employee_id} style={{ textDecoration: 'none' }}><ButtonMat elevation={3} variant="contained" color="primary" startIcon={<EditIcon />}>Edit</ButtonMat></Link>  
          </td>  
          <td>  
          <ButtonMat elevation={3} type="button" onClick={this.DeleteStudent} disabled={this.props.obj.MailStatus==="Initiated"} variant="contained" style={{backgroundColor: '#e91e63',color: '#f3e5f5'}} startIcon={<DeleteIcon />}>Delete</ButtonMat> 
          </td>  
          <td>  
          <ButtonMat elevation={3} type="button" variant="contained" disabled={this.props.obj.MailStatus==="Initiated"} onClick={this.SendMail} style={this.props.obj.MailStatus==="Initiated"?{backgroundColor: '#3f51b5',color: '#f3e5f5'}:{backgroundColor: '#969696',color: '#f3e5f5'}} startIcon={<SendIcon />}>{this.props.obj.MailStatus}</ButtonMat>
          <Snackbar 
            anchorOrigin={{vertical:'bottom',horizontal:'right'}}
            open = {this.state.snackbaropen}
            autoHideDuration = {2000}
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
          </td>
          <td>  
          <Link to={"/view/"+this.props.obj.Employee_id} style={{ textDecoration: 'none' }}><ButtonMat elevation={3} type="button" variant="contained" style={this.props.obj.SubmissionStatus?{backgroundColor: '#e91e63',color: '#f3e5f5'}:{backgroundColor: '#969696',color: '#f3e5f5'}} startIcon={<VisibilityIcon />}>View</ButtonMat></Link>
          </td> 
        </tr>  
    );  
  }  
}  
export default Table;