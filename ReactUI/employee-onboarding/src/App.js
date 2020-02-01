import React from 'react';  
import AppRouter from '../src/AppRouter'  
import 'bootstrap/dist/css/bootstrap.css'; 
import Container from '@material-ui/core/Container';
import Camera from '../src/components/Camera'
import './App.css';  
/*import CenteredTabs from './NavTab';
import PersonalInfo from '../src/components/PersonalInfo';
import AddEmployee from '../src/components/AddEmployee';
import Login from '../src/components/Login';
import Education from '../src/components/Education'
import Stepper from '../src/Stepper';
import Instruction from '../src/components/Instruction';
import PrimarySearchAppBar from '../src/components/Header';
import Employment from '../src/components/Employment';
import Policy from '../src/components/Policy';
import FileUpload from '../src/components/FileUpload';*/
function App() {  
  return (  
    <div>
          <AppRouter/>
    </div>
  );  
}  
export default App;