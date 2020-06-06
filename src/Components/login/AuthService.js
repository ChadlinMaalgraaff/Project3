import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Auth {
    constructor() {
        this.authenticated = false;
        console.log(this.authenticated);
    }

    login(cb) {
        this.authenticated = true;
        cb();
        console.log(this.authenticated);
    }

    /*logout(cb) {
        cb();
        //return <Redirect to='/login'/>
        //this.authenticated = false;
    }*/

    isAuthenticated() {
        console.log(this.authenticated);
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