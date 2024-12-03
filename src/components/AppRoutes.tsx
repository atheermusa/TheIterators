import { Routes, Route } from 'react-router-dom';
import CustomerLayout from './CustomerLayout';
import AgentLayout from './AgentLayout';
import LandingPage from './LandingPage';
import SupportPage from './SupportPage';
import CardPage from './CardPage';
import ViewPinPage from './ViewPinPage';
import NotFoundPage from './NotFoundPage';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Customer Routes */}
            <Route element={<CustomerLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="support" element={<SupportPage />} />
                <Route path="cards" element={<CardPage />} />
                <Route path="view-pin" element={<ViewPinPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Agent Routes */}
            <Route path="agent" element={<AgentLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="support" element={<SupportPage />} />
                <Route path="cards" element={<CardPage />} />
                <Route path="view-pin" element={<ViewPinPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;