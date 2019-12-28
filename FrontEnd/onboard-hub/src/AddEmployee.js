import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'; 

class AddEmployee extends React.Component{

    constructor(props){  
        super(props)  
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
        

        AddEmployee=()=>{  
            axios.post('https://localhost:44319/api/signup/addEmployee', {
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
              ReportingTo:this.state.ReportingTo})  
          .then(json => {  
          if(json.data.Status==='Success')
          {  
            alert("Data Save Successfully"); 
            console.log(json.data.Status);  
            this.props.history.push('/Employeelist')  
          }  
          else
          {  
          alert('Data not Saved');  
          debugger;  
          this.props.history.push('/Employeelist')  
          }  
          })  
    }  

    handleChange= (e)=> {  
        this.setState({[e.target.name]:e.target.value});  
        }
    render() {
        return(
            <div>
                <Typography variant="h4" style={style}>Add User</Typography>
                <form id ="formemp" style={formContainer} autoComplete="off">

                    <TextField type="text" placeholder="FirstName" fullWidth margin="normal" name="FirstName" value={this.state.FirstName} onChange={this.handleChange}/>

                    <TextField type="text" placeholder="LastName" fullWidth margin="normal" name="LastName" value={this.state.LastName} onChange={this.handleChange}/>

                    <TextField type="email" placeholder="PersonalEmail" fullWidth margin="normal" name="PersonalEmail" value={this.state.PersonalEmail} onChange={this.handleChange}/>

                    <TextField type="number" placeholder="Contact" fullWidth margin="normal" name="Contact" value={this.state.Contact} onChange={this.handleChange}/>

                    <TextField type="text" placeholder="JobTitle" fullWidth margin="normal" name="JobTitle" value={this.state.JobTitle} onChange={this.handleChange}/>

                    <TextField type="text" placeholder="Department" fullWidth margin="normal" name="Department" value={this.state.Department} onChange={this.handleChange}/>

                    <TextField type="number" placeholder="Compensation" fullWidth margin="normal" name="Compensation" value={this.state.Compensation} onChange={this.handleChange}/>

                    <TextField type="date" placeholder="Joining Date" fullWidth margin="normal" name="DOJ" value={this.state.DOJ} onChange={this.handleChange}/>

                    <TextField type="text" placeholder="UserName" fullWidth margin="normal" name="UserName" value={this.state.UserName} onChange={this.handleChange}/>

                    <TextField type="text" placeholder="Password" fullWidth margin="normal" name="Password" value={this.state.Password} onChange={this.handleChange}/>

                    <TextField type="text" placeholder="ReportingTo" fullWidth margin="normal" name="ReportingTo" value={this.state.ReportingTo} onChange={this.handleChange}/>


                    <Button variant="contained" color="primary" onClick={this.AddEmployee}>Save</Button>
            </form>
    </div>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default AddEmployee;