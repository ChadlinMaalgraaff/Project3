import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../Components/login/AuthService';
import Navigation from '../Components/Navigation/Navigation';

export const ProtectedRoute = ({component: Component, showNav=true, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={props => {
                if (auth.isAuthenticated() && showNav) {
                    return <div>  <Navigation/>
                    <Component {...props} />
                    </div>;
                }
                else {
                    return <Redirect to={{
                        pathname: "/",
                        state: {
                            from: props.location
                        }
                    }}/>
                }
            }}
        />
    );
};