import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { useGuidedJourney } from '../contexts/GuidedJourneyContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const GuidedOverlay = () => {
  const {
    endJourney,
    journeyType,
    steps,
    stepIndex,
    setStepIndex,
    markTourComplete,
    isLoading,
    error
  } = useGuidedJourney();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Reset step index when route changes
    if (journeyType === 'view-pin') {
      switch (location.pathname) {
        case '/':
          setStepIndex(0);
          break;
        case '/cards':
          setStepIndex(1);
          break;
        case '/view-pin':
          setStepIndex(2);
          break;
      }
    }
  }, [location.pathname, journeyType, setStepIndex]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;
    console.log({ data });

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      markTourComplete();
      endJourney();
      return;
    }

    if (type === 'step:after' && journeyType === 'view-pin') {
      switch (index) {
        case 0:
          setTimeout(() => {
            navigate('/cards');
          }, 500);
          break;
        case 1:
          setTimeout(() => {
            navigate('/view-pin');
          }, 500);
          break;
      }
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-center">Loading journey...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm">
          <div className="text-red-600 text-center mb-4">⚠️</div>
          <p className="text-center text-red-600 mb-4">{error}</p>
          <button
            onClick={endJourney}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <Joyride
      steps={steps}
      stepIndex={stepIndex}
      continuous={true}
      showProgress
      showSkipButton
      run={true}
      debug={true}
      styles={{
        options: {
          primaryColor: '#000',
          zIndex: 1000,
        },
      }}
      callback={handleJoyrideCallback}
    />
  );
};

export default GuidedOverlay; 