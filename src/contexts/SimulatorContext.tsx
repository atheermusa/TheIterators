import { createContext, useContext, ReactNode } from 'react';

interface SimulatorContextType {
    recordInteraction: (pageId: string, elementId: string) => void;
}

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined);

export const SimulatorProvider = ({
    children,
    onInteraction
}: {
    children: ReactNode;
    onInteraction: (pageId: string, elementId: string) => void;
}) => {
    const recordInteraction = (pageId: string, elementId: string) => {
        onInteraction(pageId, elementId);
    };

    return (
        <SimulatorContext.Provider value={{ recordInteraction }}>
            {children}
        </SimulatorContext.Provider>
    );
};

export const useSimulator = () => {
    const context = useContext(SimulatorContext);
    if (context === undefined) {
        throw new Error('useSimulator must be used within a SimulatorProvider');
    }
    return context;
}; 