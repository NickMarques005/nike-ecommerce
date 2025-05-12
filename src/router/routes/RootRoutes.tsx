import { useRoutes } from 'react-router-dom';
import MainRoutes from './main/MainRoutes';
import AuthRoutes from './auth/AuthRoutes';
import CartRoutes from './cart/CartRoutes';

const RootRoutes = () => {
    const routes = useRoutes([
        ...MainRoutes,
        ...AuthRoutes,
        ...CartRoutes
    ]);
    return routes;
}

export default RootRoutes;