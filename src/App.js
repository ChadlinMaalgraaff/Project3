import React from 'react';
import Feed from './Components/Dashboard/feed';
import Chat from './Components/Messaging/chat';
import Person from './Components/Messaging/person';
import Login from './Components/login/login';
import Register from './Components/login/register';
import './App.css';
import { Container, CssBaseline } from '@material-ui/core';

function App() {
    return ( 
      <div className = "App" style={{margin:'0px', padding:'0px', width:'100%'}}>
        <Feed />
      </div> 
      /*<React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" fixed>
          <Register/>
      </Container>
      </React.Fragment>*/
    );
}

export default App;