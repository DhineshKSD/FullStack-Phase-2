import React, { Component } from 'react';
import Education from "../src/components/Education";
import PersonalInfo from "../src/components/PersonalInfo";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 

export class Stepper1 extends Component {
  state = {
    step: 1,
    
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { firstName, lastName, email, occupation, city, bio } = this.state;
    const values = { firstName, lastName, email, occupation, city, bio };

    switch (step) {
      case 1:
        return (
            <Router>
          <Education
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
          </Router>
        );
      case 2:
        return (
            <Router>
          <PersonalInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
          </Router>
        );
    }
  }
}

export default Stepper1;