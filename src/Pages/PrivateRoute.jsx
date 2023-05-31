import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {

    let token = JSON.parse(localStorage.getItem("token")) || "";

    if (!token){
        return <Navigate to="/login" />
    }
    return children
}

export default PrivateRoute;