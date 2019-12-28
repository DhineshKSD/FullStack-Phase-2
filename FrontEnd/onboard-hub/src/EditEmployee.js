import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'; 

class EditEmployee extends Component {

    constructor(props) {  
        super(props)  
        this.onChangeFirstName = this.onChangeFirstName.bind(this);  
        this.onChangeLastName = this.onChangeLastName.bind(this);  
        this.onChangePersonalEmail = this.onChangePersonalEmail.bind(this);  
        this.onChangeContact= this.onChangeContact.bind(this);  
        this.onChangeJobTitle= this.onChangeJobTitle.bind(this);  
        this.onChangeDepartment = this.onChangeDepartment.bind(this);  
        this.onChangeCompensation = this.onChangeCompensation.bind(this);  
        this.onChangeDOJ = this.onChangeDOJ.bind(this);  
        this.onChangeUserName = this.onChangeUserName.bind(this);    
        this.onChangePassword = this.onChangePassword.bind(this);  
        this.onChangeReportingTo = this.onChangeReportingTo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);  
         this.state = {  
            FirstName:'',  
            LastName:'',  
            PersonalEmail:'',  
            Contact:'',  
            JobTitle:'',  
            Department:'',  
            Compensation:'',  
            DOJ:'',
            UserName:'',  
            Password:'',  
            ReportingTo:''  
        }  
    }  

    componentDidMount() {  
        axios.get('https://localhost:44319/api/GetEmployee?id='+this.props.match.params.id)  
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
              });  
            })  
            .catch(function (error) {  
                console.log(error);  
            })  
      }  
    onChangeFirstName(e) {  
      this.setState({  
          FirstName: e.target.value  
      });  
    }  
    onChangeLastName(e) {  
      this.setState({  
          LastName: e.target.value  
      });    
    }  
    onChangePersonalEmail(e) {  
      this.setState({  
          PersonalEmail: e.target.value  
      });  
  }  
      onChangeContact(e) {  
          this.setState({  
              Contact: e.target.value  
          });  
    }  
    onChangeJobTitle(e) {  
      this.setState({  
          JobTitle: e.target.value  
      });  
    }  
    onChangeDepartment(e) {  
      this.setState({  
          Department: e.target.value  
      });    
    }  
    onChangeCompensation(e) {  
      this.setState({  
          Compensation: e.target.value  
      });  
  }  
      onChangeDOJ(e) {  
          this.setState({  
              DOJ: e.target.value  
          });   
    } 
    onChangeUserName(e) {  
      this.setState({  
          UserName: e.target.value  
      });    
    }  
    onChangePassword(e) {  
      this.setState({  
          Password: e.target.value  
      });  
  }  
  onChangeReportingTo(e) {  
      this.setState({  
          ReportingTo: e.target.value  
      }); 
  }  
    onSubmit(e) {  
      debugger;  
      e.preventDefault();  
      const obj = {  
          Employee_id:this.props.match.params.id,  
          FirstName:this.state.FirstName,
          LastName:this.state.LastName,  
          PersonalEmail:this.state.PersonalEmail, 
          Contact:this.state.Contact,
          JobTitle:this.state.JobTitle, 
          Department:this.state.Department,
          Compensation:this.state.Compensation,
          DOJ:this.state.DOJ, 
          UserName:this.state.UserName,
          Password:this.state.Password, 
          ReportingTo:this.state.ReportingTo 
      };  
      axios.post('https://localhost:44319/api/signup/addEmployee', obj)  
          .then(res => console.log(res.data));  
          debugger;  
          this.props.history.push('/Employeelist')  
    }  
    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Edit Employee</Typography>
                <form id="formemp">

                <TextField type="text" placeholder="FirstName" fullWidth margin="normal" name="FirstName" value={this.state.FirstName} onChange={this.onChangeFirstName}/>

                <TextField type="text" placeholder="LastName" fullWidth margin="normal" name="LastName" value={this.state.LastName} onChange={this.onChangeLastName}/>

                <TextField type="email" placeholder="PersonalEmail" fullWidth margin="normal" name="PersonalEmail" value={this.state.PersonalEmail} onChange={this.onChangePersonalEmail}/>

                <TextField type="number" placeholder="Contact" fullWidth margin="normal" name="Contact" value={this.state.Contact} onChange={this.onChangeContact}/>

                <TextField type="text" placeholder="JobTitle" fullWidth margin="normal" name="JobTitle" value={this.state.JobTitle} onChange={this.onChangeJobTitle}/>

                <TextField type="text" placeholder="Department" fullWidth margin="normal" name="Department" value={this.state.Department} onChange={this.onChangeDepartment}/>

                <TextField type="number" placeholder="Compensation" fullWidth margin="normal" name="Compensation" value={this.state.Compensation} onChange={this.onChangeCompensation}/>

                <TextField type="date" placeholder="DOJ" fullWidth margin="normal" name="DOJ" value={this.state.DOJ} onChange={this.onChangeDOJ}/>

                <TextField type="text" placeholder="UserName" fullWidth margin="normal" name="UserName" value={this.state.UserName} onChange={this.onChangeUserName}/>

                <TextField type="text" placeholder="Password" fullWidth margin="normal" name="Password" value={this.state.Password} onChange={this.onChangePassword}/>

                <TextField type="text" placeholder="ReportingTo" fullWidth margin="normal" name="ReportingTo" value={this.state.ReportingTo} onChange={this.onChangeReportingTo}/>
                        
                
                <Button type="submit" variant="contained" color="primary">Submit</Button>{' '}  
                </form>
            </div>
        );
    }
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default EditEmployee;