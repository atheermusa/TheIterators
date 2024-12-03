import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { useGuidedJourney } from '../contexts/GuidedJourneyContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const GuidedOverlay = () => {
  const { endJourney, journeyType, steps, stepIndex, setStepIndex, markTourComplete } = useGuidedJourney();
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