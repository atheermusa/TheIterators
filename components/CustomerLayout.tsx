import { Outlet } from 'react-router-dom';
import { GuidedJourneyProvider } from '../contexts/GuidedJourneyContext';

const CustomerLayout = () => {
    return (
        <GuidedJourneyProvider>
            <div className="h-full">
                <Outlet />
            </div>
        </GuidedJourneyProvider>
    );
};

export default CustomerLayout;