import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';
import { GuidedJourneyProvider } from './contexts/GuidedJourneyContext';
function App() {
  return (
    <BrowserRouter>
      <GuidedJourneyProvider>
        <AppRoutes />
      </GuidedJourneyProvider>
    </BrowserRouter>
  );
}

export default App;