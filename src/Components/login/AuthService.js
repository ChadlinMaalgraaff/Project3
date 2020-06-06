import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Auth {
    constructor() {
        console.log(this.authenticated);
    }

    login(cb) {
        cb();
        console.log(this.authenticated);
    }

    /*logout(cb) {
        cb();
        //return <Redirect to='/login'/>
        //this.authenticated = false;
    }*/

    isAuthenticated() {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'));
            return true;
        } else {
            console.log(localStorage.getItem('token'));
            return false;
        }
    }
}

export default new Auth();