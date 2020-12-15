import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, handleLoginPopup, ...props }) => {
  useEffect(() => {
    if (localStorage.isLoggedIn === 'false') { 
      // Если пользователь не авторизован и хочет перейти на защищенный адрес, то открываем попап с логином
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