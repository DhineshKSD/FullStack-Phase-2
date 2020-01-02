import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import ThanksAvatar from '../Assets/ThanksAvatar.png';
import PrimarySearchAppBar from '../components/Header'; 
import '../Thanks.css'

export class Thanks extends Component {
    render() {
        return (
            <div>
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
