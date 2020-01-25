import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import ThanksAvatar from '../Assets/ThanksAvatar.png';
import PrimarySearchAppBar from '../components/Header'; 
import '../Thanks.css';
import DarkTheme, { createTheme } from 'react-dark-theme';
import axios from 'axios';  
import ButtonMat from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/icons/Cancel';

const lightTheme = {
  background: '#c5cae965',
  text:'black'
}
 
const darkTheme = {
  background: '#a9aaa9',
  text: 'black',
}
const myTheme = createTheme(darkTheme, lightTheme)

var userId = localStorage.getItem("User");

export class Thanks extends Component {
  constructor(props){  
    super(props)  
    this.state = {snackbaropen :false, snackbarmsg:''};}
    download=(e)=>{
        axios.get('https://localhost:44319/api/GetEmployeeDetailsById/'+userId)  
                .then(json => {  
                  this.setState({snackbaropen:true , snackbarmsg : "Download Started"}) 
                })  
                .catch(function (error) {  
                  console.log(error);  
                })
        }
        snackbarClose = (e) =>{
          this.setState({snackbaropen:false});
        }
        
    render() {
        return (
            <div id='tnq' style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
              <Snackbar 
              anchorOrigin={{vertical:'bottom',horizontal:'right'}}
              open = {this.state.snackbaropen}
              autoHideDuration = {1500}
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
               <PrimarySearchAppBar/>
                <Card id="ThanksCardMessage" elevation={10}>
                <img src={ThanksAvatar} className="ThanksAvatar" alt="ThanksAvatar" />
                    <p1 id="Thanks">Thanks For Submitting.</p1>
                </Card>
                <p2 id="click"> Click Here To Download Your Pre-Joining form</p2>
                <div class="box">
                <span></span>
                <span></span>
                <span></span>
                </div>
                <ButtonMat id="download" variant="contained" color="secondary" onClick={this.download}>Download</ButtonMat>
            </div>
        )
    }
}

export default Thanks
