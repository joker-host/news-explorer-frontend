import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {() => (localStorage.isLoggedIn ? <Component {...props} /> : <Redirect to='/main'/>)}
  </Route>
);

export default ProtectedRoute;
