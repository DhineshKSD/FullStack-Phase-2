import React from 'react';  
import AppRouter from '../src/AppRouter'  
import PrimarySearchAppBar from '../src/components/Header';
import 'bootstrap/dist/css/bootstrap.css'; 
import Container from '@material-ui/core/Container';
import './App.css';  
function App() {  
  return (  
    <div>
    <PrimarySearchAppBar/>
    
    <Container id = "nav1">
         <AppRouter/>
    </Container>
    
    </div>
  );  
}  
export default App;