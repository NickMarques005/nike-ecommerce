import { BrowserRouter } from 'react-router-dom';
import RootRoutes from './routes/RootRoutes';
import { MainProvider } from '@/contexts/MainProvider';
import ScrollToTop from '@/components/scroll/ScrollToTop';

const MainRouter = () => (
    <MainProvider>
        <BrowserRouter>
            <ScrollToTop />
            <RootRoutes />
        </BrowserRouter>
    </MainProvider>
);

export default MainRouter;
