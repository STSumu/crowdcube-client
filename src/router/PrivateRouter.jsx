import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({children}) => {
    const {user}=useContext(AuthContext);
    if(user)return {children};
    else return <Navigate to='/auth/login'></Navigate>
};

export default PrivateRouter;