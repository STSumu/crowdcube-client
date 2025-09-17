import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate } from 'react-router-dom';
import Loading from '../pages/Loading';

const PrivateRouter = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    if(loading)
        return <Loading></Loading>
    if(user)
        return children;
    return <Navigate to='/auth/login'></Navigate>
};

export default PrivateRouter;