import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ children }) {
    const inAccount = useSelector((state) => state.articles.inAccount);
    if (!inAccount) {
        return <Navigate to="/sign-in" replace />;
    }
    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.element,
};

export default PrivateRoute;
