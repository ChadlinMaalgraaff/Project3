import React from 'react';
import Feed from './Components/Dashboard/feed';
import Chat from './Components/Messaging/chat';

function App() {
    return ( 
      <div className = "App" style={{margin:'0px', padding:'0px', width:'100%'}}>
        <Chat style={{width:'100%'}}/>
      </div>
    );
}

export default App;