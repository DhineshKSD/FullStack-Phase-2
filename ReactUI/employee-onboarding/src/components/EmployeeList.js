import React, { Component } from 'react';  
import axios from 'axios';  
import Table from './Table';  
import '../App.css';
import '../EmployeeList.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PrimarySearchAppBar from '../components/Header';
import Navigation from '../components/Navigation';
import Avatar from '@material-ui/core/Avatar';

export default class Employeelist extends Component {  
constructor(props) {  
    super(props);  
    this.state = {business: []}
}  

componentDidMount(){  
  debugger;  
  axios.get('https://localhost:44319/api/GetEmployees')  
    .then(response => {  
      this.setState({ business: response.data }); 
      console.log(response.data ); 
      debugger;  
    })  
    .catch(function (error) {  
      console.log(error);  
    })  
} 

tabRow(){  
  return this.state.business.map(function(object, i){  
      return <Table obj={object} key={i} />;  
  });  
}  

render() {  
    return (  
      <div> 
        <PrimarySearchAppBar/>
        <Navigation/> 
        <Card id="EmpListCard" elevation={7}>
              <CardContent>
                  <h5 id="EmpListHeading" align="center">On-Boarding Queue</h5>  
                    <table className="table table-hover" style={{ marginTop: '2em' ,textAlign:'center'}}>  
                      <thead class="thead-light">  
                          <tr>  
                              <th>      </th>
                              <th>Name</th>  
                              <th>Date.of.Joining</th>  
                              <th>Role</th>  
                              <th>Department</th>
                              <th>Status</th>  
                              <th colSpan="4">Action </th>  
                          </tr>  
                      </thead>  
                      <tbody>  
                          { this.tabRow() }   
                      </tbody>  
                  </table>  
               </CardContent>
        </Card>
      </div>  
    );  
  }  
}