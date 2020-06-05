import React, { Component } from 'react';
import Feed from './Components/Dashboard/feed';
import Chat from './Components/Messaging/chat';
import Person from './Components/Messaging/person';
import Login from './Components/login/login';
import Register from './Components/login/register';
import Request from './Components/FriendRequests/requests';
import Profile from './Components/Profile/profile';
import Friends from './Components/Profile/friends';
import './App.css';
import { Container, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  Navigation from './Components/Navigation/Navigation';
import CreateUser from './Components/login/create';

function App() {
    return ( 
      <React.Fragment>
        <Router>
          <Navigation/>
            <Switch>             
              <Route exact path='/home' component={Feed}/>
              <Route path='/login' component={CreateUser}/>
              <Route path='/register' component={Register} />
              <Route path='/requests' component={Request} />
              <Route path = "/profile" component = {Profile}/>
              <Route path = "/friends" component = {Friends} />
              <Route path= "/messages" component={Chat} />
            </Switch>
          </Router>
      </React.Fragment>
    );
}
    
export default App;