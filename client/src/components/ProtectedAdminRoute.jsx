import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    // Check if user is logged in AND is an admin
    if (!user || user.role !== 'admin') {
        return <Navigate to="/admin-login" />;
    }

    return children;
};

export default ProtectedAdminRoute;
