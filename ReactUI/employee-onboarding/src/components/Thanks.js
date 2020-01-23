import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import ThanksAvatar from '../Assets/ThanksAvatar.png';
import PrimarySearchAppBar from '../components/Header'; 
import '../Thanks.css';
import DarkTheme, { createTheme } from 'react-dark-theme';

const lightTheme = {
  background: '#c5cae965',
  text:'black'
}
 
const darkTheme = {
  background: '#a9aaa9',
  text: 'black',
}
const myTheme = createTheme(darkTheme, lightTheme)

export class Thanks extends Component {
    render() {
        return (
            <div id='tnq' style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
               <PrimarySearchAppBar/>
                <Card id="ThanksCardMessage" elevation={10}>
                <img src={ThanksAvatar} className="ThanksAvatar" alt="ThanksAvatar" />
                    <p1 id="Thanks">Thanks For Submitting.</p1>
                </Card>
            </div>
        )
    }
}

export default Thanks
