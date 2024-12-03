import Joyride, { Step, CallBackProps } from 'react-joyride';
import { useGuidedJourney } from '../contexts/GuidedJourneyContext';

const GuidedOverlay = () => {
  const { endJourney, currentJourney } = useGuidedJourney();

  const journeySteps: Record<string, Step[]> = {
    'view-pin': [
      {
        target: '.support-button',
        content: 'First, tap on the Cards tab in the bottom navigation bar',
        disableBeacon: true
      },
      {
        target: '.view-pin-button',
        content: 'Next, tap on the View PIN option',
      },
      {
        target: '.pin-verification',
        content: 'Verify your identity to view your PIN',
      }
    ],
    'replace-card': [
      {
        target: '.support-card-management-card',
        content: 'First, tap on Card Management',
      },
      {
        target: '.lost-stolen-button',
        content: 'Then select Lost or Stolen Card option',
      }
    ]
  };
  console.log('GuidedOverlay rendered with journey:', currentJourney);
  console.log('Steps:', journeySteps[currentJourney ?? ''] || []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    console.log(data);
    const { status, type } = data;
    if (status === 'finished' || status === 'skipped') {
      endJourney();
    }
  };

  return (
    <Joyride
      steps={journeySteps[currentJourney ?? ''] || []}
      continuous
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