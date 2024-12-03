import { Routes, Route } from 'react-router-dom';
import { GuidedJourneyProvider } from '../contexts/GuidedJourneyContext';
import { useGuidedJourney } from '../contexts/GuidedJourneyContext';
import LandingPage from './LandingPage';
import SupportPage from './SupportPage';
import CardPage from './CardPage';
import ViewPinPage from './ViewPinPage';
import GuidedOverlay from './GuidedOverlay';
import NotFoundPage from './NotFoundPage';

const AppRoutes = () => {
    const { isGuided } = useGuidedJourney();

    return (
        <div className="relative h-full">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/cards" element={<CardPage />} />
                <Route path="/view-pin" element={<ViewPinPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {isGuided && <GuidedOverlay />}
        </div>
    );
};

const CustomerApp = () => {
    return (
        <GuidedJourneyProvider>
            <AppRoutes />
        </GuidedJourneyProvider>
    );
};

export default CustomerApp;