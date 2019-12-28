import React, { Component } from 'react'
import '../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
export class Home extends Component {
    render() {
        return (
            <div>
                <Card id="message">
                <CardContent>
                <h1 variant="contained" color="primary">"Welcome To Psiog's Employee On-Boarding Hub"</h1>
                </CardContent>
                </Card>
            </div>
        )
    }
}

export default Home
