import { Outlet } from 'react-router-dom';
import GuidedOverlay from './GuidedOverlay';
import { useGuidedJourney } from '../contexts/GuidedJourneyContext';

const CustomerLayout = () => {
  const { isGuided, hasTakenTour } = useGuidedJourney();

  return (
    <div className="h-full">
      <Outlet />
      {isGuided && !hasTakenTour && <GuidedOverlay />}
    </div>
  );
};

export default CustomerLayout;