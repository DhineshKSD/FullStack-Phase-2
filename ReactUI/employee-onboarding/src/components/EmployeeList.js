import React, { Component } from 'react';  
import axios from 'axios';  
import Table from './Table';  
import '../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
          <Card id="message1">
                <CardContent>
          <h5 align="center">On-Boarding Queue</h5>  
          <table className="table table-striped" style={{ marginTop: '1em' }}>  
            <thead>  
              <tr>  
                <th>Name</th>  
                <th>Date.of.Joining</th>  
                <th>Role</th>  
                <th>Department</th>  
                <th colSpan="4">Action</th>  
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