import { useRoutes } from 'react-router-dom';
import MainRoutes from './main/MainRoutes';
import AuthRoutes from './auth/AuthRoutes';

const RootRoutes = () => {
    const routes = useRoutes([
        ...MainRoutes,
        ...AuthRoutes,
    ]);
    return routes;
}

export default RootRoutes;