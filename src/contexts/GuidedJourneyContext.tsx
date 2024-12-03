import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Step } from 'react-joyride';

interface GuidedJourneyContextType {
  isGuided: boolean;
  stepIndex: number;
  journeyType: string | null;
  steps: Step[];
  hasTakenTour: boolean;
  startJourney: (type: string) => void;
  endJourney: () => void;
  setStepIndex: (index: number) => void;
  markTourComplete: () => void;
}

const TOUR_COMPLETED_KEY = 'guided_tour_completed';

const journeySteps: Record<string, Step[]> = {
  'view-pin': [
    {
      target: '[data-testid="cards-button"]',
      content: 'Firstly, tap on Cards in the bottom navigation',
      placement: 'top',
      disableBeacon: true,
    },
    {
      target: '[data-testid="view-pin-button"]',
      content: 'Tap View Pin to see the Pin information',
      placement: 'top',
      disableBeacon: true,
    },
    {
      target: '[data-testid="show-pin-button"]',
      content: 'Finally, tap Show PIN to see your card PIN',
      placement: 'top',
      disableBeacon: true,
    }
  ],
  'replace-card': [
    {
      target: '[data-testid="support-card-management-card"]',
      content: 'First, tap on Card Management',
      placement: 'top',
    },
    {
      target: '[data-testid="lost-stolen-button"]',
      content: 'Then select Lost or Stolen Card option',
      placement: 'top',
    }
  ]
};

const GuidedJourneyContext = createContext<GuidedJourneyContextType | undefined>(undefined);

export const GuidedJourneyProvider = ({ children }: { children: ReactNode }) => {
  const [isGuided, setIsGuided] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [journeyType, setJourneyType] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [hasTakenTour, setHasTakenTour] = useState(false)

  const startJourney = (type: string) => {
    console.log('startJourney', type);
    setJourneyType(type);
    setIsGuided(true);
    setStepIndex(0);
    setSteps(journeySteps[type] || []);
  };

  const endJourney = () => {
    console.log('endJourney');
    setIsGuided(false);
    setJourneyType(null);
    setStepIndex(0);
    setSteps([]);
  };

  const markTourComplete = () => {
    localStorage.setItem(TOUR_COMPLETED_KEY, 'true');
    setHasTakenTour(true);
  };

  return (
    <GuidedJourneyContext.Provider
      value={{
        isGuided,
        stepIndex,
        journeyType,
        steps,
        hasTakenTour,
        startJourney,
        endJourney,
        setStepIndex,
        markTourComplete
      }}
    >
      {children}
    </GuidedJourneyContext.Provider>
  );
};

export const useGuidedJourney = () => {
  const context = useContext(GuidedJourneyContext);
  if (context === undefined) {
    throw new Error('useGuidedJourney must be used within a GuidedJourneyProvider');
  }
  return context;
}; 