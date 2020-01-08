import React from 'react';   
import { Container, Col, Form, FormGroup } from 'reactstrap';  
import axios from 'axios'  
import '../AddEmployee.css'; 
import ButtonMat from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';  
import TextField from '@material-ui/core/TextField';
import '../EditEmployee.css';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import CardContent from '@material-ui/core/CardContent';
import PrimarySearchAppBar from '../components/Header';

const Department = [
    {
      value: 'IT',
      name: 'Information Technology',
    },
    {
      value: 'HR',
      name: 'Human Resource',
    },
    {
      value: 'BT',
      name: 'Business Technology',
    },
    {
      value: 'BD',
      name: 'Business Development',
    },
    {
      value: 'QA',
      name: 'Quality Assurance',
    },
    {
      value: 'TAC',
      name: 'Technology Advisory Council',
    },
  ];

class Edit extends React.Component {  
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
        this.MailStatus = this.onChangeMailStatus.bind(this);
        this.Salt=this.onChangeSalt.bind(this);
        this.HashedPassword=this.onChangeHashedPassword.bind(this);
        this.SubmissionStatus=this.onChangeSubmissionStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);  
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
          Salt:' ',
          HashedPassword:' ',
          SubmissionStatus:'',
        }  
}  
componentDidMount() {  
    axios.get('https://localhost:44319/api/GetEmployee/'+this.props.match.params.id)  
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
          console.log(response.data.DOJ);
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
onChangeMailStatus(e){
this.setState({  
  MailStatus: e.target.value  
}); 
}
onChangeSalt(e) {  
    this.setState({  
        Salt: e.target.value  
    }); 
}  
onChangeHashedPassword(e){
  this.setState({  
    HashedPassword: e.target.value  
}); 
}
onChangeSubmissionStatus(e){
  this.setState({  
    SubmissionStatus: e.target.value  
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
        ReportingTo:this.state.ReportingTo,
        MailStatus:this.state.MailStatus,
        isAdmin: "false",
        Salt:this.state.Salt,
        HashedPassword:this.state.HashedPassword,
        SubmissionStatus:this.state.SubmissionStatus,
    }; 
    console.log(obj); 
    axios.put('https://localhost:44319/api/PutEmployee/'+this.props.match.params.id, obj)  
        .then(res => console.log(res.data));  
        debugger;  
        window.location.href='/Employeelist';  
    }  
    render() {  
        return (
          <div>
            <PrimarySearchAppBar/> 
            <Container className="EmployeeEditCard">  
                  <Card elevation={3} id="EmployeeEdit">
                      <CardContent>
                      <h4 className="EmployeeEditPageHeading">Update Employee Informations</h4>  
                          <Form className="form" onSubmit={this.onSubmit}>  
                              <div id="EditForm1">
                                    <Col>  
                                    <TextField type="text" required id="standard-required" label="FirstName" autoComplete="off" placeholder="FirstName" fullWidth margin="normal" name="FirstName" value={this.state.FirstName} onChange={this.onChangeFirstName} />

                                    <TextField type="text" required id="standard-required" label="LastName"autoComplete="off" placeholder="LastName" fullWidth margin="normal" name="LastName" value={this.state.LastName} onChange={this.onChangeLastName}/>

                                    <TextField type="email" required id="standard-required" label="PersonalEmail"autoComplete="off" placeholder="PersonalEmail" fullWidth margin="normal" name="PersonalEmail" value={this.state.PersonalEmail} onChange={this.onChangePersonalEmail}/>

                                    <TextField type="number" required id="standard-required" label="Contact"autoComplete="off" placeholder="Contact" fullWidth margin="normal" name="Contact" onInput={(e)=>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                                    value={this.state.Contact} onChange={this.onChangeContact}/>

                                    <TextField type="text" required id="standard-required" label="JobTitle"autoComplete="off" placeholder="JobTitle" fullWidth margin="normal" name="JobTitle" value={this.state.JobTitle} onChange={this.onChangeJobTitle}/>
                                    </Col>
                              </div>
                              <div id="EditForm2">
                              <Col>
                                  <TextField id="standard-required"
                                  select
                                  label="Department" fullWidth margin="normal"
                                  name="Department"
                                  value={this.state.Department} onChange={this.onChangeDepartment}
                                  >
                                  {Department.map(option => (
                                  <MenuItem key={option.value} value={option.value}>
                                      {option.name}
                                  </MenuItem>
                                  ))}
                                  </TextField>

                                  <TextField id="date"label="Joining Date" type="text" fullWidth margin="normal"name="DOJ" value={this.state.DOJ.split('T')[0]} onChange={this.onChangeDOJ} InputLabelProps={{shrink: true, }}/>
                                  
                                  <TextField type="text" required id="standard-required" label="UserName" autoComplete="off" placeholder="UserName" InputProps={{ readOnly: true, }} fullWidth margin="normal" name="UserName" value={this.state.UserName} onChange={this.onChangeUserName}/>

                                  <TextField type="Password" required id="standard-required" label="Password" autoComplete="off" placeholder="Password" InputProps={{ readOnly: true, }} fullWidth margin="normal" name="Password" value={this.state.Password} onChange={this.onChangePassword}/>

                                  <TextField type="text" required id="standard-required" label="ReportingTo" autoComplete="off" placeholder="ReportingTo" fullWidth margin="normal" name="ReportingTo" value={this.state.ReportingTo} onChange={this.onChangeReportingTo}/>
                              </Col>
                            </div>
                            <Col>  
                                <FormGroup id="button" row>  
                                    <Col sm={5}>  
                                    </Col>  
                                    <Col sm={1} id="EditEmpButton">  
                                    <ButtonMat id="submit" type="submit" variant="contained" color="primary">
                                    Submit
                                    </ButtonMat> {' '}  
                                    </Col>   
                                    <Col sm={1} id="EditEmpButton">  
                                    <Link to={'/Employeelist'} style={{ textDecoration: 'none' }}><ButtonMat variant="contained" color="secondary">Cancel</ButtonMat>{' '}  </Link>
                                    </Col>  
                                    <Col sm={5}>  
                                    </Col>  
                                </FormGroup>  
                            </Col>  
                          </Form>  
                      </CardContent>
                  </Card>
            </Container>  
            </div> 
        );  
    }  
}  
export default Edit;