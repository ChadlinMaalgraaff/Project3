import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import auth from './login/AuthService';
import NavLogin from '../Components/Navigation/NavForLogin';

export const GuestRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={props => {
                if (!auth.isAuthenticated()) {
                    return <div> <NavLogin/>
                    <Component {...props} /></div>;
                }
                else {
                    return <Redirect to={{
                        pathname: "/home",
                        state: {
                            from: props.location
                        }
                    }}/>
                }
            }}
        />
    );
};