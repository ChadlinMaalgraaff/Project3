import React from 'react';
import Feed from './Components/Dashboard/feed';
import Chat from './Components/Messaging/chat';
import Person from './Components/Messaging/person';

function App() {
    return ( 
      <div className = "App" style={{margin:'0px', padding:'0px', width:'100%'}}>
        <Chat />
      </div>
    );
}

export default App;