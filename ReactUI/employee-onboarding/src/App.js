import React from 'react';  
import AppRouter from '../src/AppRouter'  
import PrimarySearchAppBar from '../src/components/Header';
import 'bootstrap/dist/css/bootstrap.css'; 
import Container from '@material-ui/core/Container';
import './App.css';  
import CenteredTabs from './NavTab';
import PersonalInfo from '../src/components/PersonalInfo';
import AddEmployee from '../src/components/AddEmployee';
import Login from '../src/components/Login';
import Education from '../src/components/Education'
import Stepper from '../src/Stepper'
function App() {  
  return (  
    <div>
    
    <Container id ="nav1">
      <AppRouter/>
    </Container>
    </div>
  );  
}  
export default App;