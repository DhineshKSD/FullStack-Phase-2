import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 
import Employeelist from '../src/components/EmployeeList'; 
import ButtonMat from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        
        <Router>
        <Link to={'/Home'} style={{ textDecoration: 'none' }} onClick={event =>  window.location.href='/Home'}><Tab label="Home"/></Link>
        </Router>
        <Router>
        <Link to={'/AddEmployee'} style={{ textDecoration: 'none' }} onClick={event =>  window.location.href='/AddEmployee'}><Tab label="Add Employee" /></Link>
        </Router>
        <Router>
        <Link to={'/Employeelist'} style={{ textDecoration: 'none' }} onClick={event =>  window.location.href='/Employeelist'}><Tab label="On-Boarding Queue" /></Link>
        </Router>
       
      </Tabs>
    </Paper>
  );
}
