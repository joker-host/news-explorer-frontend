import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, handleLoginPopup, ...props }) => {
  useEffect(() => {
    if (localStorage.isLoggedIn === 'false') {
      handleLoginPopup();
    }
  }, []);

  return (
    <Route>
      {() => (localStorage.isLoggedIn ? <Component {...props} /> : <Redirect to='/main'/>)}
    </Route>
  )
}

export default ProtectedRoute;