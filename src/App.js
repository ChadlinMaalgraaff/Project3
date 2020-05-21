import React from 'react';
import Feed from './Components/Dashboard/feed';
import Chat from './Components/Messaging/chat';
import Person from './Components/Messaging/person';
import Login from './login/login';
import Register from './login/register';
import './App.css';

function App() {
    return ( 
      <div className = "App" style={{margin:'0px', padding:'0px', width:'100%'}}>
        <Chat />
      </div>
      /*<div className= "wrapper" >
          <Login/>
        </div>*/
    );
}

export default App;