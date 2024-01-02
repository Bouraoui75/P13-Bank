import { Outlet, Navigate } from 'react-router-dom';

/**
 * 
 * Outlet is used to render the child routes of the parent route.
 * Which means that the child routes of the parent route will be rendered where the Outlet component is used.
 */
const Authentication = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Authentication;
