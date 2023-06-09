import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';
import Spinner from '../spinner/spinner';
import { useCheckAuthQuery } from '../../api/api';

type PrivateRouteProps = {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const query = useCheckAuthQuery();

  return (
    <Spinner isActive={query.isLoading}>
      {query.isError
        ? <Navigate to={AppRoute.Login}/>
        : children}
    </Spinner>
  );
};

export default PrivateRoute;
