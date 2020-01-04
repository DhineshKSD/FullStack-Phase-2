import React, { Component } from 'react';  
import axios from 'axios';  
import { Link } from 'react-router-dom';  
import ButtonMat from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar';

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
        snackbaropen :false, snackbarmsg:'',
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
        }; 
        console.log(obj); 
        axios.put('https://localhost:44319/api/PutEmployee/'+this.props.obj.Employee_id, obj)  
        .then(res => console.log(res.data));  

        axios.get('https://localhost:44319/api/SendMail/'+this.props.obj.Employee_id)  
        .then(json => {  
          if(json.data.Status==='Success')
          {
          this.setState({snackbaropen:true , snackbarmsg : "Mail Sent Successfully"}) 
          window.location.href='/Employeelist'; 
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
    window.location.href='/Employeelist';
  })  
  }  
  render() {
    return (  
        <tr>  
          <td>  
           <Avatar style={{backgroundColor: '#3f51b5'}}>{this.props.obj.FirstName.charAt(0)}</Avatar>  
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
          <Link to={"/edit/"+this.props.obj.Employee_id} style={{ textDecoration: 'none' }}><ButtonMat elevation={3} variant="contained" color="Primary" startIcon={<EditIcon />}>Edit</ButtonMat></Link>  
          </td>  
          <td>  
          <ButtonMat elevation={3} type="button" onClick={this.DeleteStudent} variant="contained" color="secondary" startIcon={<DeleteIcon />}>Delete</ButtonMat>  
          </td>  
          <td>  
          <ButtonMat elevation={3} type="button" variant="contained" disabled={this.props.obj.MailStatus==="Initiated"} onClick={this.SendMail} style={{backgroundColor: '#1565c0',color: '#f3e5f5'}} startIcon={<SendIcon />}>{this.props.obj.MailStatus}</ButtonMat>
          <Snackbar 
            anchorOrigin={{vertical:'bottom',horizontal:'left'}}
            open = {this.state.snackbaropen}
            autoHideDuration = {500000}
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
          </td>
        </tr>  
    );  
  }  
}  
export default Table;