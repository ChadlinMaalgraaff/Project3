import React from 'react';
import Dash from './Components/Dashboard/dashboard';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
    return ( 
      <div className = "App" style={{margin:'0px', padding:'0px', width:'100%'}}>
        <Dash style={{width:'100%'}}/>
      </div>
    );
}

export default App;