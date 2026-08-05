import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectUserLoading,
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  children: JSX.Element;
  onlyUnAuth?: boolean;
};

const ProtectedRoute = ({
  children,
  onlyUnAuth = false,
}: TProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectUserLoading);
  const location = useLocation();

  if (loading) {
    return <Preloader />;
  }

  if (!isAuthenticated && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (isAuthenticated && onlyUnAuth) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} />;
  }

  return children;
};

export default ProtectedRoute;
