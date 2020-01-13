import React from 'react';   
import { Container, Col, Form, FormGroup } from 'reactstrap';  
import axios from 'axios'  
import '../AddEmployee.css'; 
import ButtonMat from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';  
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import '../EditEmployee.css';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import CardContent from '@material-ui/core/CardContent';
import PrimarySearchAppBar from '../components/Header';
import '../View.css';
import DarkTheme, { createTheme } from 'react-dark-theme'

const lightTheme = {
  background: '#f7f8f7',
  text:'black'
}
 
const darkTheme = {
  background: '#a9aaa9',
  text: 'black',
}

const myTheme = createTheme(darkTheme, lightTheme)


class View extends React.Component {  
    constructor(props) {  
        super(props)  
        this.state = {  
          FirstName:'',  
          LastName:'',  
          PersonalEmail:'',  
          Contact:'',  
          JobTitle:'',  
          Department:'',    
          DOJ:'',
          UserName:'',  
          ReportingTo:'',
          Gender:'',
          DateOfBirth:'',
          PlaceOfBirth:'',
          MaritalStatus:'',
          BloodGroup:'',
          Address1:'',
          City1:'',
          State1:'',
          Country1:'',
          Address2:'',
          City2:'',
          State2:'',
          Country2:'',
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
              DOJ: response.data.DOJ,
              UserName: response.data.UserName,   
              ReportingTo: response.data.ReportingTo, 
          });  
        })  
        .catch(function (error) {  
            console.log(error);  
        })  
        axios.get('https://localhost:44319/api/GetPersonalInfoByEmpId/'+this.props.match.params.id)  
        .then(response => {  
            this.setState({   
              Gender: response.data[0].Gender,   
              BloodGroup: response.data[0].BloodGroup,  
              MaritalStatus: response.data[0].MaritalStatus,  
              DateOfBirth: response.data[0].DateOfBirth, 
              PlaceOfBirth: response.data[0].PlaceOfBirth,   
              Address1: response.data[0].Address1,   
              City1: response.data[0].City1,  
              State1: response.data[0].State1,  
              Country1: response.data[0].Country1, 
              Address2: response.data[0].Address2,   
              City2: response.data[0].City2,  
              State2: response.data[0].State2,  
              Country2: response.data[0].Country2, 
          });  
        })  
        .catch(function (error) {  
            console.log(error);  
        })  
  }  

    render() {  
        return (
          <div>
              <Router><PrimarySearchAppBar/> </Router>
            
            <Container className="ViewCard"> 
            <Card elevation={5} id="EmployeeTotalView" style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
            <Avatar id="EmpAvatar" style={{backgroundColor: '#333333',color: '#2DB7BC',fontSize:'4em'}}>{this.state.FirstName.charAt(0)}</Avatar> 
                  <Card elevation={10} id="EmployeeView">
                      <CardContent>
                      <h4 className="EmployeeEditPageHeading">Employee General Information</h4>  
                          <Form className="form">  
                              <div id="ViewForm1">
                                    <Col>  
                                    <TextField type="text" color="secondary" variant="outlined" required id="standard-required" label="FirstName" autoComplete="off" placeholder="FirstName"  InputProps={{ readOnly: true, }} fullWidth margin="normal" name="FirstName" value={this.state.FirstName} />

                                    <TextField type="text" color="secondary" variant="outlined"required id="standard-required" label="LastName"autoComplete="off" placeholder="LastName"  InputProps={{ readOnly: true, }} fullWidth margin="normal" name="LastName" value={this.state.LastName}/>

                                    <TextField type="email" color="secondary" variant="outlined"required id="standard-required" label="PersonalEmail"autoComplete="off" placeholder="PersonalEmail"  InputProps={{ readOnly: true, }} fullWidth margin="normal" name="PersonalEmail" value={this.state.PersonalEmail}/>

                                    <TextField type="number" color="secondary" variant="outlined"required id="standard-required" label="Contact"autoComplete="off" placeholder="Contact"  InputProps={{ readOnly: true, }} fullWidth margin="normal" name="Contact" value={this.state.Contact}/>

                                    <TextField type="text" color="secondary" variant="outlined"required id="standard-required" label="JobTitle"autoComplete="off" placeholder="JobTitle"  InputProps={{ readOnly: true, }} fullWidth margin="normal" name="JobTitle" value={this.state.JobTitle} />
                                    </Col>
                              </div>
                              <div id="ViewForm2">
                              <Col>
                              <TextField type="text" color="secondary" variant="outlined" required id="standard-required" label="Department" autoComplete="off" placeholder="Department" InputProps={{ readOnly: true, }} fullWidth margin="normal" name="Department" value={this.state.Department} />

                                <TextField id="date" color="secondary" variant="outlined" label="Joining Date" type="text" fullWidth margin="normal"name="DOJ" value={this.state.DOJ.split('T')[0]} InputProps={{ readOnly: true, }} InputLabelProps={{shrink: true, }}/>
                                
                                <TextField type="text" color="secondary" variant="outlined"required id="standard-required" label="UserName" autoComplete="off" placeholder="UserName" InputProps={{ readOnly: true, }} fullWidth margin="normal" name="UserName" value={this.state.UserName} />

                                <TextField type="text" color="secondary" variant="outlined" required id="standard-required" label="ReportingTo" autoComplete="off" placeholder="ReportingTo" fullWidth margin="normal" name="ReportingTo" value={this.state.ReportingTo}  InputProps={{ readOnly: true, }}/>
                              </Col>
                            </div>
                          </Form>  
                      </CardContent>
                  </Card>

                  <Card elevation={10} id="EmployeePersonalView">
                      <CardContent>
                      <h4 className="EmployeeEditPageHeading">Employee Personal Information</h4>  
                          <Form className="form">  
                              <div id="ViewForm3">
                                    <Col>  
                                    <TextField type="text" color="secondary" variant="outlined" required id="standard-required" InputProps={{ readOnly: true, }} label="FirstName" autoComplete="off" placeholder="FirstName" fullWidth margin="normal" name="FirstName" value={this.state.FirstName} />

                                    <TextField type="text" color="secondary" variant="outlined" required id="standard-required" InputProps={{ readOnly: true, }} label="LastName"autoComplete="off" placeholder="LastName" fullWidth margin="normal" name="LastName" value={this.state.LastName}/>

                                    <TextField type="text" color="secondary" variant="outlined" required id="standard-required"  InputProps={{ readOnly: true, }} label="Gender" autoComplete="off" placeholder="Gender" fullWidth margin="normal" name="Gender" value={this.state.Gender}/>

                                    <TextField type="text" color="secondary" variant="outlined" required id="standard-required" InputProps={{ readOnly: true, }} label="DateOfBirth" autoComplete="off" placeholder="DateOfBirth" fullWidth margin="normal" name="DateOfBirth" value={this.state.DateOfBirth.split('T')[0]}/>

                                    </Col>
                              </div>
                              <div id="ViewForm4">
                              <Col>
                              <TextField type="text"  color="secondary" variant="outlined" InputProps={{ readOnly: true, }} label="PlaceOfBirth"autoComplete="off" placeholder="PlaceOfBirth" fullWidth margin="normal" name="PlaceOfBirth" value={this.state.PlaceOfBirth} />
                                
                                <TextField type="text" color="secondary" variant="outlined" InputProps={{ readOnly: true, }} label="MaritalStatus" autoComplete="off" placeholder="MaritalStatus" fullWidth margin="normal" name="MaritalStatus" value={this.state.MaritalStatus} />

                                <TextField type="text" color="secondary" variant="outlined" InputProps={{ readOnly: true, }} label="BloodGroup" autoComplete="off" placeholder="BloodGroup" fullWidth margin="normal" name="BloodGroup" value={this.state.BloodGroup} />
                              </Col>
                            </div>
                          </Form>  
                      </CardContent>
                  </Card>
                  <Card elevation={10} id="EmployeeAddressView">
                      <CardContent>
                      <h4 className="EmployeeEditPageHeading">Employee Address Information</h4>  
                          <Form className="form">  
                          <div id="ViewFormAddressInfo">
                              <p id="PermanentAddress">Permanent Address</p>
                              <Col>                   
                                  <TextField type="text" color="secondary" variant="outlined" InputProps={{ readOnly: true, }} label="Permanent Address" autoComplete="off" placeholder="Permanent Address" fullWidth margin="normal" name="Address1" value={this.state.Address1} />
                                  <TextField type="text" color="secondary" variant="outlined" InputProps={{ readOnly: true, }} label="City" autoComplete="off" placeholder="City" fullWidth margin="normal" name="City1" value={this.state.City1} /> 
                                  <TextField type="text" color="secondary" variant="outlined" InputProps={{ readOnly: true, }} label="State" autoComplete="off" placeholder="State" fullWidth margin="normal" name="State1" value={this.state.State1} />
                                  <TextField type="text" color="secondary" variant="outlined" InputProps={{ readOnly: true, }} label="Country" autoComplete="off" placeholder="Country" fullWidth margin="normal" name="Country1" value={this.state.Country1} />   
                              </Col>
                              </div>
                              <div id="ViewFormAddressInfo1">
                            <p id="PresentAddress">Present Address</p>
                              <Col>                   
                                  <TextField type="text" color="secondary" variant="outlined" InputProps={{ readOnly: true, }} label="Present Address" autoComplete="off" placeholder="Present Address" fullWidth margin="normal" name="Address2" value={this.state.Address2}/>
                                  <TextField type="text" color="secondary" variant="outlined" InputProps={{ readOnly: true, }} label="City" autoComplete="off" placeholder="City" fullWidth margin="normal" name="City2" value={this.state.City2}/> 
                                  <TextField type="text" color="secondary" variant="outlined" InputProps={{ readOnly: true, }} label="State" autoComplete="off" placeholder="State" fullWidth margin="normal" name="State2" value={this.state.State2}/>
                                  <TextField type="text" color="secondary" variant="outlined" InputProps={{ readOnly: true, }} label="Country" autoComplete="off" placeholder="Country" fullWidth margin="normal" name="Country2" value={this.state.Country2}/>   
                              </Col>
                            </div>
                          </Form>  
                      </CardContent>
                  </Card>
                  </Card> 
                  <Link to={'/Employeelist'} style={{ textDecoration: 'none' }}><ButtonMat id="Back"type="button" variant="contained" color="secondary">Back</ButtonMat></Link>
            </Container>  
            </div> 
        );  
    }  
}  
export default View;