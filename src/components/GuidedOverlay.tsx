import { useGuidedJourney } from '../contexts/GuidedJourneyContext';

const GuidedOverlay = () => {
  const { endJourney, currentStep } = useGuidedJourney();

  const instructions = {
    'view-pin': [
      {
        text: 'First, tap on the Cards tab in the bottom navigation bar',
        target: 'footer-cards'
      }
      // Add more steps as needed
    ]
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Instruction panel */}
      <div className="absolute top-0 left-0 right-0 bg-white p-4 pointer-events-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex space-x-2">
            <button onClick={() => {/* Toggle dim */}}>🌙</button>
            <button onClick={() => {/* Text-to-speech */}}>🔊</button>
          </div>
          <button onClick={endJourney}>✕</button>
        </div>
        <p className="text-center">
          {instructions['view-pin'][currentStep]?.text}
        </p>
      </div>
    </div>
  );
};

export default GuidedOverlay; 