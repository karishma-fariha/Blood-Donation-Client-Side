import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import Loading from '../Pages/Loading';

const AdminRoute = () => {
    const {user,loading} =use(AuthContext);
    
    if(loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            
        </div>
    );
};

export default AdminRoute;