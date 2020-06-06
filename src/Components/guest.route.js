import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import auth from './login/AuthService';

export const GuestRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={props => {
                if (!auth.isAuthenticated()) {
                    return <Component {...props} />;
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