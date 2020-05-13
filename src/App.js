import React from 'react';
import Feed from './Components/Dashboard/feed';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
    return ( 
      <div className = "App" style={{margin:'0px', padding:'0px', width:'100%'}}>
        <Feed style={{width:'100%'}}/>
      </div>
    );
}

export default App;