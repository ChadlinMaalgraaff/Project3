import React, { Component } from 'react';
import { Link, Redirect, withRouter, useHistory } from 'react-router-dom';
import { Nav, Navbar, OverlayTrigger, Popover, PopoverContent,Button, PopoverTitle, NavDropdown, Card, ListGroup } from 'react-bootstrap';
import  HomeSharpIcon from '@material-ui/icons/HomeSharp';
import  PersonSharpIcon from '@material-ui/icons/PersonSharp';
import  ForumSharpIcon from '@material-ui/icons/ForumSharp';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import Request from '../FriendRequests/requests';
import img from '../../Images/iu.jpeg';
import SettingsIcon from '@material-ui/icons/Settings';
import auth from '../login/AuthService';
import axios from 'axios';
import logo from '../../Images/twaddle_dark_blue_circle.png';
import font from '../../fonts/hacked-font/Hacked-KerX.ttf';



export default handleLogout;