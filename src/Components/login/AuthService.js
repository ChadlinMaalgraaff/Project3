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
        var date = new Date();
        date.getDate();
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'));
            if (localStorage.getItem('rememberme') == 'yes') {
                return true;
            }
            if (date >= localStorage.getItem('tomorrow')){
                console.log('date');
                localStorage.removeItem('token');
                localStorage.clear();
                return false;
            }
            return true;
        } else {
            console.log(localStorage.getItem('token'));
            return false;
        }
    }
}

export default new Auth();