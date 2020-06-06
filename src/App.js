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
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import  Navigation from './Components/Navigation/Navigation';
import { ProtectedRoute } from './Components/protected.route';
import auth from './Components/login/AuthService';
import { GuestRoute } from './Components/guest.route';

function App() {
    return ( 
      <React.Fragment>
        <Router>
          <Navigation/>
            <Switch>  
              <ProtectedRoute path='/home' component={Feed}/>
              <GuestRoute exact path='/' component={Login}/>
              <GuestRoute path='/register' component={Register} />
              <ProtectedRoute path='/requests' component={Request} />
              <ProtectedRoute path = "/profile" component = {Profile}/>
              <ProtectedRoute path = "/friends" component = {Friends} />
              <ProtectedRoute path= "/messages" component={Chat} />
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
          </Router>
      </React.Fragment>
    );
}
    
export default App;