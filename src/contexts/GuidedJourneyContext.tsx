import { createContext, useContext, useState, ReactNode } from 'react';

interface GuidedJourneyContextType {
  isGuided: boolean;
  currentStep: number;
  journeyType: string | null;
  startJourney: (type: string) => void;
  endJourney: () => void;
  nextStep: () => void;
  previousStep: () => void;
}

const GuidedJourneyContext = createContext<GuidedJourneyContextType | undefined>(undefined);

export const GuidedJourneyProvider = ({ children }: { children: ReactNode }) => {
  const [isGuided, setIsGuided] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [journeyType, setJourneyType] = useState<string | null>(null);

  const startJourney = (type: string) => {
    setJourneyType(type);
    setIsGuided(true);
    setCurrentStep(0);
  };

  const endJourney = () => {
    setIsGuided(false);
    setJourneyType(null);
    setCurrentStep(0);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const previousStep = () => setCurrentStep(prev => prev - 1);

  return (
    <GuidedJourneyContext.Provider 
      value={{ 
        isGuided, 
        currentStep, 
        journeyType,
        startJourney, 
        endJourney, 
        nextStep, 
        previousStep 
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