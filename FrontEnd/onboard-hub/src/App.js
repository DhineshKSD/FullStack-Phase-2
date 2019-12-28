import React from 'react';
import './App.css';
import AppRouter from "./RouterComponent";
import NavBar from "./Navbar";
import Container from '@material-ui/core/Container';

function App() {
  return (
      <div>
          <NavBar/>
          <Container>
                <AppRouter/>
          </Container>
      </div>
  );
}

export default App;