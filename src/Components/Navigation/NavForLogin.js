import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import logo from '../../Images/twaddle_dark_blue_circle.png';

function NavLogin() {
    return (
            <Navbar expand="sm" variant="dark" style={{ width:'100%', backgroundColor: '#498ec5'}}>
                <Navbar.Brand href="/home">
                    <img src={logo} width="50" height="50"/>
                </Navbar.Brand>
                <Navbar.Brand href="/home" style={{fontFamily: 'MyFont', fontSize: '30px', padding: '0px'}}>
                    Twaddle
                </Navbar.Brand>

            </Navbar>
    );
}
export default NavLogin;