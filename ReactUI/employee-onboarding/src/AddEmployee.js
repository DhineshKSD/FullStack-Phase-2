import React from 'react';  
import axios from 'axios';  
import './AddEmployee.css';  
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
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
  axios.post('http://localhost:52564/Api/Employee/AddotrUpdateEmployee/', {FirstName:this.state.FirstName,LastName:this.state.LastName,  
  PersonalEmail:this.state.PersonalEmail, Contact:this.state.Contact,JobTitle:this.state.JobTitle, Department:this.state.Department,
  Compensation:this.state.Compensation,DOJ:this.state.DOJ, UserName:this.state.UserName,Password:this.state.Password, ReportingTo:this.state.ReportingTo})  
.then(json => {  
if(json.data.Status==='Success'){  
  console.log(json.data.Status);  
  alert("Data Save Successfully");  
this.props.history.push('/Employeelist')  
}  
else{  
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
return (  
   <Container className="App">  
    <h4 className="PageHeading">Enter NewHires's Informations</h4>  
    <Form className="form">  
      <Col>  
        <FormGroup Row>  
          <Label id= "FirstName" sm={2}>FirstName</Label>  
          <Col sm={10}>  
            <Input type="text" name="FirstName" onChange={this.handleChange} value={this.state.FirstName} placeholder="Enter FirstName" style={{width: "300px"}} />  
          </Col>  
        </FormGroup>  
        <FormGroup Row>  
          <Label for="LastName" sm={2}>LastName</Label>  
          <Col sm={10}>  
            <Input type="text" name="LastName" onChange={this.handleChange} value={this.state.LastName} placeholder="Enter LastName" style={{width: "300px"}}/>  
          </Col>  
        </FormGroup>  
        <FormGroup Row>  
          <Label for="PersonalEmail" sm={2}>PersonalEmail</Label>  
          <Col sm={10}>  
            <Input type="email" name="PersonalEmail" onChange={this.handleChange} value={this.state.PersonalEmail} placeholder="Enter Personal-Email" style={{width: "300px"}}/>  
          </Col>  
        </FormGroup>  
        <FormGroup Row>  
          <Label for="Contact" sm={2}>Contact</Label>  
          <Col sm={10}>  
            <Input type="number" name="Contact" onChange={this.handleChange} value={this.state.Contact} placeholder="Enter Contact" style={{width: "300px"}}/>  
          </Col>  
        </FormGroup>
        <FormGroup Row>  
          <Label for="JobTitle" sm={2}>JobTitle</Label>  
          <Col sm={10}>  
            <Input type="text" name="JobTitle" onChange={this.handleChange} value={this.state.JobTitle} placeholder="Enter JobTitle" style={{width: "300px"}}/>  
          </Col>  
        </FormGroup>  
        <FormGroup Row>  
          <Label for="Department" sm={2}>Department</Label>  
          <Col sm={10}>  
            <Input type="text" name="Department" onChange={this.handleChange} value={this.state.Department} placeholder="Enter Department" style={{width: "300px"}}/>  
          </Col>  
        </FormGroup>  
      <FormGroup Row>  
          <Label id= "Compensation" for="Compensation" sm={2}>Compensation</Label>  
          <Col sm={10}>  
            <Input type="number" name="Compensation" onChange={this.handleChange} value={this.state.Compensation} placeholder="Enter Compensation" style={{width: "300px"}} />  
          </Col>  
        </FormGroup>  
        <FormGroup Row>  
          <Label for="DOJ" sm={2}>Date.of.Joining</Label>  
          <Col sm={10}>  
            <Input type="date" name="DOJ" onChange={this.handleChange} value={this.state.DOJ} placeholder="Enter Date.of.Joining" style={{width: "300px"}}/>  
          </Col>  
        </FormGroup>  
        <FormGroup Row>  
          <Label for="UserName" sm={2}>UserName</Label>  
          <Col sm={10}>  
            <Input type="text" name="UserName" onChange={this.handleChange} value={this.state.UserName} placeholder="Enter UserName" style={{width: "300px"}}/>  
          </Col>  
        </FormGroup>  
        <FormGroup Row>  
          <Label for="Password" sm={2}>Password</Label>  
          <Col sm={10}>  
            <Input type="text" name="Password" onChange={this.handleChange} value={this.state.Password} placeholder="Enter Password" style={{width: "300px"}}/>  
          </Col>  
        </FormGroup>
        <FormGroup Row>  
          <Label for="Reporting" sm={2}>Reporting-To</Label>  
          <Col sm={10}>  
            <Input type="text" name="Reporting" onChange={this.handleChange} value={this.state.Reporting} placeholder="Enter Reporting-To" style={{width: "300px"}}/>  
          </Col>  
        </FormGroup>  
        </Col>
      <Col>  
        <FormGroup Row>  
          <Col sm={5}>  
          </Col>  
          <Col sm={1}>  
          <button id="submit"type="button" onClick={this.AddEmployee} className="btn btn-success">Submit</button>  
          </Col>  
          <Col sm={1}>  
            <Button id="cancel" color="danger">Cancel</Button>{' '}  
          </Col>  
          <Col sm={5}>  
          </Col>  
        </FormGroup>    
      </Col>  
    </Form>  
  </Container>  
);  
}  
}  
export default AddEmployee;