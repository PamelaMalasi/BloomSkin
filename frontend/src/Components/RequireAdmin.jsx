import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const RequireAdmin = ({ children }) => {
  const { userInfo } = useContext(UserContext);

  if (!userInfo) {
    //not logged in
    return <Navigate to="/login" />;
  }

  if (userInfo.role !== 'admin') {
    //logged in, but not admin
    return <Navigate to="/" />;
  }

  //all good
  return children;
};

export default RequireAdmin;
