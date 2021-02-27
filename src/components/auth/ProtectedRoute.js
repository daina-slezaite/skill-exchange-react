import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({component: Component, user, ...rest}) => {
    useEffect(() => {
        const loggedInUser = localStorage.getItem('myUser');
        if (loggedInUser) {
          user = JSON.parse(loggedInUser);
        }
    });

    return(
        <Route
            {...rest}
            render={props => {
                if(user){
                    return <Component {...props} userInSession={user} />
                } else {
                    return <Redirect to={{pathname: '/', state: {from: props.location}}} />
                }
            }
        }
        />
    )
}

export default ProtectedRoute;