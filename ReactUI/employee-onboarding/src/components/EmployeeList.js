import React, { Component } from 'react';  
import axios from 'axios';  
import Table from './Table';  
import '../App.css';
import '../EmployeeList.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PrimarySearchAppBar from '../components/Header';
import Navigation from '../components/Navigation';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import DarkTheme, { createTheme } from 'react-dark-theme';
import Checkbox from '@material-ui/core/Checkbox';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ButtonMat from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import NavTab from '../NavTab';
import HelpIcon from '@material-ui/icons/LiveHelp';
import Help from '../Assets/Help.png';
import ReactTooltip from 'react-tooltip';

const lightTheme = {
  background: '#c5cae965',
  text:'black'
}
 
const darkTheme = {
  background: '#a9aaa9',
  text: 'black',
}

const myTheme = createTheme(darkTheme, lightTheme)


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
      console.log(this.state.business); 
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
      <div id="tablecard" style={{ backgroundColor: myTheme.background, color: myTheme.text }}> 
        <PrimarySearchAppBar/>
        <Navigation/>
        <Card id="EmpListCard" elevation={7} >
              <CardContent>
                  <h5 className="EmpListHeading" align="center">On-Boarding Queue</h5><img data-tip data-for='happyFacex'
                            className="Help"
                            src={Help} 
                            alt="Help"
                            />
                    <ReactTooltip id='happyFacex' type='dark' effect='solid'>
                      <span> Click Me For Help Mode </span>
                    </ReactTooltip> 
                    <table className="table table-hover" style={{ marginTop: '2em' ,textAlign:'center'}}>  
                      <thead style={{backgroundColor:'#c3c5c4'}}>  
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