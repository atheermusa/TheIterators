import { Routes, Route } from 'react-router-dom';
import CustomerLayout from './CustomerLayout';
import AgentLayout from './AgentLayout';
import LandingPage from './LandingPage';
import SupportPage from './SupportPage';
import CardPage from './CardPage';
import ViewPinPage from './ViewPinPage';
import NotFoundPage from './NotFoundPage';
import FooterNav from './FooterNav';
import { useGuidedJourney } from '../contexts/GuidedJourneyContext';

const AppRoutes = () => {
  const { isGuided } = useGuidedJourney();
  console.log('isGuided', isGuided);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
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
      </div>
      <FooterNav />
    </div>
  );
};

export default AppRoutes;